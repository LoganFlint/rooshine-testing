<template>
  <Modal
    :is-open="isOpen"
    @close="$emit('close')"
  >
    <div class="bg-white p-8 text-center">
      <div class="font-serif text-xl font-bold">
        You are in the sandbox!
      </div>

      <div class="m-auto my-8">
        Some features may not be fully functional at this time.
      </div>
      <MainButton
        label="OKAY"
        class="m-auto w-32 mt-8"
        @click="$emit('close')"
      />
    </div>
  </Modal>
</template>

<script setup lang="ts">
defineProps({
    isOpen: { type: Boolean, default: false }
});

defineEmits(["close"]);
</script>