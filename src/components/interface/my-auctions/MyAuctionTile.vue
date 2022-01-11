<template>
  <div
    v-if="lot"
    class="mb-1 px-4 flex items-center border-b border-unicornSilver"
  >
    <img
      class="w-28 h-28"
      :src="lot.images[0]"
      alt="bottle"
    >
    <div class="flex flex-grow justify-between border-l border-unicornSilver">
      <div class="py-5 flex w-80 flex-col pl-7">
        <div class="flex">
          <div class="font-source text-xs pb-1.5">
            LOT #{{ lot.lotNumber }}
          </div>
          <div class="mx-2 border border-americanSilver" />
          <div class="font-source text-xs">
            {{ lot.barrel.bottleCount - lot.barrel.bottlesRemaining }} of
            {{ lot.barrel.bottleCount }}
          </div>
        </div>
        <div class="font-serif font-bold text-xs pb-1.5">
          {{ lot.name }}
        </div>
        <div class="text-xs font-source pb-3.5">
          {{ lot.barrel.sizeMl ?? 0 / 10 }}cl • {{ lot.barrel.strength }}% •
          {{ lot.barrel.type }}
        </div>
        <div
          v-if="currentStep == 'bidding'"
          class="flex items-center"
        >
          <MainButton
            class="py-1.5"
            label="view my bids"
            bg-color="red"
            text-color="white"
            xlarge
            @click="currentBids"
          />
          <CurrentBidsModal
            :is-open="openCurrentBids"
            :lot="lot"
            @close="openCurrentBids = false"
          />
          <MainButton
            label="view lot"
            bg-color="transparent"
            text-color="red"
            xlarge
          />
        </div>

        <div v-else-if="currentStep == 'selling'">
          <MainButton
            class="py-1.5"
            label="view listing"
            bg-color="black"
            text-color="white"
            xlarge
          />
        </div>

        <div v-else-if="currentStep == 'purchased'">
          <MainButton
            class="py-1.5 w-32"
            label="view lot"
            bg-color="red"
            text-color="white"
            xlarge
          />
        </div>

        <div v-else-if="currentStep == 'sold'">
          <MainButton
            class="py-1.5"
            label="view listing"
            bg-color="black"
            text-color="white"
            xlarge
          />
        </div>
        <div v-else>
          <MainButton
            class="py-1.5 w-32"
            label="remove"
            bg-color="red"
            text-color="white"
            xlarge
          />
        </div>
      </div>

      <div class="flex justify-center flex-col">
        <div class="py-3 w-28 h-20 rounded-t-lg border border-unicornSilver bg-speedOfLight">
          <div
            v-if="currentStep == 'bidding'"
            class="font-source text-tiny text-center"
          >
            Total Bid Amount:
          </div>
          <div
            v-else-if="currentStep == 'selling' || currentStep == 'watching'"
            class="font-source text-tiny text-center"
          >
            Highest Bid
          </div>
          <div
            v-else-if="currentStep == 'purchased'"
            class="font-source text-tiny text-center"
          >
            Total Bid Amount:
          </div>
          <div
            v-else-if="currentStep == 'sold'"
            class="font-source text-tiny text-center"
          >
            Gross Sales
          </div>
          <div class="flex justify-center">
            <img
              src="../../../assets/barrel.svg"
              alt="barrel"
            >
            <div class="font-source font-semibold text-xl pl-1">
              {{
                lot.highestBid.amount.toLocaleString(undefined, {
                  maximumFractionDigits: 2,
                })
              }}
            </div>
          </div>
          <div
            v-if="currentStep == 'selling'"
            class="font-source font-semibold text-xs text-center"
          >
            {{ lot.highestBid.userName }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import type { Lot } from "../../../api/lot"
import type { MyAuctionsTabOption } from "../../../api/modules/register"
import type { PropType } from "vue"

defineProps({
  lot: { type: Object as PropType<Lot>, default: null },
  currentStep: { type: String as PropType<MyAuctionsTabOption>, default: "" },
});

const openCurrentBids = ref(false)

function currentBids() {
  openCurrentBids.value = true
}

</script>
