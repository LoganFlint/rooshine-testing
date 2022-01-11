<template>
  <PageHeader
    barrel-id="12345678"
    barrel-info
  />
  <div class="pt-8 px-10">
    <Lots v-model="state.lotList" />
  </div>
</template>

<script setup lang="ts">
import type { AdminLot } from "../../../api/lot"

const state = reactive({
  lotList: [
    {
      lotId: "42345678",
      productName: "Old Malt Cask Ardbeg 1967",
      qty: 94,
      type: "REQUESTED",
    },
     {
      lotId: "22345678",
      productName: "Old Malt Cask Ardbeg 1967",
      qty: 20,
      type: "PENDING",
    },
   {
      lotId: "32345678",
      productName: "Old Malt Cask Ardbeg 1967",
      qty: 2,
      type: "LISTED",
    },
  ] as AdminLot[]
});

</script>
