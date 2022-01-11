<template>
  <div class="pt-14 px-14">
    <div
      v-if="lotEnded"
      class="font-medium text-2xl pb-3"
    >
      More Completed Auctions
    </div>

    <div
      v-else
      class="font-medium text-2xl pb-12"
    >
      You might also like:
    </div>

    <div class="flex flex-wrap">
      <div
        v-for="lot in state.lots"
        :key="lot.lotNumber"
        class="mr-5 mt-5"
      >
        <ProductTile
          :lot="lot"
          :suggested="!lotEnded"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import type { Lot } from "../../../../api/lot";
import { useStore } from "../../../../store";

defineProps({ lotEnded: Boolean });

const state = reactive({
  lots: null as Array<Lot> | null,
});

const store = useStore();
store
  .getLots()
  .then(newLots => {
    state.lots = newLots
  })
  .catch(reason => {
    console.log("reason", reason)
  });

</script>
