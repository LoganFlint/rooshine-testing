<template>
  <img
    v-if="red"
    class="pl-2 h-7 relative"
    src="../../assets/loading_red.svg"
    alt="loading spinner"
  >
  <img
    v-else
    class="pl-2 h-7 relative"
    src="../../assets/loading.svg"
    alt="loading spinner"
  >
</template>

<script setup lang="ts">
	defineProps({ red: Boolean });
</script>
