<template>
  <div v-if="route">
    <router-link :to="{ name: routeName }">
      <div class="flex items-center">
        <div class="text-planetOfTheApes">
          {{ text }}
        </div>
        <img
          :src="image"
          class="ml-2 h-3 w-3"
        >
      </div>
    </router-link>
  </div>

  <div v-else>
    <a
      data-cy="social-links"
      :href="url"
      target="_blank"
    >
      <img
        :src="image"
        class="h-5 w-5"
      >
    </a>
  </div>
</template>

<script setup lang="ts">

defineProps({
  route: Boolean,
  routeName: { type: String, default: "" },
  text: { type: String, default: "" },
  url: { type: String, default: "" },
  image: { type: String, default: "" },
});

</script>
