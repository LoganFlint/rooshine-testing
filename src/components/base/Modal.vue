<template>
  <teleport
    to="#modal"
    class="modal"
  >
    <div
      :class="[
        'fixed z-30 inset-0 transform transition-all duration-300 ease-in-out',
        {
          'opacity-100 filter': isOpen,
        },
        { 'opacity-0 invisible filter none': !isOpen },
        { 'backdrop-filter backdrop-blur-[5px]': blur },
      ]"
    >
      <div
        class="flex flex-col min-h-screen items-center justify-center bg-black bg-opacity-30"
        @mousedown.stop="handleEdgeMousedown"
      >
        <div
          :class="['transition-all duration-300 transform z-40']"
          @mousedown.stop
        >
          <slot />
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts">

defineProps({
  isOpen: { type: Boolean, default: false },
  blur: Boolean,
});

const emit = defineEmits(["close"]);

function handleEdgeMousedown(event: MouseEvent) {
  if (event.button == 0) {
    emit("close")
  }
}

</script>
