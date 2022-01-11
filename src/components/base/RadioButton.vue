<template>
  <label
    class="flex items-center my-0.5 cursor-pointer"
    :class="{
      'opacity-50 cursor-not-allowed': disabled,
    }"
  >
    <div
      class="p-3 w-6 h-6 mr-0.5 shadow flex items-center justify-center rounded-full transition-all duration-300 ease-in-out focus:outline-none outline-none"
      :class="{
        'opacity-90 cursor-not-allowed': disabled,
      }"
    >
      <input
        :checked="checked"
        :disabled="disabled"
        :name="name"
        type="radio"
        :class="[
          'w-3 h-3 ring-1 ring-black cursor-pointer',
          'outline-none border-transparent',
          'focus:shadow-none focus:ring-black',
          'bg-white ring-offset-white ring-offset-2',
          'checked:text-black checked:bg-none checked:ring-black checked:ring-offset-white checked:ring-offset-2',
        ]"
        @click="handleToggle"
      >
    </div>
    <slot />
  </label>
</template>

<script setup lang="ts">

const props = defineProps({
  checked: Boolean,
  disabled: Boolean,
  label: { type: String, default: "" },
  name: { type: String, default: "" },
});

const emit = defineEmits(["update:checked"]);

function handleToggle(): void {
  emit("update:checked", !props.checked);
}

</script>
