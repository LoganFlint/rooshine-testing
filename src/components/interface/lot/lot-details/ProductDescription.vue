<template>
  <div class="bg-white pt-9 pb-12 w-[421px]">
    <div class="flex border-b border-unicornSilver pb-4">
      <div class="font-serif pl-7 font-bold text-2xl pr-2">
        Product Description
      </div>
    </div>
    <div class="w-96 pl-7 pr-10 py-7 pb-6">
      {{ description }}
    </div>
  </div>
</template>

<script setup lang="ts">
  defineProps({ description: { type: String, default: "" } });
</script>
