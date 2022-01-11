<template>
  <div class="h-auto ml-5 bg-speedOfLight w-[675px] pt-7 px-7 pb-20">
    <div class="font-serif font-bold text-2xl">
      Upload Photos
    </div>
    <div
      class="font-source text-sm pt-2.5"
    >
      Photos must be at least 1000x1000px, preferably with a white background.
    </div>
    <div class="font-source py-4">
      Required
    </div>
    <div class="grid grid-cols-2 grid-flow-row gap-6 pb-2">
      <!-- Front, required -->
      <div>
        <DragDropUpload
          v-model="state.front.file"
          bottle-direction="front side"
          :upload-type="FileTypes.bottle"
          :barrel-id="barrelId"
          :slot-num="0"
          @updateBusy="state.front.isBusy = $event"
          @add-file-additional="addExtraImageFiles"
        />
        <div
          v-if="state.front.file === null"
          class="pt-1 text-planetOfTheApes"
        >
          Front image required
        </div>
      </div>

      <!-- Back, required -->
      <div>
        <DragDropUpload
          v-model="state.back.file"
          bottle-direction="back side"
          :upload-type="FileTypes.bottle"
          :barrel-id="barrelId"
          :slot-num="1"
          @updateBusy="state.back.isBusy = $event"
          @add-file-additional="addExtraImageFiles"
        />
        <div
          v-if="state.back.file === null"
          class="pt-1 text-planetOfTheApes"
        >
          Back image required
        </div>
      </div>
    </div>
    <div class="font-source py-4">
      Additional
    </div>
    <div class="w-full grid grid-cols-3 gap-6 grid-flow-row">
      <!-- Additional 1 -->
      <DragDropUpload
        v-for="(fileObj, i) in state.additional"
        :key="fileObj.index"
        v-model="state.additional[i].file"
        class="flex-grow"
        :upload-type="FileTypes.image"
        :barrel-id="barrelId"
        :slot-num="i + 2"
        @updateBusy="state.additional[i].isBusy = $event"
        @update:modelValue="fileUpdated"
        @add-file-additional="addExtraImageFiles"
      />
    </div>
    <div class="flex justify-center">
      <MainButton
        label="Continue"
        class="w-60 h-9 mt-8"
        :disabled="isBusy"
        @click="continueToNext"
      />
    </div>
  </div>
</template>

<script setup lang="ts">

import { FileTypes } from "../../domain/FileTypes";
import { getBarrelInfo } from "../../api/modules/barrel"
import type { BarrelImages } from "./AddBarrelParent.vue";

interface AdditionFile extends FrontBack {
  index: number
}

interface FrontBack {
  file: MediaFile
  isBusy: boolean
}

type MediaFile = File | null | { mediaId: string }

const props = defineProps({ barrelId: { type: String, default: "" } });
const emit = defineEmits(["continue", "updateImages"]);
const state = reactive<{ front: FrontBack; back: FrontBack; additional: AdditionFile[]; currentIndex: number }>({
  front: { file: null, isBusy: false },
  back: { file: null, isBusy: false },
  additional: [
    { index: 2, file: null, isBusy: false },
    { index: 3, file: null, isBusy: false },
    { index: 4, file: null, isBusy: false },
  ],
  currentIndex: 4,
})

const isBusy = computed(() => {
  return state.additional.reduce((cumulativeBusy, curBusy) => cumulativeBusy || curBusy.isBusy, false) || state.front.isBusy || state.back.isBusy
})

const continueAllowed = computed(() => {
  return state.front.file && state.back.file
})

getBarrelInfo(props.barrelId)
  .then(barrel => {
    enum Slot {
      front = 0,
      back = 1,
    }
    enum Media {
      index = 0,
      value = 1,
    }
    if (barrel.media.filter(value => value[Media.index] === Slot.front).length > 0)
      state.front = { file: { mediaId: barrel.media.filter(value => value[Media.index] === Slot.front)[0][Media.value] ?? null }, isBusy: false }
    if (barrel.media.filter(value => value[Media.index] === Slot.back).length > 0)
      state.back = { file: { mediaId: barrel.media.filter(value => value[Media.index] === Slot.back)[0][Media.value] ?? null }, isBusy: false }
    barrel.media
      .filter(value => value[Media.index] > Slot.back)
      .forEach(([slot, mediaId]) => {
        state.additional[slot - 2] = { index: slot, file: { mediaId }, isBusy: false }
      })
  })
  .catch(reason => {
    console.log("data", reason?.response?.data)
    console.error("reason", reason)
  })

/** fires when there are more than one file dragged onto the drag-and-drop target, ensures we add another box for them  */
function addExtraImageFiles(files: File[]) {
  state.additional.forEach((fileObj, i) => {
    if (files.length > 0 && fileObj.file === null) {
      const newFile = files.shift()
      if (newFile && i < state.additional.length) state.additional[i] = { index: ++state.currentIndex, file: newFile, isBusy: false }
    }
  })
  files = files.slice(0, 2);
  state.additional.push(...files.map(file => ({ index: ++state.currentIndex, file: file, isBusy: false })))
}

/** fires when a file gets selected or removed */
function fileUpdated(): void {
  handleFileRemoved()
}

function handleFileRemoved() {
  // file was removed, so check if we need to remove one
  if (
    state.additional.filter(pFile => !pFile.file).length > 1 && // there is more than one blank total
    state.additional.filter(pFile => !pFile.file && pFile.index <= 4).length > 0
  ) {
    //there is at least one blank in the first 3
    for (let loc = state.additional.length - 1; loc > 2; loc--) {
      // so we can remove all the rest of the blanks at the end
      if (!state.additional[loc].file) {
        state.currentIndex--
        state.additional.splice(loc, 1) // remove the blank
      } else {
        break
      }
    }
  }
}

function continueToNext() {
  const images = {
    front: state.front.file,
    back: state.back.file,
    additional: [
      state.additional[0].file,
      state.additional[1].file,
      state.additional[2].file
    ]
  } as BarrelImages;
	if (!isBusy.value && continueAllowed.value) {
    emit("updateImages", images);
		emit("continue", props.barrelId, "create-barrel.photos")
	}
}

</script>
