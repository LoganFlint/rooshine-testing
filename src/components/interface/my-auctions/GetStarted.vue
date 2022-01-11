<template>
  <div
    data-cy="getting-started"
    :class="[
      'rounded border border-unicornSilver',
      {
        hidden: hideSuggestions,
        block: !hideSuggestions,
      },
    ]"
    class
  >
    <div class="py-7 px-7 flex justify-between items-start">
      <div>
        <div class="font-serif font-bold text-2xl pb-4">
          Let’s get you started
        </div>
        <div class="font-source">
          Here are some popular picks on Rooshine to get you going.
        </div>
      </div>
      <img
        data-cy="close-getting-started"
        src="../../../assets/close_black.svg"
        alt="close button"
        class="bg-unicornSilver p-1.5 w-7 h-7 rounded-full cursor-pointer"
        @click="closeSuggestions"
      >
    </div>
    <div
      v-for="lot in state.lots"
      :key="lot.lotNumber"
      class="pl-5 pr-5"
    >
      <div class="mb-6">
        <ProductTile
          :lot="lot"
          :get-started="!lotEnded"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import type { Lot } from "../../../api/lot"
import { useStore } from "../../../store"

defineProps({ lotEnded: Boolean });
const state = reactive({
  lots: null as Array<Lot> | null,
})

const store = useStore();

store
  .getLots()
  .then(newLots => {
    state.lots = newLots;
  })
  .catch(reason => {
    console.log("reason", reason);
  });

const hideSuggestions = ref(false);

function closeSuggestions(): void {
  hideSuggestions.value = true;
}

</script>
