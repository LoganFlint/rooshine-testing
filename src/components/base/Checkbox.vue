<template>
  <div class="flex items-center">
    <div class="h-8 max-h-40 flex items-center justify-center cursor-pointer rounded-lg transition-all duration-300 ease-in-out">
      <input
        :checked="modelValue"
        :disabled="disabled"
        type="checkbox"
        :class="[
          'w-4 h-4 rounded appearance-none border border-black text-planetOfTheApes bg-white focus:ring-0 focus:ring-offset-0',
          { 'border-2 border-planetOfTheApes': error },
        ]"
        @input="$emit('update:modelValue', !modelValue)"
      >
    </div>
    <label
      class="text-sm ml-2 cursor-pointer"
      @click="$emit('update:modelValue', !modelValue)"
    >{{ label }} </label>
  </div>
</template>

<script lang="ts">
export default defineComponent({
	props: {
		checked: Boolean,
		disabled: { type: Boolean, default: false },
		error: Boolean,
		label: { type: String, default: "" },
		modelValue: Boolean,
	},
	emits: ["update:checked", "update:modelValue"]
})
</script>
