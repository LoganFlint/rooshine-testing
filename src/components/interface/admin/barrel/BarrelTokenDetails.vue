<template>
  <div class="mt-10 border border-unicornSilver rounded px-7 pt-7 pb-8">
    <div class="font-serif font-bold text-xl">
      Barrel Details
    </div>
    <div class="italic font-source text-xs pt-2">
      Last Updated on {{ new Date(state.barrel.createdAt).toDateString() }} at
      {{
        `${(new Date(state.barrel.createdAt).getHours() + 24) % 12 || 12}` +
          ":" +
          `${new Date(state.barrel.createdAt).getMinutes()}` + `${convertDayTime(state.barrel.createdAt)}`
      }}
      by Admin’s Name View Log
    </div>
    <div class="pt-6 flex font-source">
      <img
        src="../../../../assets/barrel.svg"
        alt="barrel image"
      >
      <div class="pl-3 text-xl">
        <span class="font-semibold text-3xl pr-1">45,000</span> ISV
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
</script>
