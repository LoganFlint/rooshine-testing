<template>
  <div
    :class="[
      'py-4 w-20 rounded-md',
      {
        'bg-speedOfLight': live,
        'bg-white': !live,
      },
    ]"
  >
    <div class="font-serif font-bold text-4xl text-center text-planetOfTheApes">
      {{ padFront(qty) }}
    </div>
    <div class="text-center">
      {{ label }}
    </div>
    <slot />
  </div>
</template>

<script lang="ts">
export default defineComponent({
  props: {
    qty: { type: Number, default: 0, required: true },
    label: { type: String, default: "", required: true },
    live: Boolean,
  },
  setup() {
    function padFront(value: number) {
      if (value < 10) {
        return value.toString().padStart(2, "0");
      } else {
        return value;
      }
    }
    return {
      padFront,
    };
  },
});
</script>
