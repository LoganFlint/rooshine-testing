<template>
  <Modal
    :is-open="true"
    @close="closeModal"
  >
    <div v-if="currentStep === 'startBid'">
      <StartBid
        :lot-number="state.lotNumber"
        :bottle-count="state.bottleCount"
        :time-remaining="state.timeRemaining"
        :current-bid="state.totalBid"
        @continue="nextStep"
        @close="closeModal"
      />
    </div>
    <div v-if="currentStep === 'bottles'">
      <SelectBottles
        :lot-number="state.lotNumber"
        :bottles="state.lot?.bottles as BottleData[] ?? []"
        :bottle-count="state.bottleCount"
        @selected-bottles="handleSelectedBottles"
        @continue="nextStep"
        @previous="prevStep"
        @close="closeModal"
      />
    </div>
    <div v-if="currentStep === 'placeBids'">
      <PlaceBids
        v-model="state.totalBid"
        :lot-number="state.lotNumber"
        :bottles="state.bottles"
        @continue="nextStep"
        @previous="prevStep"
        @update:model-value="updateTotalBid"
      />
    </div>
    <div v-if="currentStep === 'confirmBids'">
      <ConfirmBids
        :lot-number="state.lotNumber"
        :bottle-count="state.bottleCount"
        :bid-total="state.totalBid"
        :time-remaining="state.timeRemaining"
        @continue="nextStep"
      />
    </div>
    <div v-if="currentStep === 'bidConfirmation'">
      <BidConfirmation @close="closeModal" />
    </div>
  </Modal>
</template>

<script setup lang="ts">

import type { PropType } from "vue";
import { useStore } from "../../../store";
import type { Lot } from "../../../api/lot";
import type { Bottle } from "../../../api/barrel"

export interface BottleData extends Bottle {
  /** indicates if the bottle is selected to be purchased */
  selected: boolean
}

const props = defineProps({
  lotNumberStr: { type: String, default: "" },
  lot: { type: Object as PropType<Lot | null>, default: null },
});

const emit = defineEmits(["close"]);

const store = useStore();

const state = reactive({
  step: 0,
  lot: {} as null | Lot,
  bottleCount: 0,
  lotNumber: Number(props.lotNumberStr),
  open: true,
  timeRemaining: "",
  bottles: [] as BottleData[],
  totalBid: 0
})

store.getLot(state.lotNumber)
  .then((lot) => {
    state.lot = lot;
    let count = 0;
    handleTime(state.lot?.endDate ?? new Date());
    Object.values(state.lot.bottles).forEach((bottle) => {
      if(!bottle.sold) count++;
    });
    state.bottleCount = count;
  })
  .catch(e => {
    throw e;
  });

const steps = ["startBid", "bottles", "placeBids", "confirmBids", "bidConfirmation"]

const currentStep = ref(steps[0])

function resetValues() {
  currentStep.value = steps[0]
}

function closeModal() {
  emit("close")
  resetValues()
}

function nextStep() {
  currentStep.value = steps[++state.step]
}

function prevStep() {
  currentStep.value = steps[--state.step]
}

function handleSelectedBottles(bottles: BottleData[]): void {
  state.bottles = bottles;
  let count = 0;
  for(const bottle of state.bottles) {
    if(bottle) count = count + 1;
  }
  state.bottleCount = count;
}

function handleTime(timestamp: string): void {
  const endTime = new Date(timestamp);
  const currentTime = new Date();

  //eslint-disable-next-line
  //@ts-ignore
  let timeRemaining = Math.abs(endTime - currentTime);

  setInterval(() => {
    state.timeRemaining = formatTime(timeRemaining);
    if(timeRemaining > 0) timeRemaining = timeRemaining - 1000;
  }, 1000);
}

function formatTime(timeRemaining: number): string {
  const seconds = Math.floor(timeRemaining/(1000));
  const minutes = Math.floor(timeRemaining/(1000 * 60));
  const hours = Math.floor(timeRemaining/(1000 * 60 * 60));

  return `${hours > 10 ? hours : `0${hours}`}:${minutes > 10 ? minutes : `0${minutes}`}:${seconds > 10 ? seconds : `0${seconds}`}`
}

function updateTotalBid(newTotal: number, bottleCount: number): void {
  state.totalBid = newTotal;
  state.bottleCount = bottleCount;
}

</script>
