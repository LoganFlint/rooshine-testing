<template>
  <div class="flex">
    <div class="pr-16 pb-12 flex flex-col">
      <div class="font-serif font-bold text-5xl pb-6">
        Back up
        <br>your wallet
      </div>
      <div
        class="max-w-xs font-source text-2xl"
      >
        We’re going to show a secret recover phrase. Write it down and store it in a safe place incase you ever need to recover your wallet.
      </div>
    </div>
    <MnemonicInput
      v-model="state.words"
      :read-only="readOnly"
      :border="step == 'verify'"
      :error="error"
      bold-font
      @update:model-value="$emit('update:modelValue', state.words)"
    />
  </div>
</template>

<script setup lang="ts">

import type { PropType } from "vue";

const props = defineProps({
    step: { type: String, default: "create" },
    modelValue: { type: Array as PropType<string[]>, default: [] as Array<string> },
    readOnly: { type: Boolean, default: true },
    error: { type: Boolean, default: false }
});

defineEmits(["update:modelValue"]);

const state = reactive({
    words: props.modelValue
});

watch(() => props.step, () => {
    console.log("Current step: ", props.step);
});

</script>