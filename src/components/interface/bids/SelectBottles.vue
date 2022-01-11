<template>
  <div
    data-cy="select-bottles-modal"
    class="w-96 max-w-sm max-h-screen rounded bg-white"
  >
    <div class="relative z-0">
      <div
        class="flex font-source font-bold py-3 justify-center items-center border-b border-unicornSilver"
      >
        <div class="border-r border-unicornSilver pr-3">
          LOT
          <span>#{{ lotNumber }}</span>
        </div>
        <div class="pl-3">
          {{ `${bottleCount} Bottle${bottleCount == 1 ? "" : "s"}` }}
        </div>
      </div>

      <div class="flex items-center pl-5 pt-5 pb-2.5">
        <div
          class="bg-speedOfLight p-3 rounded-full cursor-pointer"
          @click="$emit('previous')"
        >
          <img
            class="mr-auto"
            src="../../../assets/arrow_left.svg"
            alt="arrow left"
          >
        </div>
        <div class="font-serif font-bold text-2xl m-auto">
          Select Bottles
        </div>
      </div>

      <div class="flex justify-center font-source font-semibold text-sm pb-4">
        <Checkbox
          v-model="state.allSelected"
          label="Select All"
          @update:modelValue="toggleSelectAll"
        />
      </div>

      <div class="flex flex-wrap items-center pl-6 max-h-72 overflow-y-auto">
        <div
          v-for="(bottle, key) in state.bottles"
          :key="key"
          class="px-1 py-1 cursor-pointer select-none"
          @click="handleClickBottle($event, key + '')"
        >
          <div v-if="!bottle.sold">
            <img
              v-if="bottle.selected"
              class="cursor-pointer w-3.5 h-9"
              :src="full"
              alt="empty bottle"
            >
            <img
              v-else
              class="cursor-pointer w-3.5 h-9"
              :src="empty"
              alt="full bottle"
            >
            <div class="font-source font-black text-xs text-center">
              {{ parseInt(key + "") + 1 }}
            </div>
          </div>
        </div>
      </div>
      <div class="bg-gradient-to-t h-7 from-black opacity-20" />
    </div>

    <div class="pt-3.5 pb-5 px-5 relative z-30">
      <div class="font-source text-sm text-center py-3.5">
        <span
          class="font-bold pr-0.5"
        >{{ Object.values(bottles).filter(bottle => bottle.selected).length }}</span>
        Bottle{{
          Object.values(bottles).filter(bottle => bottle.selected).length == 1 ? "" : "s"
        }}
        Selected
      </div>
      <MainButton
        class="w-full"
        label="continue"
        bg-color="red"
        text-color="white"
        @click="emitContinue"
      />
    </div>
  </div>
</template>

<script setup lang="ts">

import empty from "../../../assets/bottle_empty.svg"
import full from "../../../assets/bottle_full.svg"
import type { PropType } from "vue"
import type { BottleData } from "./BidModal.vue";

const props = defineProps({
  lotNumber: { type: Number, default: 0 },
  bottles: { type: Object as PropType<Array<BottleData>>, required: true },
  bottleCount: { type: Number, default: 0 }
});

const emit = defineEmits(["continue", "previous", "selectedBottles", "close"]);
const state = reactive<{ allSelected: boolean; lastBottleClicked: null | { index: number }; bottles: Record<number, BottleData> }>({
  /** used for checkbox */
  allSelected: false,
  lastBottleClicked: null,
  bottles: props.bottles,
})

function emitContinue() {
  const bottles = Object.values(state.bottles).reduce((prev, bottle) => {
    if (bottle.selected) prev[bottle.index] = bottle
    return prev
  }, [] as BottleData[]);

  emit("selectedBottles", bottles);
  emit("continue");
}

function handleClickBottle(event: MouseEvent, key: string) {
  const keyInt = parseInt(key)
  const keys: number[] = Object.keys(state.bottles).map(pKey => parseInt(pKey))
  if (event.shiftKey) {
    // then they want to selecct everything in-between the last click and this one
    const selected = !state.bottles[keyInt].selected
    const lower = Math.min(state.lastBottleClicked?.index ?? keys.indexOf(keyInt), keys.indexOf(keyInt))
    const higher = Math.max(state.lastBottleClicked?.index ?? keys.indexOf(keyInt), keys.indexOf(keyInt))
    for (let i = lower; i <= higher; i++) {
      state.bottles[keys[i]].selected = selected
    }
  } else {
    state.bottles[keyInt].selected = !state.bottles[keyInt].selected
  }
  state.lastBottleClicked = {
    index: keys.indexOf(keyInt),
  }
  updateAllSelected()
}

function updateAllSelected() {
  if (Object.values(state.bottles).filter(bottle => bottle.selected).length === Object.values(state.bottles).length) {
    state.allSelected = true
    console.log("state.allSelected = true", (state.allSelected = true))
  } else if (Object.values(state.bottles).filter(bottle => !bottle.selected).length === Object.values(state.bottles).length) {
    state.allSelected = false
    console.log("state.allSelected = false", (state.allSelected = false))
  }
}

function toggleSelectAll() {
  Object.entries(state.bottles).forEach(entry => {
    if (!entry[1].sold) entry[1].selected = state.allSelected;
  })
}

</script>
