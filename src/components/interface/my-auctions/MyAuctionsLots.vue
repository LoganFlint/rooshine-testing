<template>
  <div
    v-if="lotsFiltered.length > 0"
    class="overflow-x-auto"
  >
    <div
      v-for="lot in lotsFiltered"
      :key="lot.lotNumber"
    >
      <MyAuctionTile
        :lot="lot"
        :current-step="currentStep"
      />
    </div>
  </div>
  <EmptyBids v-else />
</template>

<script setup lang="ts">

import type { PropType } from "vue"
import type { Lot } from "../../../api/lot"
import type { MyAuctionsTabOption } from "../../../api/modules/register"
import { useStore } from "../../../store"

const props = defineProps({
	currentStep: { type: String as PropType<MyAuctionsTabOption>, default: "" },
	lots: { type: Array as PropType<Array<Lot>>, default: [] as Array<Lot> },
});

const lotsFiltered = ref<Array<Lot>>([])
const store = useStore()

function updateLotList() {
	if (props.lots) {
		switch (props.currentStep) {
			case "bidding":
				lotsFiltered.value = props.lots.filter(lot => lot.bids.filter(bid => bid.userId === store.user.userId).length > 0)
				break
			case "selling":
				lotsFiltered.value = props.lots.filter(lot => lot.userId == store.user.userId)
				break
			case "purchased":
				lotsFiltered.value = props.lots.filter(lot => lot.highestBid.userId == store.user.userId && lot.sold)
				break
			case "sold":
				lotsFiltered.value = props.lots.filter(lot => lot.sold && lot.userId == store.user.userId)
				break
			case "watching":
				lotsFiltered.value = props.lots.filter(lot => store.user.watchList?.includes(lot.lotNumber))
				break
			default:
				// bidding
				lotsFiltered.value = props.lots.filter(lot => lot.bids.filter(bid => bid.userId === store.user.userId).length > 0)
		}
	} else {
		lotsFiltered.value = []
	}
}

watch(
	() => [props.currentStep, props.lots, store.user.userId],
	() => {
		updateLotList()
	}
)

</script>
