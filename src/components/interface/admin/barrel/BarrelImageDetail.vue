<template>
  <div>
    <div class="max-w-lg">
      <div class="border border-unicornSilver rounded px-7 pt-7 pb-4">
        <div class="font-serif font-bold text-xl pb-2">
          Barrel Details
        </div>
        <div class="font-source text-xs italic">
          Last Updated on
          {{ new Date(state.barrel.createdAt).toDateString() }} at
          {{
            `${(new Date(state.barrel.createdAt).getHours() + 24) % 12 || 12}` +
              ":" +
              `${new Date(state.barrel.createdAt).getMinutes()}` + `${convertDayTime(state.barrel.createdAt)}`
          }}
          by Admin’s Name View Log
        </div>
        <div class="font-source text-sm pt-7 pb-4">
          Required
        </div>

        <div class="flex m-auto justify-center">
          <img
            v-if="state.imageURLs.front"
            :src="state.imageURLs.front ?? ''"
            class="w-52 h-52 m-4"
            :class="{
              'bg-americanSilver' : !state.imageURLs.front
            }"
          >
          <div
            v-else
            class="w-52 h-52 m-4 bg-americanSilver"
          />

          <img
            v-if="state.imageURLs.back"
            :src="state.imageURLs.front ?? ''"
            class="w-52 h-52 m-4"
            :class="{
              'bg-americanSilver' : !state.imageURLs.front
            }"
          >
          <div
            v-else
            class="w-52 h-52 m-4 bg-americanSilver"
          />
        </div>
        <div class="font-source text-sm pt-7 pb-4">
          Additional
        </div>
        <div class="flex justify-center">
          <div
            v-for="i in 3"
            :key="i"
          >
            <img
              v-if="state.imageURLs.additional[i]"
              :src="state.imageURLs.additional[i] ?? ''"
              class="w-32 h-32 m-4"
              :class="{
                'bg-americanSilver' : !state.imageURLs.additional[i]
              }"
            >
            <div
              v-else
              class="w-32 h-32 m-4 bg-americanSilver"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

  import { useRoute } from "vue-router";
  import api from "../../../../api/api";
  const route = useRoute();
  const barrelId = route.params.barrelId.toString();

  onMounted(async () => {
    state.barrel = await api.getBarrelById(barrelId);

    state.imageURLs.additional = [];

    for(const media of state.barrel.media) {
      if(media[0] === 0) state.imageURLs.front = imageURL(media[1]);
      else if(media[0] === 1) state.imageURLs.back = imageURL(media[1]);
      else state.imageURLs.additional.push(imageURL(media[1]));
    }
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
    },
    imageURLs: {
      front: null as string | null,
      back: null as string | null,
      additional: [] as string []
    }
  });

 function convertDayTime(day: string) {
    state.barrel.createdAt = day
    let date = new Date(day).getHours()
    if(date <= 11) {
      return "AM"
    } else if(date >= 12) {
      return "PM"
    }
  }

function imageURL(mediaId: string): string {
  return `/api/v1/barrel/${barrelId}/media/${mediaId}`;
}

</script>
