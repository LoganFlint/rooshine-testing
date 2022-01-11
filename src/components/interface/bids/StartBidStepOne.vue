<template>
  <div class="w-96 rounded-t max-w-sm bg-white">
    <div
      class="flex font-source font-bold py-3 justify-center items-center border-b border-unicornSilver 6"
    >
      <div class="border-r border-unicornSilver pr-3">
        LOT
        <span>#{{ lot }}</span>
      </div>
      <div class="pl-3">
        {{ bottles }} Bottles
      </div>
    </div>

    <div class="flex justify-between items-center pt-5 px-6 pb-5">
      <div class="font-serif font-bold text-3xl">
        Place Bid
      </div>
      <div class="flex items-center">
        <img
          class="w-4 h-5 mr-1.5"
          src="../../assets/red_clock.svg"
          alt="clock"
        >
        <div class="font-source font-semibold text-planetOfTheApes">
          05:12:43:52
        </div>
      </div>
    </div>

    <div class="flex px-6 pb-4">
      <TextInput
        class="w-full bg-white italic"
        placeholder="Select your bottles"
        bid-arrow-right
      />
    </div>

    <div class="flex font-source font-bold text-sm pb-4 justify-center">
      <div>Total Bid Amount:</div>
      <img
        class="ml-1 mr-1"
        src="../../assets/barrel.svg"
        alt="needs barrel"
      >
      <div>
        {{
          bidTotal.toLocaleString(undefined, {
            maximumFractionDigits: 2,
          })
        }}
      </div>
    </div>

    <div class="px-6 pb-6">
      <MainButton
        class="text-white opacity-60 w-full"
        label="place bid"
        bg-color="red"
        @click="nextStep"
      />
    </div>
    <BidTimeline />
  </div>
</template>

<script setup lang="ts">

defineProps({
  lot: { type: Number, default: 0 },
  bottles: { type: Number, default: 0 },
  bidTotal: { type: Number, default: 0 },
});

const emit = defineEmits(["stepTwo"]);

function nextStep() {
  emit("stepTwo");
}

</script>
