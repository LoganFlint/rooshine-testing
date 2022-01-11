<template>
  <PageHeader
    member-info
    member-name="Brandon Salindo"
    member-status="BUYER"
  />
  <div class="px-10  pt-6">
    <div class="relative items-center h-14 flex pb-6">
      <TextInput
        input-type="text"
        class="bg-white w-[700px]"
      />
      <SearchButton />
    </div>
    <Listings
      v-model="state.lotList"
    />
  </div>
</template>

<script setup lang="ts">
import type { AdminLot } from "../../api/lot"

const state = reactive({
  //To be replaced with data from backend when available
  lotList: [
    {
      lotId: "72197420",
      productName: "Old Malt Cask Ardbeg 1967",
      qty: 94,
      type: "REQUESTED",
      bids: 10,
      
    },
     {
      lotId: "72197416",
      productName: "Old Malt Cask Ardbeg 1967",
      qty: 60,
      type: "PENDING",
      bids: 0,
    },
   {
      lotId: "72197417",
      productName: "Old Malt Cask Ardbeg 1967",
      qty: 22,
      type: "LISTED",
      bids: 1,
    },
   {
      lotId: "72197418",
      productName: "Old Malt Cask Ardbeg 1967",
      qty: 100,
      type: "REQUESTED",
      bids: 12,
    },
  ] as AdminLot[]
});


// function sortLots(lots: AdminLot[]) {
//   state.lotList = lots.sort((a, b) =>
//     a.lotId > b.lotId
//       ? 1
//       : b.lotId > a.lotId
//       ? -1
//       : 0
//   );
// }

</script>
