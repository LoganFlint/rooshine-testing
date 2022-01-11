<template>
  <div class="pt-6 pb-24">
    <div class="px-14 text-planetOfTheApes flex items-center justify-between pb-6">
      <div class="flex items-center">
        <img
          class="w-2.5 h-3"
          src="../assets/link_arrow_left.svg"
          alt="arrow left"
        >
        <a
          class="font-semibold pl-1"
          href="#"
        >Previous Lot</a>
      </div>
      <div class="flex items-center">
        <a
          class="font-semibold pr-1"
          href="#"
        >Next Lot</a>
        <img
          class="w-2.5 h-3"
          src="../assets/link_arrow_right.svg"
          alt="arrow right"
        >
      </div>
    </div>
    <div class="pt-6 flex px-14">
      <div class="mr-28">
        <LiveAuctionCarousel :images="state.lot?.images" />
      </div>
      <LotDetailsCard
        :lot="state.lot"
        :minutes-since-highest-bid="labelSinceHighestBid"
        :start-time-ms="startTimeMs ?? 0"
        :end-time-ms="endTimeMs ?? 0"
        :current-time-ms="currentTimeMs"
        :lot-ended="lotEnded"
      />
    </div>

    <div class="bg-speedOfLight py-14 px-14 flex justify-between">
      <TokenAuthenticity />
      <BarrelDetails
        distillery="Ardbeg"
        location="Scotland"
        :size="70"
        type="Single Malt Whisky"
        :age="32"
        :strength="40"
        cask-type="Sherry Seasoned European Oak"
      />
      <ProductDescription
        class="flex-grow"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Ipsum dolor sit amet consectetur adipiscing elit ut aliquam purus. Id porta nibh venenatis cras sed felis. Enim sed faucibus turpis in eu mi. Leo in vitae turpis massa."
      />
    </div>
  </div>
  <div class="pb-10">
    <SuggestedAuctions :lot-ended="lotEnded" />
  </div>
</template>

<script setup lang="ts">

import type { Ref } from "vue";

import { useInterval, useTimeoutFn } from "@vueuse/core"
import type { Fn } from "@vueuse/core"
import { useStore } from "../store"
import type { Lot } from "../api/lot"

const props = defineProps({
	lotStr: {
		type: String,
		default: "",
	},
	lotNumberStr: {
		type: String,
		default: "",
	},
});

onBeforeUnmount(() => {
	stopTimer() // stop the timer if we leave the page, or component is removed
})

onMounted(() => {
	// updates the currentTimeMs
	if (state.lot !== null && !lotEnded.value) {
		startTimer()
	}
})

class BaseTimer {
	protected _stopFn: Fn | null
	isRunning: boolean

	constructor() {
		this._stopFn = null
		this.isRunning = false
	}

	stop() {
		if (this._stopFn !== null) {
			this._stopFn()
			this._stopFn = null
		}
		this.isRunning = false
	}
}

class SyncType extends BaseTimer {
	setRunning(fn: Fn) {
		this._stopFn = fn
		this.isRunning = true
	}
}

class TimerType extends BaseTimer {
	counter: Ref<number> | null

	constructor() {
		super()
		this.counter = ref(0)
	}

	setRunning(fn: Fn, counter: Ref<number>) {
		this._stopFn = fn
		this.isRunning = true
		this.counter = counter
	}
}

class TimerObject {
	minute: TimerType
	second: TimerType
	sync: SyncType
	offset: number
	targetDate: Date

	constructor() {
		this.minute = new TimerType()
		this.second = new TimerType()
		this.sync = new SyncType()
		this.offset = 0
		this.targetDate = new Date()
	}

	stopAll() {
		this.second.stop()
		this.minute.stop()
		this.sync.stop()
	}

	initialize(targetDate: Date) {
		this.targetDate = targetDate
		this.offset = new Date().getTime() - targetDate.getTime()
		this.second.isRunning = true
		this._syncTask(1000, () => {
			this.offset = new Date().getTime() - targetDate.getTime()
			const pausable = useInterval(1000, { controls: true, immediate: true })
			this.second.setRunning(pausable.pause, pausable.counter)
		})
	}

	/** fires the task off nearest the next second */
	private _syncTask(roundTIme: number, func: () => void) {
		const timeOffset = new Date().getTime() % roundTIme // get how far off we are from the nearest second
		const pausable = useTimeoutFn(() => {
			// synchronize it with the clock
			this.sync.stop()
			func()
		}, roundTIme - timeOffset)
		this.sync.setRunning(pausable.stop)
	}

	adjustToMinIfNeeded() {
		if (state.lot && !this.minute.isRunning) {
			// only do this once
			// find the delay that snaps you to the nearest minute from the highestBid time
			this.second.stop()
			const delay = (60 - (((((new Date().getTime() - this.targetDate.getTime()) / 1000) % 60) + 60) % 60)) * 1000
			const pausableSync = useTimeoutFn(() => {
				this.sync.stop()
				this.offset = new Date().getTime() - this.targetDate.getTime()
				this.second.counter = null
				const pausable = useInterval(60 * 1000, { controls: true, immediate: true }) // once a minute
				this.minute.setRunning(pausable.pause, pausable.counter)
			}, delay)
			this.sync.setRunning(pausableSync.stop)
		}
	}
} // end TimerObject class

const state = reactive({
	/** lot object */
	lot: null as null | Lot,
	startingTime: new Date().getTime(),
	lotTimer: new TimerObject(),
	bidTimer: new TimerObject(),
})

try {
	state.lot = JSON.parse(props.lotStr) as null | Lot
} catch (e) {
	state.lot = null // no lot loaded
}

if (state.lot === null && props.lotNumberStr) {
	// if we weren't given a lot, get one using the API
	const lotNumber = props.lotNumberStr === undefined || props.lotNumberStr === "" ? NaN : parseInt(props.lotNumberStr)
	const store = useStore()
	store
		.getLot(lotNumber)
		.then(newLot => {
			state.lot = newLot
			startTimer()
		})
		.catch(reason => {
			console.log("reason", reason)
		})
}

/** lot start time in milliseconds */
const startTimeMs = computed(() => (state.lot ? new Date(state.lot.startDate).getTime() : null))
/** lot end time in milliseconds */
const endTimeMs = computed(() => (state.lot ? new Date(state.lot.endDate).getTime() : null))

const lotEnded = computed(() => {
	// TODO enable this to make the lot never end
	// return false
	if (endTimeMs.value && state.lot) {
		return Math.round((endTimeMs.value - currentTimeMs.value) / 1000) <= 0
	} else {
		return true
	}
})

/** lot end time in milliseconds */
const currentTimeMs = computed(() => {
	if (state.startingTime !== null) {
		const time =
			state.startingTime +
			(state.lotTimer.second.counter === null ? 0 : state.lotTimer.second.counter * 1000) + // second portion
			(state.lotTimer.minute.counter === null ? 0 : state.lotTimer.minute.counter * 60 * 1000)
		if (state.lot && state.lot.endDate && time > new Date(state.lot.endDate).getTime()) state.lotTimer.stopAll()

		return time // minute portion)
	} else {
		return new Date().getTime()
	}
})

/** label showing minutes since highest bid was made (string) */
const labelSinceHighestBid = computed(() => {
	if (state.lot === null || state.bidTimer.minute.counter === null || (!state.bidTimer.second.isRunning && !state.bidTimer.minute.isRunning))
		return ""

	const timeDiff =
		state.bidTimer.offset +
		(state.bidTimer.second.counter === null ? 0 : state.bidTimer.second.counter * 1000) + // second portion
		(state.bidTimer.minute.counter === null ? 0 : state.bidTimer.minute.counter * 60 * 1000) // minute portion
	if (Math.floor(timeDiff / 1000) >= 60) {
		state.bidTimer.adjustToMinIfNeeded()

		const minAgo = Math.floor(timeDiff / 1000 / 60);

		return `${minAgo} ${minAgo == 1 ? "Minute Ago" : "Minutes Ago"}`;
	} else {
		const secAgo = Math.floor(timeDiff / 1000);

		return `${secAgo} ${secAgo == 1 ? "Second Ago" : "Seconds Ago"}`;
	}
})

/** fires off the timer to sync properly */
function startTimer() {
	if (state.lot) {
		state.lotTimer.initialize(new Date(state.lot.endDate))
		state.bidTimer.initialize(new Date(state.lot.highestBid.date))
	}
}

/** make sure all timers are stopped */
function stopTimer() {
	state.lotTimer.stopAll()
	state.bidTimer.stopAll()
}

</script>
