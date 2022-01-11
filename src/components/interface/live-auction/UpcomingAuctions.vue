<template>
  <div class="max-w-3xl w-full h-24 bg-white shadow-md mb-5 pl-10 pr-7 flex items-center">
    <div class="flex flex-grow justify-between">
      <div class="font-serif font-bold text-2xl">
        {{ date }}
        <span>@</span>
        {{ time }}
      </div>
      <MainButton
        class="px-6 py-1.5"
        label="list an item"
        bg-color="outline"
        text-color="red"
      />
    </div>
  </div>
</template>

<script setup lang="ts">

defineProps({
  date: { type: String, default: "" },
  time: { type: String, default: "" },
});

</script>
