<template>
  <div class="pb-8">
    <div
      :class="[
        'w-56 h-64 rounded-xl justify-between flex flex-col px-5 py-6 ',
        {
          'text-white bg-planetOfTheApes': color === 'red',
          'text-planetOfTheApes bg-speedOfLight': color === 'gray',
        },
      ]"
    >
      <div class="flex items-end">
        <img
          :src="image"
          alt="image"
        >
      </div>
      <div class="flex flex-col justify-start flex-auto pt-4">
        <div class="font-serif font-bold text-lg">
          {{ title }}
        </div>
        <div class="font-source text-sm">
          {{ body }}
        </div>
      </div>
      <div class="flex justify-start">
        <MainButton
          v-if="color === 'red'"
          :label="label"
          bg-color="outline"
          text-color="white"
          class="py-1 w-2/3"
        />

        <MainButton
          v-if="color === 'gray'"
          :label="label"
          bg-color="outline"
          text-color="red"
          class="py-1 w-2/3"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

defineProps({
  image: { type: String, default: "" },
  color: { type: String, default: "gray" },
  title: { type: String, default: "" },
  body: { type: String, default: "" },
  label: { type: String, default: "" },
});

</script>
