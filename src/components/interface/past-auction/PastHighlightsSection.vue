<template>
  <div class="my-10 py-10 px-5">
    <div class="text-center">
      <div class="font-bold font-serif text-3xl">
        Past Highlights
      </div>
      <div class="font-source text-lg mt-1">
        Discover some of the exceptional bottles sold in our
        <br>live auctions in the previous month.
      </div>
    </div>

    <div class="flex flex-wrap items-center justify-center">
      <div
        v-for="lot in state.lots"
        :key="lot.lotNumber"
        class="mt-10 max-w-xs w-80"
      >
        <ProductTile
          :lot="lot"
          class="mx-2"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import type { Lot } from "../../../api/lot";
import { useStore } from "../../../store";

const state = reactive({
  lots: null as Array<Lot> | null,
})

const store = useStore()
store
  .getLots()
  .then(newLots => {
    state.lots = newLots
  })
  .catch(reason => {
    console.log("reason", reason)
  })

</script>
