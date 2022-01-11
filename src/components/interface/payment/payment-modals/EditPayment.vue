<template>
  <SignBaseModal
    no-close
    blur
    :is-open="isOpen"
    @close="$emit('close')"
  >
    <PaymentForm
      :form="form"
      :card-id="paymentId"
    />
  </SignBaseModal>
</template>

<script setup lang="ts">

defineProps({
  paymentId: { type: String, default: null },
  isOpen: { type: Boolean, default: true },
  form: { type: String, default: "edit card" }
});

defineEmits(["close"]);

</script>
