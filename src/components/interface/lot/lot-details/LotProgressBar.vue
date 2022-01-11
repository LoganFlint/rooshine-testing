<template>
  <div class="flex items-center">
    <ProgressBar
      class="w-80"
      :progress="progress"
    />
    <img
      class="font-semibold"
      src="../../../../assets/clock.svg"
      alt="clock"
    >
    <div class="font-source font-semibold text-xl pl-3">
      {{ state.timeRemaining }}
    </div>
  </div>
</template>

<script setup lang="ts">

const props = defineProps({
	startTime: { type: Number, default: 0 },
	currentTime: { type: Number, default: 0 },
	endTime: { type: Number, default: 0 },
	lotEnded: { type: Boolean, default: false },
});

const state = reactive<{ timeRemaining: string }>({
	timeRemaining: "Auction Ended",
})

onMounted(() => {
	updateTimeText()
})

/**
 * formats time remaining as string
 */
function updateTimeText() {
	const timeMs = Math.max(0, Math.round(props.endTime / 1000) * 1000 - Math.round(props.currentTime / 1000) * 1000)
	if (isNaN(timeMs) || timeMs == 0) {
		state.timeRemaining = "Auction Ended"
	} else {
		let seconds: string | number = timeMs / 1000
		let minutes: string | number = seconds / 60
		seconds = Math.floor(seconds) % 60
		let hours: string | number = minutes / 60
		minutes = Math.floor(minutes) % 60
		let days: string | number = hours / 24
		hours = Math.floor(hours) % 24
		days = Math.floor(days)
		seconds = seconds < 10 ? `0${seconds}` : `${seconds}`
		minutes = minutes < 10 ? `0${minutes}` : `${minutes}`
		hours = hours < 10 ? `0${hours}` : `${hours}`
		state.timeRemaining = `${days}:${hours}:${minutes}:${seconds}`
	}
}
/** gets a number indicating ratio done */
const progress = computed(() => {
	if (props.lotEnded) return 1
	if (props.currentTime < props.startTime)
		// lot hasn't started yet
		return 0
	const returnProgress = Math.min(1, (props.currentTime - props.startTime) / (props.endTime - props.startTime))
	if (isNaN(returnProgress)) return 0
	else return returnProgress
})

watchEffect(() => updateTimeText())

</script>
