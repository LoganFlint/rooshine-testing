<template>
  <div
    class="border-b border-unicornSilver mb-5 w-[256px] mr-2 hover:cursor-pointer"
    @click="$emit('toggle')"
  >
    <div class="flex items-center justify-between pb-4">
      <div class="font-serif font-bold">
        {{ title }}
      </div>
      <img
        class="cursor-pointer w-3 h-1.5 transition-all duration-300 ease-in-out"
        :class="{
          'rotate-0': open === false,
          '-rotate-180': open === true
        }"
        src="../../../../assets/arrow_down.svg"
        alt="down arrow"
      >
    </div>
    <div
      class="transition-all duration-300 overflow-auto ease-in-out hover:cursor-pointer"
      :class="{
        'opacity-0 invisible h-0': open === false,
        'opacity-100 max-h-56': open === true
      }"
      @click.stop
    >
      <div
        v-for="(filterItem, key) of filterItems"
        :key="key"
        class="pb-3"
      >
        <Checkbox
          v-model="filterItem.selected"
          :label="filterItem.name"
          @update:modelValue="$emit('updateFilters')"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import type { PropType } from "vue";
import type { FilterItem } from "./FilterSidebar.vue";

defineProps({
  title: { type: String, required: true },
  open: { type: Boolean, required: true },
  reset: { type: Boolean, default: false },
  filterItems: { type: Object as PropType<{ [key: string]: FilterItem }>, required: true }
});

defineEmits(["updateFilters", "toggle"]);

</script>