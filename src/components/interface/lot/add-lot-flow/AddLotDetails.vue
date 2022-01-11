<template>
  <SignBaseModal
    :is-open="routeData.route == 'add.lot.details'"
    no-close
    @close="$emit('close')"
  >
    <div
      data-cy="add-lot-details-modal"
      class="max-h-screen rounded max-w-sm w-96"
    >
      <div
        class="flex justify-center font-source font-bold py-3 border-b text-sm border-unicornSilver"
      >
        <div class="pr-3 border-r border-unicornSilver">
          {{ routeData?.data?.barrel.title }}
        </div>
        <div class="pl-3">
          {{ routeData.data?.barrel.bottleCount }} bottles
        </div>
      </div>
      <div class="flex items-center pl-5 pr-24 pt-5 pb-6">
        <div
          class="rounded-full bg-unicornSilver p-3 cursor-pointer"
          @click="goBack"
        >
          <img
            src="../../../../assets/arrow_left.svg"
            alt="left arrow"
          >
        </div>
        <div class="text-center font-serif font-bold text-2xl pl-10">
          Listing Details
        </div>
      </div>

      <div class="flex justify-evenly border-b border-unicornSilver pb-7">
        <div class="pl-5 flex flex-col justify-center items-center">
          <div class="text-center pb-2.5 font-source">
            Listing Price
          </div>
          <TextInput
            v-model="listingPrice"
            barrel
            placeholer="Per Bottle"
            class="bg-speedOfLight w-36"
            input-type="number"
          />
          <!-- :error="state.listingPrice.hasError"
          :disabled="processing"-->
        </div>
        <div class="pr-5">
          <div class="text-center pb-2.5 font-source">
            Reserve Price
          </div>
          <TextInput
            v-model="resvPrice"
            barrel
            placeholer="Per Bottle"
            class="bg-speedOfLight w-36"
            input-type="number"
          />
          <!-- :error="state.resvPrice.hasError"
          :disabled="processing"-->
        </div>
      </div>
      <div
        class="px-12 pt-7 text-center pb-6 font-source"
      >
        Choose the auction you would like to add your listings to
      </div>
      <div class="px-8 pb-7">
        <SelectField
          v-model="type"
          class="border border-unicornSilver z-50"
          label="Select Auction"
          :options="barrelTypes"
        />
      </div>
      <div class="bg-gradient-to-t h-7 from-black opacity-20" />
      <div class="flex flex-col justify-center px-5">
        <div class="flex justify-center font-source text-sm py-3.5">
          <span class="font-bold pr-1">{{ routeData.data?.lot.barrel.bottleCount }}</span> Bottles Will be listed
        </div>
        <MainButton
          class="mb-5"
          data-cy="continue-create-listing-details"
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

import type { PropType } from "vue"
import type { RouteData } from "../../../base/ProfileModalManager.vue"

const props = defineProps({ routeData: { type: Object as PropType<RouteData>, required: true } });
const emit = defineEmits(["close", "continue", "goBack"]);
const listingPrice = ref<string>(props.routeData.data ? `${props.routeData.data.lot.startPrice}` : "")
const resvPrice = ref<string>(props.routeData.data ? `${props.routeData.data.lot.minPrice}` : "")
const type = ref<string>(props.routeData.data ? `${props.routeData.data.lot.barrel.type}` : "")

const barrelTypes = ref({
  Islay: "Islay",
  Malt: "Malt",
  Speyside: "Speyside",
  Highland: "Highland",
})

function goBack() {
  emitMovement("goBack")
}

function emitContinue() {
  emitMovement("continue")
}

function emitMovement(emitName: "goBack" | "continue") {
  const newLot = props.routeData.data?.lot
  if (newLot) {
    newLot.startPrice = parseInt(listingPrice.value)
    newLot.minPrice = parseInt(resvPrice.value)
    newLot.barrel.type = type.value
  }
  emit(emitName, 1, newLot)
}

</script>
