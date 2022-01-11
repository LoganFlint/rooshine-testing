<template>
  <SignBaseModal
    no-close
    :is-open="routeData.route == 'add.lot.bottles'"
    @close="$emit('close')"
  >
    <div
      data-cy="add-lot-bottles-modal"
      class="max-h-screen rounded max-w-sm w-96"
    >
      <div
        class="flex justify-center items-center font-source font-bold py-3 text-sm border-b border-unicornSilver"
      >
        <div class="pr-3 border-r border-unicornSilver">
          {{ routeData?.data?.barrel.title }}
        </div>
        <div class="pl-3">
          {{ routeData.data?.barrel.bottleCount }} bottles
        </div>
      </div>
      <div class="pt-5 text-center font-serif font-bold text-2xl pb-2">
        Select Bottles to List
      </div>
      <div class="flex justify-center pb-3">
        <Checkbox
          v-model="state.allSelected"
          label="Select All"
          @update:modelValue="toggleSelectAll"
        />
      </div>

      <div class="flex flex-wrap items-center pl-6 max-h-72 overflow-y-auto">
        <div
          v-for="(bottleIsSelected, i) in state.bottleIsSelected"
          :key="i + 1"
          class="pr-2 pb-2"
        >
          <div class="flex justify-center">
            <img
              v-if="bottleIsSelected"
              class="cursor-pointer w-3.5 h-9"
              :src="full"
              alt="full bottle"
              @click="handleClickBottle(i)"
            >
            <img
              v-else
              class="cursor-pointer w-3.5 h-9"
              :src="empty"
              alt="empty bottle"
              @click="handleClickBottle(i)"
            >
          </div>
          <div class="font-source font-black text-xs text-center">
            {{ i + 1 }}
          </div>
        </div>
      </div>
      <div class="bg-gradient-to-t h-7 from-black opacity-20" />
      <div class="relative z-30 flex flex-col px-5">
        <div class="py-3.5 text-center flex justify-center">
          <div class="text-sm font-source">
            <span class="font-bold">{{ state.numSelected }}</span> bottles will be listed
          </div>
        </div>
        <MainButton
          class="mb-5 w-full"
          data-cy="continue-create-listing"

          label="continue"
          bg-color="red"
          text-color="white"
          @click="emitContinue"
        />
      </div>
    </div>
  </SignBaseModal>
</template>

<script setup lang="ts">

import type { PropType } from "vue";
import full from "../../../../assets/bottle_full.svg";
import empty from "../../../../assets/bottle_empty.svg";
import type { RouteData } from "../../../base/ProfileModalManager.vue";

const props = defineProps({ routeData: { type: Object as PropType<RouteData>, required: true } });
const emit = defineEmits(["close", "continue", "goBack"]);

const state = reactive({
  /** keeps track of how many are selected */
  numSelected: 0,
  /** array of booleans indicating if each bottle is selected, default false */
  bottleIsSelected: [] as Array<boolean>,
  /** used for checkbox */
  allSelected: false,
})

onMounted(() => {
  // initialize it all to false
  if (props.routeData.data) {
    for (let i = 0; i < props.routeData.data.barrel.bottleCount; i++) {
      state.bottleIsSelected[i] = i < props.routeData.data.lot.barrel.bottleCount
      state.numSelected = props.routeData.data.lot.barrel.bottleCount
    }
  }
})

function handleClickBottle(bottleNum: number) {
  let numSelected = 0
  state.bottleIsSelected.forEach((i, index) => {
    state.bottleIsSelected[index] = index <= bottleNum
    if (state.bottleIsSelected[index]) numSelected++
  })
  state.numSelected = numSelected
}

function emitContinue() {
  const newLot = props.routeData.data?.lot
  if (newLot) {
    newLot.barrel.bottleCount = state.numSelected
  }
  emit("continue", 1, newLot)
}

function toggleSelectAll() {
  state.allSelected = !state.allSelected
  let numSelected = 0
  state.bottleIsSelected.forEach((i, index) => {
    state.bottleIsSelected[index] = state.allSelected
    if (state.bottleIsSelected[index]) numSelected++
  })
  state.numSelected = numSelected
}

</script>
