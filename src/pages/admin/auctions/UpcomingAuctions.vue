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
    <UpcomingAuctionsList v-model="state.auctionList" />
  </div>
</template>
<script setup lang="ts">
  import type { Auction } from "../../../api/auction";

  const state = reactive({
    auctionList: [
      {
        name: "Holiday Auction 1",
        lotCount: 200,
        startDate: new Date("Dec 1, 2021"),
        endDate: new Date("Dec 25, 2021"),
      },
      {
        name: "Holiday Auction 2",
        lotCount: 200,
        startDate: new Date("Jan 1, 2021"),
        endDate: new Date("Jan 28, 2021"),
      },
    ] as Auction[],
  });

</script>
