<template>
  <div
    class="w-96 ml-auto rounded border border-unicornSilver py-6 pl-6 pr-28 mr-11 mb-5"
  >
    <div v-if="live" class="flex items-center h-5">
      <img
        v-if="live"
        src="../../../assets/live_red.svg"
        alt="live red pulse"
      />
      <div class="pl-2.5 text-vampireStateBuilding">
        Live
      </div>
    </div>

    <img
      v-else
      src="../../../assets/auction_right.svg"
      alt="live red pulse"
      class="h-5"
    />
    <div class="pt-2.5 font-serif font-bold text-2xl">
      {{ title }}
    </div>
    <div class="pt-2.5 font-source text-lg">
      {{ date }}
    </div>
    <div class="font-source text-lg pb-4">{{ listings }} LISTINGS</div>

    <div class="flex">
      <MainButton
        class="mr-3"
        label="view"
        bg-color="outline"
        text-color="black"
      />
      <MainButton class label="edit" bg-color="outline" text-color="black" />
    </div>
  </div>
</template>

<script setup lang="ts">
  defineProps({
    live: Boolean,
    title: { type: String, default: "" },
    date: { type: String, default: "" },
    listings: { type: Number, default: 0 },
  });
</script>
