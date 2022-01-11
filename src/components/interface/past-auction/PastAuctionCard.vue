<template>
  <router-link
    :to="{ name: route }"
    class="relative py-6 mr-6"
  >
    <img
      class="object-cover w-72 h-96"
      :src="image"
      alt="drink"
    >
    <div class="h-32 w-full absolute bottom-5 bg-gradient-to-t from-transparent to-black-200">
      <div
        class="absolute bottom-16 left-1/4 text-white font-serif font-bold text-3xl"
      >
        {{ month }} {{ year }}
      </div>

      <div
        class="pl-8 absolute bottom-10 left-1/3 text-white font-serif font-bold text-xs"
      >
        {{ day }}
      </div>
    </div>
  </router-link>
</template>

<script setup lang="ts">

defineProps({
  route: { type: String, required: true },
  image: { type: String, default: "" },
  month: { type: String, default: "" },
  year: { type: String, default: null },
  day: { type: String, default: null },
});

</script>
