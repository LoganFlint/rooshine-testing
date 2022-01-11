<template>
  <div
    :class="[
      'mb-8 flex justify-between items-center py-4 px-6 bg-planetOfTheApes',
      { block: !ignore, hidden: ignore || state.outbidLots.length < 1 },
    ]"
  >
    <div class="text-white flex items-center">
      <img
        class="border border-white rounded-full mr-2.5"
        src="../../../assets/alert.svg"
        alt="info icon"
      >
      You’ve been outbid on ({{ state.outbidLots.length }}) items.
    </div>
    <div class="flex">
      <MainButton
        class="py-1"
        label="view"
        bg-color="outline"
        text-color="white"
        profile-modals
        @click="viewMyBids"
      />
      <OutBiddedItemsModal
        :lots="state.outbidLots"
        :is-open="openMyBids"
        @close="openMyBids = false"
      />
      <MainButton
        class="py-1"
        label="ignore"
        bg-color="red"
        text-color="white"
        @click="closeBanner"
      />
    </div>
  </div>
</template>

<script setup lang="ts">

import type { PropType } from "vue"
import type { Lot } from "../../../api/lot"
import { useStore } from "../../../store"

const props = defineProps({
  lots: { type: Array as PropType<Array<Lot>>, default: [] as Array<Lot> },
  userId: { type: String, default: "" },
});

const state = reactive({
  outbidLots: [] as Array<Lot>,
})

const store = useStore()
const ignore = ref(false)
const openMyBids = ref(false)

watch(
  () => [props.lots, props.userId],
  () => {
    if (props.userId) {
      state.outbidLots = props.lots
        .filter(lot => lot.bids.filter(bid => bid.userId === store.user.userId).length > 0)
        .filter(lot => lot.highestBid.userId != store.user.userId)
    }
  }
)

function viewMyBids(): void {
  openMyBids.value = true
}

function closeBanner(): void {
  ignore.value = true
}

</script>
