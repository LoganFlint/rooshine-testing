<template>
  <div>
    <OutbidBanner
      :lots="state.lots"
      :user-id="store.user.userId"
    />

    <div class="flex flex-col rounded w-full border border-unicornSilver">
      <MyAuctionsTabs
        :my-auctions-steps="myAuctionsSteps"
        :current-step="store.settings.profile.myAuctionsTab"
        @tabChanged="tabChanged"
      />
      <MyAuctionsLots
        :current-step="store.settings.profile.myAuctionsTab"
        :lots="state.lots"
      />
    </div>
  </div>
</template>
<script setup lang="ts">

import type { PropType } from "vue";
import type { Lot } from "../../../api/lot";
import type { MyAuctionsTabOption } from "../../../api/modules/register";
import { useStore } from "../../../store";

defineProps({ lots: { type: Array as PropType<Array<Lot>>, default: [] as Array<Lot> } });

const store = useStore();
const state = reactive<{ lots: Array<Lot> }>({
	lots: [],
});

store
	.getLots()
	.then(newLots => {
		try {
			state.lots = newLots
		} catch (e) {
			console.log("error: ", e)
		}
	})
	.catch(reason => {
		console.log("reason", reason)
	});
const myAuctionsIndex = ref(0);
const myAuctionsSteps: Array<MyAuctionsTabOption> = ["bidding", "selling", "purchased", "sold", "watching"];

function tabChanged(tabName: string) {
	if (myAuctionsSteps.includes(tabName as MyAuctionsTabOption)) myAuctionsIndex.value = myAuctionsSteps.indexOf(tabName as MyAuctionsTabOption);
}

watch(
	() => myAuctionsIndex.value,
	() => {
		store.settings.profile.myAuctionsTab = myAuctionsSteps[myAuctionsIndex.value]
	}
);

</script>
