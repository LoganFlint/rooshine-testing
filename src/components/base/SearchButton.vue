<template>
  <button class="bg-white border w-11 border-unicornSilver relative bottom-0 h-10 right-[46px]">
    <img
      v-if="calendar"
      class="rounded-r m-auto"
      src="../../assets/calender.svg"
      alt="search"
    >
    <img
      v-else
      class="rounded-r m-auto"
      src="../../assets/search.svg"
      alt="search"
    >
  </button>
</template>

<script setup lang="ts">

defineProps({
  adminSearch: Boolean,
  calendar: Boolean,
});

</script>
