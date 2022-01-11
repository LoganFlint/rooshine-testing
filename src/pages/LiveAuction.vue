<template>
  <div class="px-14 py-10">
    <div class="flex items-center justify-between pb-8">
      <div class="flex items-center">
        <div class="font-serif font-bold text-5xl pr-4">
          Live Auction
        </div>
        <img
          class="animate-pulse mt-3"
          src="../assets/live_red.svg"
          alt="live light red"
        >
      </div>
      <div class="flex items-center">
        <img
          class="mr-5"
          src="../assets/red_clock.svg"
          alt="clock"
        >
        <div
          data-cy="live-auction-countdown-tiles"
          class="flex"
        >
          <CounterTile
            live
            :qty="days"
            label="DAYS"
            class="mr-2"
          />
          <CounterTile
            live
            :qty="hours"
            label="HOURS"
            class="mr-2"
          />
          <CounterTile
            live
            :qty="minutes"
            label="MINUTES"
            class="mr-2"
          />
          <CounterTile
            live
            :qty="seconds"
            label="SECONDS"
            class="mr-2"
          />
        </div>
      </div>
    </div>
    <div class="flex items-start">
      <div
        data-cy="live-auction-filter-sidebar"
        class="w-96 flex-grow pr-5"
      >
        <FilterSidebar
          v-model="state.reset"
          :lots="state.lots"
          @lotsUpdated="updateLots"
        />
      </div>
      <div
        v-if="state.filteredLots.length !== 0"
        class="flex flex-wrap items-start justify-right w-screen"
      >
        <div
          v-for="(lot, index) in state.filteredLots"
          :key="lot.lotNumber"
          class="mr-6 mt-6"
        >
          <ProductTile
            live-auction
            class="max-w-xs w-60 flex-grow"
            :lot="getLot(index)"
          />
        </div>
      </div>
      <div
        v-else
        class="w-full"
      >
        <FilterNoMatches @reset-filter="state.reset = true" />
      </div>
    </div>
    <div class="fixed bottom-10 left-10">
      <ShopNotification
        :image="auction1"
        location="Woodworth, United States"
        item="Old Malt Cask Ardberg 32 Y..."
        :time="17"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import auction1 from "../assets/live_auction_img.png"
import { useStore } from "../store"
import type { Lot } from "../api/lot"
// import { useRoute } from 'vue-router'
// const route = useRoute();  

// const searchedVal = route.params.search;
// console.log(searchedVal)
const store = useStore()

const days = ref(5)
const hours = ref(12)
const minutes = ref(43)
const seconds = ref(52)

const state = reactive<{ lots: Array<Lot>, filteredLots: Array<Lot>, reset: boolean }>({
  lots: [] as Array<Lot>,
  filteredLots: [] as Array<Lot>,
  reset: false
})

store
  .getLots()
  .then(newLots => {
    state.lots = newLots;
    state.filteredLots = newLots;
  })
  .catch(reason => {
    console.log("reason", reason)
  })

function updateLots(filteredLots: Array<Lot>) {
  state.filteredLots = filteredLots;
}

function getLot(index: number) {
  return state.filteredLots[index] as Lot
}

</script>
