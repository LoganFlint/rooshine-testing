<template>
  <div class="w-96 rounded-t max-w-sm bg-white">
    <div class="relative z-0">
      <div
        class="flex font-source font-bold py-3 justify-center items-center border-b border-unicornSilver"
      >
        <div class="border-r border-unicornSilver pr-3">
          LOT
          <span>#{{ lotNumber }}</span>
        </div>
        <div class="pl-3">
          {{ Object.values(bottles).length }} Bottles
        </div>
      </div>

      <div class="flex items-center pl-5 pt-5 pb-5">
        <div
          class="bg-speedOfLight p-3 rounded-full"
          @click="$emit('previous')"
        >
          <img
            class="mr-auto"
            src="../../../assets/arrow_left.svg"
            alt="arrow left"
          >
        </div>
        <div class="font-serif font-bold text-2xl m-auto">
          Place Bids
        </div>
      </div>

      <div class="flex justify-center items-center px-6 pb-6 mb-5 border-b border-unicornSilver">
        <Checkbox
          v-model="state.distribute"
          class="font-source font-semibold text-sm mr-3.5"
          label="Distribute Bid Evenly"
        />
        <TextInput
          v-model="state.distributeAmount"
          place-bid
          class="w-40 h-8"
          placeholder="Amount"
          place-bid-string="Per Bottle"
          @input="distributeBids"
        />
      </div>
      <div class="overflow-y-scroll max-h-72">
        <div
          v-for="bottle, i in bottles"
          :key="i"
          class="pl-5 pr-5"
        >
          <div v-if="bottle">
            <div
              class="
              flex 
              justify-between 
              items-start"
            >
              <div
                class="
                flex 
                flex-col 
                items-center"
              >
                <img
                  src="../../../assets/bottle_full.svg"
                  alt="full bottle"
                >
                <div>{{ bottle.index + 1 }}</div>
              </div>
              <div
                class="
                flex 
                flex-col 
                pb-4 
                w-full 
                items-center"
              >
                <div class="flex">
                  <TextInput
                    v-model="state.bids[i]"
                    class="w-72 font-semibold"
                    red
                    placeholder="Amount"
                    place-bid
                    :error="noShow"
                    @input="formatValue($event, i)"
                  />

                  <div
                    class="
                      hover:cursor-pointer 
                      text-sm 
                      font-bold 
                      z-10 
                      -ml-24 
                      mt-3 
                      text-planetOfTheApes 
                      whitespace-nowrap"
                    @click="minimumBid(i)"
                  >
                    Minimum Bid
                  </div>
                </div>

                <div
                  class="w-full px-6 justify-right"
                  :class="[
                    ' flex justify-between font-source text-xs opacity-50 pt-2 ',
                    {
                      hidden: noShow === true,
                      block: noShow === false,
                    },
                  ]"
                >
                  <div>
                    Highest Bid: {{ bottle.highestBid.amount.toLocaleString() }}
                  </div>
                  <div class="text-right">
                    {{ bottle.highestBid.amount > 0 ? bottle.highestBid.userName : "Be the first bidder" }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="bg-gradient-to-t h-7 from-black opacity-20" />
      </div>
    </div>
    <div class="relative z-30">
      <div class="flex font-source font-bold text-sm py-3.5 justify-center">
        <div>Total Bid Amount:</div>
        <img
          class="ml-1 mr-1"
          src="../../../assets/barrel.svg"
          alt="needs barrel"
        >
        <div>
          {{
            state.bidTotal.toLocaleString(undefined, {
              maximumFractionDigits: 2,
            })
          }}
        </div>
      </div>
      <div class="px-5 pb-5">
        <MainButton
          class="w-full"
          label="continue"
          bg-color="red"
          text-color="white"
          :disabled="!readyToSubmitBids"
          @click="submitBids"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import type { PropType } from "vue";
import type { BottleData } from "./BidModal.vue";
import { submitBidOnBottle } from "../../../api/modules/lot";

const emit = defineEmits(["update:modelValue", "continue", "previous"]);

const props = defineProps({
  lotNumber: { type: Number, default: 0 },
  bottles: { type: Array as PropType<Array<BottleData>>, required: true },
  modelValue: { type: Number, default: 0 }
});

const state = reactive({
  bottles: props.bottles,
  bids: [] as Array<string | undefined>,
  bidTotal: 0,
  distribute: false,
  distributeAmount: undefined as string | undefined
});

const availableBottles = computed(() => {
  let bottles = 0;
  for(const bottle of state.bottles) {
    if(bottle) bottles = bottles + 1;
  }
  return bottles;
});

//There will be a bid for each bottle, even if it's 'invisible'
for(let i = 0; i < state.bottles.length; i++) {
  state.bids.push(undefined);
}

watch(() => state.distribute, () => {
  //Reset bids on toggle off
  if(!state.distribute) {
    state.distributeAmount = undefined;
    for(let i = 0; i < state.bids.length; i++) {
      if(state.bottles[i]) state.bids[i] = undefined;
    }
  }
});

const readyToSubmitBids = computed(() => { 
  let sum = 0;
  for(let i = 0; i < state.bids.length; i++) {
    if(!validBid(i)) {
      state.bidTotal = 0;
      return false;
    }
    if(state.bottles[i]) sum = sum + Number(state.bids[i]?.replaceAll(",", ""));
  }
  state.bidTotal = sum;
  return true;
});

let noShow = ref(false)

function minimumBid(index: number): void {
  state.bids[index] = (Number(state.bottles[index].highestBid.amount) + 1).toLocaleString();
}

function distributeBids(e: Event): void {

  const cumulativeBid = Number((e.target as HTMLInputElement).value.replaceAll(",", ""));

  if(!state.distribute || isNaN(cumulativeBid)) return;

  state.distributeAmount = cumulativeBid.toLocaleString();

  const bidPerBottle = Math.ceil(cumulativeBid / availableBottles.value);

  for(let i = 0; i < state.bids.length; i++) {
    if(state.bottles[i]) {
      state.bids[i] = bidPerBottle.toLocaleString();
    }
  }
}

async function submitBids(): Promise<void> {
  let count = 0;
  for(let i = 0; i < state.bottles.length; i++) {
    if(state.bottles[i]) {
      await handleBid(i);
      count++;
    }
  }
  emit("update:modelValue", state.bidTotal, count);
  emit("continue");
}

function validBid(index: number): boolean {
  const bid = Number(state.bids[index]?.replaceAll(",", ""));

  //Disregard check if bottle is 'invisible'
  if(!state.bottles[index]) return true;
  return !isNaN(bid) && (bid > state.bottles[index].highestBid.amount)
} 

async function handleBid(index: number): Promise<void> {
  let bid = Number(state.bids[index]?.replaceAll(",",""));
  if(isNaN(bid)) return;
  const highestBid = state.bottles[index].highestBid.amount;
  if(bid > highestBid) {
    await submitBidOnBottle(bid, props.lotNumber, index);
  }
}

function formatValue(e: Event, index: number): void {
  //If bid isNaN, don't change value
  const bid = !isNaN(Number(state.bids[index]?.replaceAll(",",""))) ? Number(state.bids[index]?.replaceAll(",","")).toLocaleString() : state.bids[index];
  state.bids[index] = bid;
}

</script>
