<template>
  <div class="h-auto ml-5 bg-speedOfLight w-[675px] px-7 pb-20">
    <div class="font-serif font-bold text-2xl py-7">
      Review your request
    </div>
    <div class="flex pb-8">
      <div
        v-for="(imageURL, i) in state.imageURLs"
        :key="i"
      >
        <img
          class="w-20 h-20 mr-3"
          :src="imageURL"
          alt="bottle image"
        >
      </div>
    </div>
    <div class="font-serif font-bold text-xl pb-7">
      {{ title }}
    </div>
    <div class="flex flex-col pb-4">
      <div class="flex pb-4 border-b border-unicornSilver">
        <div class="w-48 font-source font-semibold">
          Distillery
        </div>
        <div>{{ distillery }}</div>
      </div>

      <div class="flex py-4 border-b border-unicornSilver">
        <div class="w-48 font-source font-semibold">
          Location
        </div>
        <div>{{ location }}</div>
      </div>

      <div class="flex py-4 border-b border-unicornSilver">
        <div class="w-48 font-source font-semibold">
          Size
        </div>
        <div>{{ size }}</div>
      </div>

      <div class="flex py-4 border-b border-unicornSilver">
        <div class="w-48 font-source font-semibold">
          Type
        </div>
        <div>{{ type }}</div>
      </div>

      <div class="flex py-4 border-b border-unicornSilver">
        <div class="w-48 font-source font-semibold">
          Age
        </div>
        <div>{{ age }}</div>
      </div>

      <div class="flex py-4 border-b border-unicornSilver">
        <div class="w-48 font-source font-semibold">
          Strength
        </div>
        <div>{{ strength }}</div>
      </div>

      <div class="flex py-4 border-b border-unicornSilver">
        <div class="w-48 font-source font-semibold">
          Cask Type
        </div>
        <div>{{ type }}</div>
      </div>
    </div>

    <div class="border-b border-unicornSilver pb-4">
      <div class="font-source font-semibold">
        Description
      </div>
      <div class="my-4 bg-white py-5 px-5 rounded">
        {{ description }}
      </div>
    </div>

    <div class="py-4">
      <div class="font-source font-semibold">
        Reserve Price
      </div>
      <div class="my-4 bg-white py-5 px-5 rounded">
        $ {{ reservePrice.toLocaleString() }}
      </div>
    </div>

    <div class="flex mt-8">
      <MainButton
        class="py-2 ml-2 mr-3 w-56"
        label="EDIT REQUEST"
        text-color="red"
        bg-color="outline"
        @click="returnToForm"
      />

      <MainButton
        :label="'SUBMIT TO ROOSHINE'"
        class="h-9 py-2 w-96"
        :disabled="!readyToSubmit"
        @click="submitBarrel"
      />
      <BarrelConfirmModal
        :is-open="state.showConfirmation"
        @close="state.showConfirmation = false"
      />
    </div>
  </div>
</template>

<script setup lang="ts">

import type { PropType } from "vue";
import type { BarrelImages, BarrelDetails } from "../../pages/add-barrel/AddBarrelParent.vue";
import type { BarrelPatch } from "../../api/barrel";

import api from "../../api/api";

const props = defineProps({
  barrelId: { type: String, required: true },
  reservePrice: { type: Number, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  distillery: { type: String, required: true },
  location: { type: String, required: true },
  type: { type: String, required: true },
  age: { type: String, required: true },
  size: { type: String, required: true },
  strength: { type: String, required: true },
  images: { type: Object as PropType<BarrelImages>, required: true },
});

const emit = defineEmits(["returnToForm"]);

const state = reactive({
  barrelPatch: {
    title: props.title,
    description: props.description,
    distilleryName: props.distillery,
    distilleryLocation: props.location,
    type: props.type,
    age: props.age,
    sizeMl: Number(props.size),
    reservePrice: props.reservePrice
  } as BarrelPatch,
  images: props.images,
  imageURLs: [] as string[],
  showConfirmation: false
});

const readyToSubmit = computed(() => {
  return props.age !== "" &&
    props.barrelId !== "" &&
    props.distillery !== "" &&
    props.title !== "" &&
    props.strength !== "" &&
    props.location !== "" &&
    props.strength !== ""
});

onMounted(() => {
  if(state.images.front?.mediaId) state.imageURLs.push(getMediaURL(state.images.front?.mediaId));
  else state.imageURLs.push(createPreviewURL(state.images.front as File));
  if(state.images.back?.mediaId) state.imageURLs.push(getMediaURL(state.images.back?.mediaId));
  else state.imageURLs.push(createPreviewURL(state.images.back as File));
  if(state.images.additional) {
    for(let i = 0; i < state.images.additional.length; i++) {
      const additionalImage = state.images.additional[i];
      if(additionalImage) {
        if(additionalImage?.mediaId) state.imageURLs.push(getMediaURL(additionalImage.mediaId));
        else state.imageURLs.push(createPreviewURL(additionalImage as File));
      }
    }
  }
});

function popConfirmationModal() {
  state.showConfirmation = true;
}

function createPreviewURL(file: File): string {
  if(!file) return "";
  return URL.createObjectURL(file);
}

async function submitBarrel(): Promise<void> {
  await api.editBarrel(props.barrelId, { body: state.barrelPatch }).then(() => {
    popConfirmationModal();
  }).catch((error) => {
    throw error;
  });
}

function returnToForm(): void {
  const barrelDetails = {
    barrelPatch: state.barrelPatch,
    barrelId: props.barrelId,
    images: props.images,
    imageURLs: state.imageURLs
  } as BarrelDetails;
  emit("returnToForm", barrelDetails);
}

function getMediaURL(mediaId: string): string {
  return `/api/v1/barrel/${props.barrelId}/media/${mediaId}`;
}

</script>
