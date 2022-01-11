<template>
  <SignBaseModal
    blur
    :is-open="isOpen"
    @close="closeModal"
  >
    <div class="flex flex-col justify-center px-20 py-20 items-center">
      <div class="font-serif font-bold text-5xl pb-4">
        Request Submitted!
      </div>
      <div class="font-source text-2xl pb-12 max-w-lg text-center">
        Give us 3-5 days to review your request. We’ll notify you through email once it’s approved and you will be able to list your product in
        auction.
      </div>
      <MainButton
        class="w-72"
        label="back to profile"
        text-color="white"
        bg-color="red"
        @click="openProfile"
      />
    </div>
  </SignBaseModal>
</template>

<script setup lang="ts">

import router from "../../../router"

defineProps({ isOpen: Boolean });

const emit = defineEmits(["close"]);

async function closeModal() {
  emit("close")
  await router.push({ name: "profile" })
}

async function openProfile() {
  await closeModal()
  await router.push({ name: "profile" })
}

</script>
