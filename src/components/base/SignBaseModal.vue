<template>
  <Modal
    :is-open="isOpen"
    :blur="blur"
    @close="$emit('close')"
  >
    <div
      class="backdrop-blur-none max-h-screen"
      :class="[
        'flex bg-white',
        {
          ' flex-row-reverse ': !imageRight,
        },
      ]"
    >
      <slot />

      <div>
        <img
          :class="[
            ' w-7 absolute top-5 cursor-pointer text-xl font-source rounded-full p-1.5',
            {
              'bg-black right-5': imageRight,
              'bg-lunarRock right-10': !imageRight,
              hidden: noClose,
            },
          ]"
          src="../../assets/close.svg"
          alt="close"
          @click="$emit('close')"
        >
        <img
          v-if="right"
          class="hidden lg:block w-80 h-full"
          src="../../assets/signin_modal.png"
          alt="barrels"
        >
        <img
          v-if="left"
          class="hidden lg:block w-80 h-full"
          src="../../assets/sign_up_modal.png"
          alt="barrels"
        >
      </div>
    </div>
  </Modal>
</template>

<script setup lang="ts">

import type { PropType } from "vue";
import type { RouteData } from "../base/ProfileModalManager.vue";

defineProps({
  isOpen: { type: Boolean, default: false },
  imageRight: Boolean,
  noClose: Boolean,
  left: Boolean,
  right: Boolean,
  blur: Boolean,
  routeData: { type: Object as PropType<RouteData>, default: null }
});

defineEmits(["close", "continue", "goBack"]);

</script>
