<template>
  <div class="border-b border-unicornSilver flex items-center justify-center">
    <div
      v-for="(step, index) in steps"
      :key="step"
    >
      <div :class="[{ 'border-b-2 border-eyeOfNewt': index == currentIndex }]">
        <div
          :class="[
            'border-b-2 border-transparent m-auto h-16 p-4 flex items-center',
            'text-unicornSilver tracking-wider font-semibold',
            { 'border-b-4 border-planetOfTheApes': index == currentIndex },
          ]"
        >
          <div
            :class="[
              'rounded-full h-3.5 w-3.5 py-2 px-2 flex items-center justify-center',
              'text-tiny font-serif text-white',
              { 'bg-unicornSilver': index != currentIndex },
              { 'bg-planetOfTheApes': index == currentIndex },
            ]"
          >
            {{ index + 1 }}
          </div>
          <div
            class="text-xs uppercase ml-2 text-black opacity-50"
            :class="{ 'opacity-100': index == currentIndex }"
          >
            {{ step }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import type { PropType } from "vue"

defineProps({
  steps: { type: Array as PropType<string[]>, required: true },
  currentIndex: { type: Number, default: 0 },
});

</script>
