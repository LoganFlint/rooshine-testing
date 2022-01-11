<template>
  <div>
    <SignBaseModal
      no-close
      :is-open="isOpen"
      @close="closeModal"
    >
      <div class="pt-8 flex flex-col items-center pb-5">
        <div class="font serif font-bold text-2xl px-16 pb-4 text-center">
          Remove Payment Method
        </div>
        <div class="w-72 text-center pb-8">
          Are you sure you want to remove the American Express card ending in
          2215 from your wallet? This cannot be undone.
        </div>
        <div class="w-full px-5">
          <MainButton
            label="remove from wallet"
            text-color="white"
            bg-color="red"
            class="w-full"
          />
          <MainButton
            class="w-full"
            label="remove"
            text-color="red"
            bg-color="white"
          />
        </div>
      </div>
    </SignBaseModal>
  </div>
</template>

<script setup lang="ts">

defineProps({ isOpen: Boolean });
const emit = defineEmits(["close"]);

function closeModal(): void {
  emit("close");
}

</script>
