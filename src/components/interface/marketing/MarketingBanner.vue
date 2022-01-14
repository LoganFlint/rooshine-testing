<template>
  <section class="relative h-96">
    <Carousel :images="images" />
    <div class="absolute flex flex-col ml-24 mt-12">
      <div class="font-serif font-bold text-white text-4xl">
        Hosting the Most
        <br>Exotic and Collectible
        <br>Whisky Auctions
      </div>
      <div class="mt-4 text-xl text-white mb-8">
        Learn how we’re using blockchain technology
        <br>to revolutionize the whisky industry
      </div>

      <MainButton
        data-cy="get-started"
        class="w-40"
        label="get started"
        bg-color="outline"
        text-color="white"
        @click="getStarted"
      />
    </div>
  </section>
</template>

<script setup lang="ts">

import { useStore } from "../../../store";
import type { Lot } from "../../../api/lot";

import router from "../../../router";
import carousel1 from "../../../assets/image1.png";
import carousel2 from "../../../assets/image2.png";
import carousel3 from "../../../assets/image3.png";

const store = useStore()
const images = [carousel1, carousel2, carousel3];

const state = reactive({
  lots: [] as Lot[]
});

store.getLots()
  .then((lots) => {
    state.lots = lots;
  })
  .catch(e => {
    throw e;
  });

function getStarted(): void {
  if(store.user.email === "") void router.push({ name: "signin" });
  else if(state.lots.length === 0) void router.push({ name: "live.auction.empty" });
  else void router.push({ name: "live.auction" });
}
</script>
