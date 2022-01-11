<template>
  <SignBaseModal
    no-close
    :is-open="isOpen"
    @close="closeModal"
  >
    <div class="max-h-screen">
      <div class="px-24 pt-5 pb-7 font-serif font-bold text-2xl text-center">
        Outbid Items
      </div>
      <div class="relative">
        <div class="overflow-y-auto h-96">
          <div
            v-for="(lot, i) in lots"
            :key="i"
          >
            <div class="pb-4 pl-4">
              {{ lot.name }}
            </div>
            <div class="flex">
              <div class="px-7 flex flex-col items-center">
                <img
                  src="../../../assets/bottle_full.svg"
                  alt="full bottle"
                >
                <div>{{ lot.barrel.bottleCount - lot.barrel.bottlesRemaining }}</div>
              </div>
              <div class="flex-grow pr-5">
                <TextInput
                  v-model="newBidAmount"
                  place-bid
                  red
                  place-bid-string="Minimum Bid"
                  class="bg-speedOfLight w-full"
                  placeholder="minimum bid"
                />
                <div
                  class="pb-8 pt-2 font-source text-xs text-opacity-50 text-black flex justify-between"
                >
                  <div>
                    Highest Bid:
                    {{
                      lot.highestBid.amount.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })
                    }}
                  </div>
                  <div>{{ lot.highestBid.userName }}</div>
                </div>
              </div>
            </div>
          </div>
          <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t h-7 from-black opacity-20" />
        </div>

        <div class="px-5">
          <MainButton
            class="w-full my-5"
            label="blace bid"
            bg-color="red"
            text-color="white"
            @click="closeModal"
          />
        </div>
      </div>
    </div>
  </SignBaseModal>
</template>

<script setup lang="ts">

import type { PropType } from "vue"
import type { Lot } from "../../../api/lot"

defineProps({
  isOpen: Boolean,
  lots: { type: Array as PropType<Array<Lot>>, default: [] as Array<Lot> },
});
const emit = defineEmits(["close"]);

const minimumBidIncrement = 100
//TODO make this an array of bids for each outbidded item
//props.lots[0].highestBid.amount
const newBidAmount = ref(8000 + minimumBidIncrement)

function closeModal() {
  emit("close")
}

</script>
