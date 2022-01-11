<template>
  <SignBaseModal
    no-close
    :is-open="routeData.route == 'add.lot.confirmation'"
    @close="$emit('close')"
  >
    <div
      data-cy="add-lot-submitted-modal"
      class="max-h-screen rounded max-w-sm w-96 px-16 flex flex-col items-center justify-center bg-planetOfTheApes"
    >
      <img
        class="w-14 h-14 mt-28 mb-5"
        src="../../../../assets/gavel_white.svg"
        alt="gavel"
      >
      <div
        class="text-white px-5 font-serif font-bold text-3xl text-center pb-5"
      >
        Your bottles are listed!
      </div>
      <div
        class="font-source text-sm text-center text-white pb-12 px-2"
      >
        You’ll be notified when you receive any bids on your listing.
      </div>
      <MainButton
        class="w-full mb-36"
        data-cy="bottles-listed"
        label="back to profile"
        bg-color="outline"
        text-color="white"
        @click="backToProfile"
      />
    </div>
  </SignBaseModal>
</template>

<script setup lang="ts">

import type { PropType } from "vue";
import router from "../../../../router";
import type { RouteData } from "../../../base/ProfileModalManager.vue";

defineProps({ routeData: { type: Object as PropType<RouteData>, required: true } });

defineEmits(["close", "continue", "goBack"]);

function backToProfile() {
  void router.push({ name: "profile" })
}
</script>
