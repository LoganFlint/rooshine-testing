<template>
  <div class="flex items-center cursor-default">
    <span class="font-source text-sm">{{ label }}</span>
    <div
      class="bg-unicornSilver flex items-center h-5 p-1 cursor-pointer w-12 rounded-xl"
      @click="$emit('update:modelValue', !modelValue)"
    >
      <div
        class="w-3 h-3 duration-300 ease-in-out transform rounded-full shadow-md"
        :class="{
          'translate-x-7 bg-planetOfTheApes': modelValue,
          'bg-white': !modelValue,
        }"
      />
    </div>
  </div>
</template>

<script setup lang="ts">

defineProps({
  modelValue: { type: Boolean, required: true },
  label: { type: String, default: "" },
});

defineEmits(["update:modelValue"]);

</script>
