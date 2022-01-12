<template>
  <div class="mt-10 border border-unicornSilver rounded px-7 pt-7 pb-8">
    <div class="font-serif font-bold text-xl">
      Barrel Token
    </div>
    <div class="italic font-source text-xs pt-2">
      Last Updated on {{ new Date(state.barrel.createdAt).toDateString() }} at
      {{
        `${(new Date(state.barrel.createdAt).getHours() + 24) % 12 || 12}` +
          ":" +
          `${new Date(state.barrel.createdAt).getMinutes()}` +
          `${convertDayTime(state.barrel.createdAt)}`
      }}
      by Admin’s Name View Log
    </div>

    <div class="flex pt-4">
      <img
        src="../../../../assets/hbar.svg"
        alt="hbar logo"
      >
      <div
        v-if="state.barrel.mintedBarrelId"
        class="pl-2"
      >
        Token {{ state.barrel.mintedBarrelId }}
      </div>
      <div
        v-else
        class="pl-2"
      >
        Token 0.0.213561
      </div>
    </div>

    <MainButton
      data-cy="barrel-info-create-token"
      class="py-2 mt-6 w-full"
      label="create barrel token"
      bg-color="red"
      text-color="white"
      :disabled="true"
      @click="createNewToken"
    />
    <!-- disabled will only be true until the barrel / lot is marked as delivered  -->
  </div>
</template>

<script setup lang="ts">

import { useRoute } from "vue-router";
import api from "../../../../api/api";
import type { BarrelFromAPI } from "../../../../api/modules/barrel";

const route = useRoute();
const barrelId = route.params.barrelId.toString();

function createNewToken() {
  console.log("clicked createNewToken");
}

onMounted(async () => {
  state.barrel = await api.getBarrelById(barrelId);
});

const state = reactive({
  barrel: {
    barrelId: "",
    userId: "",
    title: "",
    description: "",
    distilleryName: "",
    distilleryLocation: "",
    type: "",
    age: "",
    sizeMl: 0,
    strength: "",
    media: [],
    createdAt: "",
    updatedAt: "",
    mintedBarrelId: ""
  } as BarrelFromAPI,
});

function convertDayTime(day: string) {
  state.barrel.createdAt = day;
  let date = new Date(day).getHours();
  if (date <= 11) {
    return "AM";
  } else if (date >= 12) {
    return "PM";
  }
}

</script>
