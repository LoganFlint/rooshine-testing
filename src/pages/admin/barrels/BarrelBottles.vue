<template>
  <PageHeader
    barrel-info
    barrel-id="12345678"
  />
  <div class="px-10">
    <MintBottleCounter v-if="showMinter" />
    <div
      v-else
      class="pb-20"
    >
      <MintedBottleCount />
      <div class="mt-6  flex h-16 items-center relative">
        <TextInput
          class="w-[700px] bg-white"
          placeholder="Search"
        />
        <SearchButton />
      </div>
      <MintedBottlesList
        v-model="state.lotList"
      />
    </div>
  </div>
</template>


<script setup lang="ts">
import type { AdminLot } from "../../../api/lot";

const showMinter = ref(false)

var dateOne = new Date("2014-04-03");
var dateTwo = new Date("2020-06-08");
var dateThree = new Date("2021-09-05");
var dateFour = new Date("2022-12-08");
var dateFive = new Date("2019-01-04");
var dateSix = new Date("2021-07-09");

const state = reactive({
  lotList: [
    {
      price: 80223,
      type: "APPROVED",
      buyerName: "",
      dateSubmitted: dateOne,
      bottleNumber: 1,
      token: 213561
    },
    {
      price: 10083,
      type: "LISTED",
      buyerName: "",
      dateSubmitted: dateTwo,
      bottleNumber: 2,
      token: 213566
    },
    {
      price: 30363,
      type: "LISTED",
      buyerName: "",
      dateSubmitted: dateThree,
      bottleNumber: 3,
      token: 213562
    },
    {
      price: 60613,
      type: "LISTED",
      buyerName: "",
      dateSubmitted: dateFour,
      bottleNumber: 4,
      token: 213569
    },
    {
      price: 20903,
      type: "SOLD",
      buyerName: "Gustav Bellows",
      dateSubmitted: dateFive,
      bottleNumber: 5,
      token: 213563
    },
   {
      price: 70712,
      type: "SOLD",
      buyerName: "Gustav Bellows",
      dateSubmitted: dateSix,
      bottleNumber: 6,
      token: 213570
    },
  ] as AdminLot[],
});
</script>
