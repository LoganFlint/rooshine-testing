<template>
  <div class="flex">
    <!-- TODO TODO if qty==00 either show “00” or hide the tile (ask designer for preference) -->
    <CounterTile
      :qty="days"
      label="DAYS"
      class="mr-2"
    />
    <CounterTile
      :qty="hours"
      label="HOURS"
      class="mr-2"
    />
    <CounterTile
      :qty="minutes"
      label="MINUTES"
      class="mr-2"
    />
    <CounterTile
      :qty="seconds"
      label="SECONDS"
      class="mr-2"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue"
export default defineComponent({
	props: {
		nextLotDate: { type: Date, default: Date },
	},
	//TODO function to break down the Date into its components
	setup() {
		//for display purpose
		const days = ref(5)
		const hours = ref(12)
		const minutes = ref(43)
		const seconds = ref(52)

		return { days, hours, minutes, seconds }
	},
})
</script>
