<template>
  <div class="relative overflow-hidden h-2 bg-grayOrange mr-2 rounded-lg">
    <div
      ref="bar"
      :style="progressPercent"
      class="bg-planetOfTheApes rounded-lg h-full"
    />
  </div>
</template>

<script lang="ts">
export default defineComponent({
	props: {
		progress: { type: Number, default: 0 },
	},
	setup(props) {
		const progressPercent = computed(() => `width: ${Math.round(props.progress*10000)/100}%`)
		const bar = ref<HTMLDivElement>()

		return { bar, progressPercent }
	},
})
</script>
