<template>
  <div class="flex flex-col items-center">
    <div class="font-serif font-bold text-xl">
      You need to verify your identity to finish your registration!
    </div>
    <div class="p-8 pt-10">
      Please prepare your documents &#8211; we can accept the following:
      <li class="mt-4">
        Driver license
      </li>
      <li>
        State-issued ID
      </li>
      <li>
        Passport
      </li>
    </div>
    <MainButton
      :disabled="verified"
      :label="identityVerifyButtonLabel"
      class="w-48 mt-6"
      @click="verifyIdentity"
    />
  </div>
</template>

<script setup lang="ts">

import { verifyDocument } from "../../../api/modules/stripe";

defineProps({
    modelValue: { type: Boolean, default: false }
});

const emit = defineEmits(["update:modelValue", "identifyVerified"]);

const verified = ref(false);

const identityVerifyButtonLabel = computed(() => {
    if(!verified.value) return "I'm ready!"
    return "Identify verified!"
});

async function verifyIdentity(): Promise<void> {   
    verified.value = (await verifyDocument());
    emit("update:modelValue", verified.value);
}
</script>