<template>
  <SignBaseModal
    no-close
    :is-open="isOpen"
    @close="closeModal"
  >
    <div class="flex flex-col">
      <div
        class="flex items-center py-3 text-center pl-20 pr-14 font-source font-bold border-b border-unicornSilver"
      >
        <div class="pr-3 border-r border-unicornSilver">
          LOT # {{ lot.lotNumber }}
        </div>
        <div class="pl-3">
          {{ lot.barrel.bottlesRemaining }} of {{ lot.barrel.bottleCount }} Bottles
        </div>
      </div>
      <div class="font-serif font-bold text-2xl text-center py-5">
        Your Bids
      </div>
      <div class="flex flex-col overflow-y-auto flex-shrink-1">
        <div
          v-for="(bid, i) in lot.bids"
          :key="i"
        >
          <div class="flex pb-7 pr-6">
            <div class="px-7">
              <img
                src="../../../assets/bottle_full.svg"
                alt="full bottle"
              >
              <div class="text-center">
                {{ bid.purchased }}
              </div>
            </div>
            <div class="bg-speedOfLight pl-3 pt-4 w-72">
              <div>
                {{
                  bid.amount.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })
                }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="bg-gradient-to-t h-7 from-black opacity-20" />

      <div class="px-5">
        <MainButton
          class="w-full my-5"
          label="update bids"
          bg-color="red"
          text-color="white"
          @click="closeModal"
        />
      </div>
    </div>
  </SignBaseModal>
</template>

<script setup lang="ts">

import type { PropType } from "vue"
import { useStore } from "../../../store"
import type { Lot } from "../../../api/lot"

defineProps({
  isOpen: Boolean,
  lot: { type: Object as PropType<Lot>, default: {} as Lot },
});

const emit = defineEmits(["close"]);

const state = reactive({
  currenBidLots: [] as Array<Lot>,
})
const store = useStore()

store
  .getLots()
  .then(newLots => {
    try {
      state.currenBidLots = newLots.filter(lot => lot.highestBid.userId === store.user.userId)
      console.log("currenBidLots", state.currenBidLots)
    } catch (e) {
      console.log("error: ", e)
    }
  })
  .catch(reason => {
    console.log("reason", reason)
  })

function closeModal() {
  emit("close")
}

</script>
