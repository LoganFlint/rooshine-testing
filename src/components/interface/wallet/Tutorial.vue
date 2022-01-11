<template>
  <div
    :class="[
      'border-white pr-40 max-w-xl cursor-pointer',
      {
        'h-48 border-l-4 border-b pt-2': !stepThree,
        'h-88 border-b-4 border-l pt-32 border-white': stepThree,
      },
    ]"
    @click="close(), nextStep()"
    @click.stop
  >
    <div class="pb-9 pl-9 max-w-md">
      <img
        class="cursor-pointer pb-3.5"
        src="../../../assets/info.svg"
        alt="info"
      >
      <div class="text-white font-source font-semibold text-2xl">
        {{ description }}
      </div>
      <slot class="absolute" />
    </div>
  </div>
</template>

<script setup lang="ts">

defineProps({
  isOpen: { type: Boolean, default: false },
  description: { type: String, default: "" },
  stepThree: Boolean,
});

const emit = defineEmits(["close", "nextStep"]);

function close() {
  emit("close")
}
function nextStep() {
  emit("nextStep")
}

</script>
