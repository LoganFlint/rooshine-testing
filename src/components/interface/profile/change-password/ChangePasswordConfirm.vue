<template>
  <SignBaseModal
    no-close
    blur
    :is-open="routeData.route == 'profile.change.password.confirm'"
    @close="closeModal"
  >
    <div
      data-cy="change-password-confirm-modal"
      class="w-96 h-96 bg-planetOfTheApes py-28 px-36 cursor-pointer"
      @click="closeModal"
    >
      <img
        src="../../../../assets/lock.svg"
        alt="lock"
        class="mx-auto"
      >
      <div class="pt-8 text-white text-center">
        Password Updated
      </div>
    </div>
  </SignBaseModal>
</template>

<script setup lang="ts">

import type { PropType } from "vue"
import type { RouteData } from "../../../base/ProfileModalManager.vue"

defineProps({ routeData: { type: Object as PropType<RouteData>, required: true } });
const emit = defineEmits(["close", "continue", "goBack"]);

function closeModal() {
  emit("close")
}

</script>
