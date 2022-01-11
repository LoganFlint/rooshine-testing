<template>
  <div class="flex flex-col">
    <div
      v-for="(step, index) in steps"
      :key="step"
    >
      <div>
        <div
          :class="[
            'h-12 p-3 flex',
            { 'bg-speedOfLight': index == currentIndex },
          ]"
        >
          <div
            :class="[
              'rounded-full h-6 w-6 p-3 flex items-center justify-center',
              'text-xs font-bold font-source',
              { 'bg-sepiaRose text-planetOfTheApes': index != currentIndex },
              { 'bg-white text-planetOfTheApes': index == currentIndex },
            ]"
          >
            {{ index + 1 }}
          </div>
          <div class="font-source text-lg ml-3">
            {{ step }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import type { PropType } from "vue";

defineProps({
  steps: { type: Array as PropType<string[]>, required: true },
  currentIndex: { type: Number, default: 0 },
});

</script>
