<template>
  <div class="w-full flex flex-col justify-center items-center">
    <div class="font-serif font-bold text-2xl pb-3 text-center pt-10">
      Let’s get you verified
    </div>
    <div
      class="font-source text-center pb-12"
    >
      We need a little information to confirm your identity.
    </div>
    <div class="bg-speedOfLight max-w-2xl h-[592px] w-full flex justify-center items-center">
      <VerifyIdentity
        v-model="state.identityVerified"
        @update:model-value="$emit('identityVerified')"
      />
    </div>
    <MainButton
      label="Continue"
      class="w-60 h-9 mt-8 mb-16"
      :disabled="!state.identityVerified"
      @click="submit"
    />
  </div>
</template>

<script setup lang="ts">

import router from "../../router";

const props = defineProps({
  identityVerified: { type: Boolean, default: false }
});

const emit = defineEmits(["continue", "identityVerified"]);

const state = reactive({
  identityVerified: props.identityVerified
});

async function submit(): Promise<void> {
  emit("continue");
  await router.push({ name: "register.address" });
}

</script>
