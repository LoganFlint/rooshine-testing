<template>
  <SignBaseModal
    no-close
    :is-open="routeData.route == 'add.payment.bank'"
    @close="$emit('close')"
  >
    <PaymentForm
      form="add bank"
      :bank-public-token="bankPublicToken"
      :bank-id="bankId"
    />
  </SignBaseModal>
</template>

<script setup lang="ts">

import type { PropType } from "vue";
import type { RouteData } from "../../../base/ProfileModalManager.vue";

defineProps({
  routeData: { type: Object as PropType<RouteData>, required: true },
  bankId: { type: String, default: null },
  bankPublicToken: { type: String, default: null }
});

defineEmits(["close"]);

</script>
