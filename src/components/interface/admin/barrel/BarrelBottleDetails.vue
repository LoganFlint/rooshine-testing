<template>
  <div
    class=""
    data-cy="admin-barrel-bottle-details"
  >
    <div
      class="w-full pt-7 pl-7 pr-16 pb-4 border border-unicornSilver rounded"
    >
      <div class="flex flex-col justify-start">
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
        <div class="pt-9 flex pb-4 border-b border-unicornSilver">
          <div class="w-1/2 font-source font-semibold">
            Name of Barrel
          </div>
          <div class="w-1/2">
            {{ state.barrel.title }}
          </div>
        </div>

        <div class="flex py-4 border-b border-unicornSilver">
          <div class="w-1/2 font-source font-semibold">
            Distillery
          </div>
          <div class="w-1/2">
            {{ state.barrel.distilleryName }}
          </div>
        </div>

        <div class="flex py-4 border-b border-unicornSilver">
          <div class="w-1/2 font-source font-semibold">
            Location
          </div>
          <div class="w-1/2">
            {{ state.barrel.distilleryLocation }}
          </div>
        </div>

        <div class="flex py-4 border-b border-unicornSilver">
          <div class="w-1/2 font-source font-semibold">
            Size
          </div>
          <div class="w-1/2">
            {{ state.barrel.sizeMl }}
          </div>
        </div>

        <div class="flex py-4 border-b border-unicornSilver">
          <div class="w-1/2 font-source font-semibold">
            Type
          </div>
          <div class="w-1/2">
            {{ state.barrel.type }}
          </div>
        </div>

        <div class="flex py-4 border-b border-unicornSilver">
          <div class="w-1/2 font-source font-semibold">
            Age
          </div>
          <div class="w-1/2">
            {{ state.barrel.age }}
          </div>
        </div>

        <div class="flex py-4 border-b border-unicornSilver">
          <div class="w-1/2 font-source font-semibold">
            Strength
          </div>
          <div class="w-1/2">
            {{ state.barrel.strength }}
          </div>
        </div>

        <div class="border-b border-unicornSilver py-4 w-[454px]">
          <div class="font-source font-semibold">
            Description
          </div>
          <div class="bg-white pt-4 rounded">
            {{ state.barrel.description }}
          </div>
        </div>

        <div class="pt-5">
          <div class="font-source font-semibold pb-4">
            Documents
          </div>
          <div>
            <div class="h-7 bg-unicornSilver" />
            <!-- <DragDropUpload
                class="pb-4"
                :upload-type="FileTypes.documents"
                :barrel-id="barrelId"
              /> -->
            <!-- <DragDropUpload
                class="pn-4"
                :upload-type="FileTypes.documents"
                :barrel-id="barrelId"
              /> -->
          </div>
          <div class="py-7">
            <a
              class="text-planetOfTheApes font-source font-semibold text-xs"
              href="#"
            >ADD ANOTHER DOCUMENT</a>
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
  let barrelId = route.params.barrelId.toString();

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
      status: ""
    },
  })

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
