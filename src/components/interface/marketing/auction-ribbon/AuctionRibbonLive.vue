<template>
  <section class="bg-speedOfLight overflow-hidden relative transition-all duration-300">
    <div class="flex text-center items-center w-full">
      <img
        id="arrowLeft"
        data-cy="auction-banner-arrow-left"
        class="opacity-0 invisible w-0 sm:opacity-100 sm:visible sm:w-auto cursor-pointer h-[158px]"
        :src="left"
        alt="left"
        @click="scroll('left')"
      >
      <div data-cy="auction-banner-header" class="pl-5 mr-10 flex flex-col mb-3">
        <img
          class="animate-pulse mx-auto"
          :src="redBullet"
          alt="red live light"
        >
        <div class="font-serif font-bold text-3xl">
          Live
        </div>
        <div class="flex">
          <strong class="mr-1">{{ time }}</strong>
          <strong class="mr-1">{{ interval }}</strong>
          LEFT
        </div>
      </div>
      <div
        ref="lotContainer"
        class="flex w-full overflow-auto sm:overflow-hidden"
        @mouseover="handleScrollListener"
      >
        <div
          v-for="lot in state.lots"
          :key="lot.lotNumber"
          class="flex justify-center items-center pb-2.5"
        >
          <LiveAuctionTile
            :title="lot.name"
            :name="lot.highestBid.userName"
            :amount="lot.highestBid.amount"
            class="mr-4"
          />
        </div>
      </div>
      <img
        id="arrowRight"
        data-cy="auction-banner-arrow-right"
        class="opacity-0 invisible w-0 sm:opacity-100 sm:visible sm:w-auto cursor-pointer h-[158px]"
        :src="right"
        alt="right"
        @click="scroll('right')"
      >
    </div>
  </section>
</template>

<script setup lang="ts">

import { useStore } from "../../../../store";
import type { Lot } from "../../../../api/lot";

import redBullet from "../../../../assets/live_red.svg";
import right from "../../../../assets/scroll_right.svg";
import left from "../../../../assets/scroll_left.svg";


defineProps({
  time: { type: Number, required: true },
  interval: { type: String, required: true },
});

const store = useStore();

const lotContainer = ref<HTMLDivElement | null>(null);

const state = reactive({
  lots: null as Lot[] | null,
  rightHover: false,
  leftHover: false
});

store
  .getLots()
  .then(lots => {
    state.lots = lots;
  })
  .catch(reason => {
    console.warn("reason", reason);
  });

function scroll(direction: string): void {
  let scrolled = 0;
  const slide = setInterval(() => {
    direction === "left" ? (lotContainer.value as HTMLDivElement).scrollLeft -= 15 : (lotContainer.value as HTMLDivElement).scrollLeft += 15;
    scrolled += 15;
    if (scrolled >= 300) window.clearInterval(slide);
  }, 15);
}

function handleScrollListener(): void {
  lotContainer.value?.addEventListener("wheel", (event) => {
    event.preventDefault();
    (lotContainer.value as HTMLDivElement).scrollLeft += event.deltaY;
  });
}

</script>
