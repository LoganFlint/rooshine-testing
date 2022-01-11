<template>
  <div
    v-if="!hidden"
    class="relative max-w-sm flex cursor-pointer"
  >
    <img
      :src="image"
      alt="product sold image"
    >
    <div
      class="bg-blackPanther font-source text-sm px-4 pt-4 pb-5"
      @click="hidden = true"
    >
      <div class="text-white">
        Someone from, {{ location }} placed a bid on
        <span class="text-pastelYellow">{{ item }}</span>
      </div>
      <div class="font-semibold text-white pt-3">
        {{ time }} MINUTES AGO
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue"
export default defineComponent({
	props: {
		image: { type: String, default: "" },
		location: { type: String, default: "" },
		item: { type: String, default: "" },
		time: { type: Number, default: 0 },
	},
	setup() {
		const hidden = ref(false)
		return { hidden }
	},
})
</script>
