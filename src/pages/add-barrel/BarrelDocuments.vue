<template>
  <div class="h-auto ml-5 bg-speedOfLight w-[675px] pt-7 px-7 pb-20">
    <div class="font-serif font-bold text-2xl">
      Upload Documents
    </div>
    <div class="font-source text-sm pt-2.5 pb-8">
      Submit all documents to prove authenticity (i.e. sales receipt, proof of
      purchase, insurance documents, etc.)
    </div>
    <div
      v-for="(fileObj, i) of state.imageFiles"
      :key="fileObj.index"
      class="flex w-full py-2"
    >
      <div>
        <DragDropUpload
          v-model="state.imageFiles[i].file"
          class="mr-2 ml-4"
          direction="front side"
          :upload-type="FileTypes.documents"
          :barrel-id="barrelId"
          :doc-desc="state.imageFiles[i].desc"
          @updateBusy="state.imageFiles[i].isBusy = $event"
          @updateDocDesc="state.imageFiles[i].desc = $event"
          @update:modelValue="fileUpdated"
          @addFileAdditional="addExtraDocFiles"
        />
        <div
          v-if="!continueAllowed"
          class="ml-4 text-planetOfTheApes pt-1"
        >
          Minimum One document required
        </div>
      </div>
    </div>
    <div class="mr-auto">
      <!-- TODO this should emit or make a new component come up for the user to upload another document.... ? -->
      <MainButton
        label="ADD ANOTHER DOCUMENT"
        class="px-0 mt-2"
        bg-color="tranparent"
        text-color="red"
        @click="addDocument"
      />
    </div>
    <div class="flex justify-center">
      <MainButton
        label="Continue"
        class="w-60 h-9 mt-8"
        :disabled="isBusy || !continueAllowed"
        @click="continueToNext"
      />
    </div>
  </div>
</template>

<script setup lang="ts">

import { getBarrelInfo } from "../../api/modules/barrel";
import { FileTypes } from "../../domain/FileTypes";

interface AdditionFile {
  index: number;
  file: MediaFile;
  desc: string | null;
  isBusy: boolean;
}

type MediaFile = File | null | { mediaId: string };
const props = defineProps({ barrelId: { type: String, default: "" } });
const emit = defineEmits(["continue"]);
/* Not used yet
const numDocuments = ref(1)
const input = ref<HTMLInputElement | null>(null)
const documentNotes = ref<string>("")
*/

const state = reactive({
  imageFiles: [{ index: 0, file: null, desc: null, isBusy: false }] as AdditionFile[],
  currentIndex: 0,
});

const isBusy = computed(() => {
  return state.imageFiles.reduce(
    (cumulativeBusy, curBusy) => cumulativeBusy || curBusy.isBusy,
    false
  );
});

const continueAllowed = computed(() => {
  return state.imageFiles.filter((pFile) => pFile.file).length > 0;
});

getBarrelInfo(props.barrelId)
  .then((barrel) => {
    state.imageFiles = [];
    if (barrel.authMedia) {
      barrel.authMedia.forEach(([authenticationId, description]) => {
        state.imageFiles.push({
          index: ++state.currentIndex,
          file: { mediaId: authenticationId },
          desc: description,
          isBusy: false,
        });
      });
    }
    if (state.imageFiles.filter((pFile) => !pFile.file).length < 1)
      state.imageFiles.push({
        index: ++state.currentIndex,
        file: null,
        desc: null,
        isBusy: false,
      }); // add a blank one
  })
  .catch((reason) => {
    console.log("data", reason?.response?.data);
    console.error("reason", reason);
  });

/** fires when there are more than one file dragged onto the drag-and-drop target, ensures we add another box for them  */
function addExtraDocFiles(files: File[]) {
  state.imageFiles.forEach((fileObj, i) => {
    if (files.length > 0 && fileObj.file === null) {
      const newFile = files.shift();
      if (newFile)
        state.imageFiles[i] = {
          index: ++state.currentIndex,
          file: newFile,
          desc: null,
          isBusy: false,
        };
    }
  });
  state.imageFiles.push(
    ...files.map((file) => ({
      index: ++state.currentIndex,
      file: file,
      desc: null,
      isBusy: false,
    }))
  );
  if (state.imageFiles.filter((fileObj) => !fileObj.file).length < 1) {
    state.imageFiles.push({
      index: ++state.currentIndex,
      file: null,
      desc: null,
      isBusy: false,
    }); // add a blank one
  }
}

/** fires when a file gets selected or removed */
function fileUpdated(file: MediaFile | undefined): void {
  if (file) {
    if(state.imageFiles[state.imageFiles.length - 1].file === null) state.imageFiles.pop();
  } else {
    for(const file of state.imageFiles){
      if(file.file === null) state.imageFiles.splice(state.imageFiles.indexOf(file), 1);
    }
    if(state.imageFiles.length == 0) state.imageFiles.push({ index: 0, file: null, desc: null, isBusy: false } as AdditionFile);
  }
}

function addDocument() {
  state.imageFiles.push({
    index: ++state.currentIndex,
    file: null,
    desc: null,
    isBusy: false,
  });
}

function continueToNext() {
  if (!isBusy.value && continueAllowed.value) {
    emit("continue", props.barrelId, "create-barrel.documents");
  }
}

</script>

<style scoped>
[placeholder]:empty::before {
  content: attr(placeholder);
  color: #555;
}
[placeholder]:empty:focus::before {
  content: "";
}
</style>
