<template>
  <div
    v-if="isOpen"
    class="fixed top-0 left-0 right-0 bottom-0"
    @click="close"
  />
  <div class="relative h-0 w-0">
    <div
      :class="[
        'absolute left-52 -top-5 rounded cursor pointer',
        {
          'opacity-100 translate-y-0': isOpen,
          'opacity-0 -translate-y-4 invisible': !isOpen,
        },
      ]"
      @click="close"
    >
      <div
        class="relative w-96 px-5 py-3 top-8 right-28 ease-in-out shadow-2xl transition-all duration-1000 transform z-10 bg-speedOfLight rounded"
        @click.stop
      >
        <div
          :class="['w-full flex items-start pb-4', { 'pb-0': state.bottleErr.hasError && state.amountErr.hasError }]"
        >
          <div class="flex flex-col w-2/3">
            <div class="flex items-center">
              <MainButton
                class="mr-2 h-11 w-full"
                label="select bottles"
                bg-color="white"
                text-color="black"
                @click="selectBottles"
              />
              <div class="tracking-wider text-xs uppercase font-source font-semibold">
                <div class="relative right-10">
                  {{ state.selectedBottlesNums }}
                </div>
              </div>
            </div>

            <Modal
              :is-open="selectSomeBottles === true"
              @close="closeBottles"
            >
              <SelectBottles
                :lot-number="lot.lotNumber"
                :bottles="state.bottles"
                @selected-bottles="submitBottles"
                @close="closeBottles"
              />
            </Modal>

            <div
              v-if="state.bottleErr.hasError"
              class="text-planetOfTheApes text-sm pt-2 pb-2"
            >
              {{ state.bottleErr.label }}
            </div>
          </div>

          <div class="w-1/3">
            <TextInput
              v-model="bidAmount"
              class="bg-white"
              placeholder="bid amount"
              @input="onAmountChange"
            />
            <div
              v-if="state.amountErr.hasError"
              class="text-planetOfTheApes text-sm pt-2"
            >
              {{ state.amountErr.label }}
            </div>
          </div>
        </div>

        <MainButton
          class="w-full"
          label="submit bid"
          bg-color="red"
          text-color="white"
          type="submit"
          @click="submitBid"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import type { PropType } from "vue"
import type { Lot } from "../../../api/lot"
import type { BottleData } from "./BidModal.vue"

const props = defineProps({
  isOpen: { type: Boolean, default: false },
  lot: { type: Object as PropType<Lot>, default: {} as Lot },
});

const emit = defineEmits(["selectItem", "close", "continue"]);

const state = reactive({
  selectedBottlesNums: 0,
  amountErr: { hasError: false, label: "amount required" },
  bottleErr: { hasError: false, label: "you must select bottles" },
  bottles: [] as BottleData[],
  /** bottles user selected */
  selectedBottles: [] as BottleData[]
})

Object.values(props.lot.bottles).forEach(bottle => { 
  state.bottles.push({
    ...bottle, selected: false
  });
});

const bidAmount = ref<string>("")
const selectSomeBottles = ref(false)

function checkError() {
  let hasError = false
  state.amountErr.hasError = bidAmount.value.length < 1
  hasError = hasError || state.amountErr.hasError
  state.bottleErr.hasError = state.selectedBottlesNums == 0
  hasError = hasError || state.bottleErr.hasError
  if (hasError) throw new Error("missing values")
}

function closeQuickBid() {
  emit("close")
}

function selectBottles() {
  selectSomeBottles.value = true
}

function closeBottles() {
  selectSomeBottles.value = false
}

/** user has selected the bottles, so we should update our local state with those bottles */
function submitBottles(bottles: BottleData[]) {
  state.selectedBottles = bottles
  state.selectedBottlesNums = Object.keys(bottles).length
  closeBottles()
}

function submitBid() {
  console.log("submitBid clicked", state.selectedBottles, bidAmount.value)
  checkError()
  closeQuickBid()
}

function onAmountChange(event: Event) {
  if (parseInt((event.target as HTMLInputElement).value) >= 0) {
    state.amountErr.hasError = false
  }
}

</script>
