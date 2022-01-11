<template>
  <router-link
    :to="{ name: route }"
    class="relative"
  >
    <img
      class="h-44 object-cover"
      :src="image"
      :alt="label"
    >
    <div
      class="font-serif text-2xl tracking-wide font-bold text-white absolute bottom-5 left-7"
    >
      {{ label }}
    </div>
  </router-link>
</template>

<script setup lang="ts">

defineProps({
  route: { type: String, required: true },
  label: { type: String, required: true },
  image: { type: String, required: true },
});

</script>
