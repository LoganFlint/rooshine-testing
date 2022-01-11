<template>
  <div class="mb-20">
    <div class="flex font-source text-xl">
      <div class="border-r border-americanSilver pr-4">
        LOT
        <span>#{{ lot?.lotNumber }}</span>
      </div>
      <div class="pl-4">
        {{ lot?.barrel.bottleCount }} Bottles
      </div>
    </div>
    <div class="max-w-sm pt-4 pb-3.5">
      <div class="font-serif font-bold text-4xl">
        {{ lot?.name }}
      </div>
    </div>
    <div class="flex font-source text-xl items-center pb-11">
      <div>{{ lot?.barrel.sizeMl ?? 0 / 10 }}cl •</div>
      <div class="pl-1">
        {{ lot?.barrel.strength }}% •
      </div>
      <div class="pl-1">
        {{ lot?.barrel.type }}
      </div>
    </div>
    <!-- timer section -->
    <LotProgressBar
      :start-time="startTimeMs"
      :end-time="endTimeMs"
      :current-time="currentTimeMs"
      :lot-ended="lotEnded"
    />

    <div class="flex font-source pt-7">
      <div class="pr-5">
        <div class="text-xs">
          Highest Bid
        </div>
        <div class="text-4xl">
          {{
            lot
              ? lot.highestBid.amount.toLocaleString(undefined, {
                maximumFractionDigits: 2,
              })
              : ""
          }}
          <span
            class="text-xl"
          >ISV</span>
        </div>
      </div>

      <div
        v-if="!lotEnded"
        class="pl-5 border-l border-unicornSilver"
      >
        <div class="text-2xl">
          {{ lot?.highestBid.userName }}
        </div>
        <div>{{ minutesSinceHighestBid }}</div>
      </div>
    </div>

    <div class="flex items-center text-planetOfTheApes pt-4 pb-11">
      <img
        src="../../../../assets/share.svg"
        alt="share"
      >
      <a
        :target="'lot_' + lot?.lotNumber"
        class="pl-1"
        :href="twitterLink"
      >Share this auction</a>
    </div>

    <div class="flex h-auto">
      <div
        v-if="!lotEnded"
        class="flex flex-col justify-between pr-7"
      >
        <router-link
          v-if="lot"
          :to="{ name: 'live.auction.details_bid', params: { lotStr: state.lotStr } }"
        >
          <MainButton
            class="mb-4 w-full"
            label="make a bid"
          />
        </router-link>

        <router-view @close="bidClose" />
        
        <MainButton
          class="px-12"
          label="add to watchlist"
          bg-color="outline"
          text-color="red"
        />
      </div>
      <div v-else>
        <MainButton
          class="mb-4"
          label="view bid history"
          bg-color="outline"
          text-color="red"
          xlarge
          custom-px
          @click="openModal"
        />
        <LotEndedTimeline
          :is-open="showModal"
          :total="lot?.highestBid.amount"
          @close="close"
        />
      </div>
      <div
        v-if="!lotEnded"
        class="flex items-center bg-speedOfLight w-60 px-4 rounded"
      >
        <div
          class="text-xs"
        >
          Note: If bid is placed on this item within the last 15 minutes of the auction, the timer will be extended by 15 minutes.
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import type { PropType } from "vue";
import router from "../../../../router";
import { removeLotInfiniteNesting } from "../../../../api/lot";
import type { Lot } from "../../../../api/lot";
import LotEndedTimeline from "./LotEndedTimeline.vue";

const props = defineProps({
  lot: { type: Object as PropType<Lot | null>, default: null },
  minutesSinceHighestBid: { type: String, default: "" },
  startTimeMs: { type: Number, default: 0 },
  endTimeMs: { type: Number, default: 0 },
  currentTimeMs: { type: Number, default: 0 },
  lotEnded: { type: Boolean, default: true },
});

const state = reactive({
  lotStr: "",
})

const currentUrl = window.location.href
const twitterUrl = "https://twitter.com/intent/tweet?text="

const twitterLink = computed(() => {
  const urlLinebreak = "%0A"
  return `${twitterUrl}${props.lot?.name}${urlLinebreak}${currentUrl}`
})

watch(
  () => props.lot,
  () => {
    const localLot = {}
    // it does this so it can be JSON.stringify'ed
    if (props.lot)
      removeLotInfiniteNesting(props.lot, localLot as Lot)
    state.lotStr = JSON.stringify(localLot)
  }
)

let showModal = ref(false)
function openModal() {
  showModal.value = true
}

function close(): void {
  showModal.value = false
}

async function bidClose(): Promise<void> {
  await router.push({ name: "live.auction.details" })
}

</script>
