<template>
  <div
    :class="[
      'border border-unicornSilver rounded',
      {
        'flex items-center max-w-xl': getStarted,
        'flex flex-col w-72': suggested,
      },
    ]"
  >
    <div :class="[{ 'w-72': getStarted }]">
      <img
        :class="['h-52 mx-auto py-4 object-cover', { 'h-52': getStarted, 'px-10': suggested }]"
        :src="lot.images[0]"
        alt="bottle"
      >
    </div>

    <div
      :class="[
        'flex flex-col bg-speedOfLight border-t border-unicornSilver p-4',
        {
          'w-full': getStarted,
          'h-72': !getStarted,
        },
      ]"
    >
      <div class="flex whitespace-nowrap text-xs">
        <div>LOT #{{ lot.lotNumber }}</div>
        <div class="mx-2 text-americanSilver">
          |
        </div>
        <div>{{ lot.barrel.bottlesRemaining }} of {{ lot.barrel.bottleCount }}</div>
        <div class="mx-2 text-americanSilver">
          |
        </div>
        <div v-if="liveAuction">
          {{ lot.barrel.bottleCount }} Bottles
        </div>
        <div v-else>
          {{ lot.barrel.bottlesRemaining }} of {{ lot.barrel.bottleCount }}
        </div>
      </div>
      <div class="pt-2 overflow-hidden pr-3 font-serif font-bold text-xl">
        {{ state.trimmedString }}
      </div>

      <div class="flex-1" />

      <div
        class="text-left font-source"
      >
        {{ sizeMl }}cl • {{ lot.barrel.strength }}% • {{ lot.barrel.type }}
      </div>
      <div
        v-if="liveAuction && lot.highestBid.amount === 0"
        class="my-4 flex justify-between items-center bg-white rounded-md p-3"
      >
        <div class="py-3 mx-auto text-xs font-source">
          Be a first bidder
        </div>
      </div>

      <div
        v-else-if="liveAuction && lot.highestBid.amount > 0"
        class="my-4 flex justify-between items-center bg-white rounded-md p-3"
      >
        <div class="flex flex-col text-left">
          <div class="text-sm whitespace-nowrap">
            Highest bid
          </div>
          <div class="text-sm font-bold">
            {{ lot.highestBid.userName }}
          </div>
        </div>
        <div class="text-2xl">
          {{
            lot.highestBid.amount.toLocaleString(undefined, {
              maximumFractionDigits: 2,
            })
          }}
        </div>
      </div>

      <div
        v-else
        class="my-4 flex justify-between items-center bg-white rounded-md p-3"
      >
        <div class="flex flex-col text-left">
          <div class="text-sm whitespace-nowrap">
            Winning bidder
          </div>
          <div class="text-sm font-bold">
            {{ lot.highestBid.userName }}
          </div>
        </div>
        <div class="text-2xl">
          {{
            lot.highestBid.amount.toLocaleString(undefined, {
              maximumFractionDigits: 2,
            })
          }}
        </div>
      </div>

      <div
        v-if="suggested || getStarted"
        class="flex justify-between"
      >
        <router-link
          :to="{
            name: 'live.auction.details',
            params: {
              lotStr: JSON.stringify(localLot),
              lotNumberStr: lot.lotNumber + '',
            },
          }"
        >
          <MainButton
            class="mr-2"
            label="view lot"
            bg-color="transparent"
            text-color="black"
          />
        </router-link>

        <MainButton
          class="py-1.5 w-2/3"
          label="place bid"
          bg-color="red"
          text-color="white"
        />
      </div>

      <div v-else-if="liveAuction">
        <div class="flex justify-between">
          <router-link
            :to="{
              name: 'live.auction.details',
              params: {
                lotStr: JSON.stringify(localLot),
                lotNumberStr: lot.lotNumber + '',
              },
            }"
          >
            <MainButton
              class="py-1 border-none"
              label="view lot"
              bg-color="outline"
              text-color="black"
            />
          </router-link>

          <MainButton
            class="py-1.5 w-1/2"
            label="place bid"
            bg-color="red"
            text-color="white"
            @click="openPlaceBid"
          />
        </div>
        <QuickBid
          v-if="placeBid === true"
          :is-open="placeBid"
          :lot="lot"
          @close="placeBid = false"
        />
      </div>

      <!-- auction ended -->
      <router-link
        v-else
        :to="{
          name: 'live.auction.details',
          params: {
            lotStr: JSON.stringify(localLot),
            lotNumberStr: lot.lotNumber + '',
          },
        }"
      >
        <MainButton
          class="py-1 w-full"
          label="view lot"
          bg-color="outline"
          text-color="red"
        />
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from "vue"
import type { Lot } from "../../../../api/lot"
import { removeLotInfiniteNesting } from "../../../../api/lot"

const props = defineProps({
  lot: { type: Object as PropType<Lot>, default: {} as Lot },
  getStarted: Boolean,
  suggested: Boolean,
  liveAuction: Boolean,
});

const state = reactive({
  sizeMl: props.lot.barrel.sizeMl,
  lotName: props.lot.name,
  trimmedString: "",
  stringLength: 29
})

let truncate = "..."
if( state.lotName.length > state.stringLength ) {
  state.trimmedString = state.lotName.substring(0, state.stringLength)
  state.trimmedString = state.lotName.substring(0, Math.min(state.stringLength, state.lotName.lastIndexOf(" ")))
  state.trimmedString =  state.trimmedString.concat(truncate)
} else {
  state.trimmedString = state.lotName
}

const sizeMl = ref()  

if(state.sizeMl != null) {
  sizeMl.value = state.sizeMl / 10
}

const localLot = {}

const placeBid = ref(false)

function openPlaceBid() {
  placeBid.value = true
}

// it does this so it can be JSON.stringify'ed
removeLotInfiniteNesting(props.lot, localLot as Lot)

</script>
