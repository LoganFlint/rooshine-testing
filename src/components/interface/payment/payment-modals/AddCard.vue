<template>
  <SignBaseModal
    no-close
    :is-open="routeData.route == 'add.payment.card'"
    @close="$emit('close')"
  >
    <PaymentForm />
  </SignBaseModal>
</template>

<script setup lang="ts">

import type { PropType } from "vue";
import type { RouteData } from "../../../base/ProfileModalManager.vue";

defineProps({ routeData: { type: Object as PropType<RouteData>, required: true } });

defineEmits(["close"]);

</script>
