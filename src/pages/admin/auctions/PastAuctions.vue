<template>
  <PageHeader
    title="Auctions"
    auctions
    button
  />
  <div class="pl-10 pt-4">
    <div class="relative items-center flex pb-4">
      <TextInput
        placeholder="Search"
        input-type="text"
        class="bg-white w-[700px]"
      />
      <SearchButton />
    </div>
    <PastAuctionsList v-model="state.auctionList" />
  </div>
</template>

  <script setup lang="ts">
  import type { Auction } from "../../../api/auction"

  const state = reactive({
  auctionList: [
    {
      name: "September Auction",
      lotCount: 94,
      startDate: new Date("Sep 01, 2021"),
      endDate: new Date("Sep 28, 2021"),  
      participants: 452,
      revenue: 25200  // $25,200.12    
    },
    {
      name: "August Auction",
      lotCount: 140,
      startDate: new Date("Aug 21, 2021"),
      endDate: new Date("Aug 21, 2021"),  
      participants: 511,
      revenue: 32215  // $32.215.24    
    },
  ] as Auction[]
});
  </script>
