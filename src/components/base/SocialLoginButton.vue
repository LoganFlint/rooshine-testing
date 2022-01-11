<template>
  <button
    :class="[
      'text-lead font-source font-semibold text-sm flex justify-center items-center',
      'bg-white border border-unicornSilver rounded-lg',
      ' py-2 px-2',
    ]"
  >
    <img
      v-if="google"
      src="../../assets/google.svg"
    >
    <div class="ml-2">
      {{ label }}
    </div>
  </button>
</template>

<script setup lang="ts">

defineProps({
  label: { type: String, required: true },
  facebook: Boolean,
  google: Boolean,
  apple: Boolean,
});

</script>
