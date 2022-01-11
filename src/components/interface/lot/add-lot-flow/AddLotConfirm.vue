<template>
  <SignBaseModal
    no-close
    :is-open="routeData.route == 'add.lot.confirm'"
    @close="$emit('close')"
  >
    <div
      data-cy="add-lot-confirm-modal"
      class="max-h-screen rounded max-w-sm w-96 flex flex-col"
    >
      <div class="flex items-center pl-5 pr-24 py-7">
        <div
          class="rounded-full bg-unicornSilver p-3 cursor-pointer"
          @click="goBack"
        >
          <img
            src="../../../../assets/arrow_left.svg"
            alt="left arrow"
          >
        </div>
        <div class="pl-9 font-serif font-bold text-2xl">
          Confirm Listing
        </div>
      </div>

      <div class="rounded border border-unicornSilver mx-5">
        <div class="bg-speedOfLight pl-5 pr-10 py-6">
          <div class="flex">
            <div
              v-for="(file, i) in barrelImages"
              :key="i"
              class="rounded pr-2.5"
            >
              <div
                v-if="Array.isArray(file)"
                class="text-planetOfTheApes bg-white rounded h-16 w-16 flex items-center justify-center font-serif text-2xl"
              >
                {{ file.length }}+
              </div>
              <img
                v-else
                class="h-16 w-16"
                :src="file ?? ''"
                alt="bottle"
              >
            </div>
          </div>

          <div class="font source flex items-center pb-3 pt-3 text-sm">
            <div>{{ routeData.data?.barrel.bottleCount }} Bottles</div>
          </div>

          <div class="font-serif font-bold text-2xl pb-4">
            {{ routeData.data?.barrel.title }}
          </div>

          <div class="flex items-center font-source pb-6">
            {{ routeData.data?.barrel.sizeMl }}cl
            <span class="px-1.5">•</span>
            {{ routeData.data?.barrel.strength }}%
            <span class="px-1.5">•</span>
            <div>{{ routeData.data?.lot.barrel.type }}</div>
          </div>
        </div>

        <div
          class="flex items-center justify-between px-5 pt-3 pb-3.5 text-planetOfTheApes border-t border-unicornSilver"
        >
          <div class="font-serif">
            Starting Price
          </div>
          <div class="flex">
            <img
              src="../../../../assets/red_barrel.svg"
              alt="barrel"
            >
            <div class="font-source text-2xl pl-1.5">
              {{ routeData.data?.lot.startPrice }}
            </div>
          </div>
        </div>
      </div>
      <div class="bg-gradient-to-t h-7 from-black opacity-20" />

      <div class="relative z-50 flex flex-col justify-center px-5">
        <div class="flex justify-center font-source text-sm py-3.5">
          <span class="font-bold pr-1">{{ routeData.data?.lot.barrel.bottleCount }}</span> Bottles Will be listed
        </div>
        <MainButton
          class="mb-5"
          data-cy="confirm-listing"
          label="confirm listing"
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
// construct an array of the first 4 images, and stack up the last as an array
let barrelImages: Array<string | null | Array<string | null>> | null = null
if (props.routeData.data && props.routeData.data.barrel.images) {
  barrelImages = [props.routeData.data.barrel.images.front, props.routeData.data.barrel.images.back]
  const additional = props.routeData.data.barrel.images.additional.slice()
  if (additional.length > 0) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    barrelImages.push(additional.shift()!)
    if (additional.length === 1) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      barrelImages.push(additional.shift()!)
    } else {
      barrelImages.push(additional) // add the remaining
    }
  } else {
    barrelImages = []
  }
}

function emitContinue() {
  emit("continue", 1)
}

function goBack() {
  emit("goBack", 1)
}

</script>
