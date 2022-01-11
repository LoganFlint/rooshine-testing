<template>
  <Modal
    :is-open="true"
    @close="$emit('close')"
  >
    <div
      data-cy="start-bid-modal"
      class="flex flex-col"
    >
      <div class="w-96 rounded-t max-w-sm items-center bg-white">
        <div
          class="flex font-source font-bold py-3 justify-center items-center border-b border-unicornSilver 6"
        >
          <div class="border-r border-unicornSilver pr-3">
            LOT
            <span>#{{ lotNumber }}</span>
          </div>
          <div>
            {{ `${bottleCount } Bottle${bottleCount == 1 ? "" : "s"}` }}
          </div>
        </div>

        <div class="flex w-full justify-between items-center pt-5 px-6 pb-5">
          <div class="font-serif font-bold text-3xl">
            Place Bid
          </div>
          <div class="flex items-center">
            <img
              class="w-4 h-5 mr-1.5"
              src="../../../assets/red_clock.svg"
              alt="clock"
            >
            <div class="font-source font-semibold text-planetOfTheApes">
              {{ timeRemaining }}
            </div>
          </div>
        </div>

        <div
          class="flex items-center px-6 p-3 mx-6 mb-4 rounded border border-unicornSilver hover:cursor-pointer"
          @click="$emit('continue')"
        >
          <div class="text-americanSilver whitespace-nowrap">
            Select your bottles
          </div>
          <img
            src="../../../assets/bid_arrow_right.svg"
            class="h-4 w-4 text-right ml-40"
            alt="Right Bid Arrow"
          >
        </div>

        <div class="flex m-auto font-bold items-center text-center m-2">
          <div class="ml-auto">
            Total Bid Amount:
          </div>
          <img
            src="../../../assets/barrel.svg"
            class="h-4 w-4 m-1.5 "
            alt="tokens"
          >
          <div class="mr-auto">
            {{ currentBid }}
          </div>
        </div>

        <div class="px-6 pb-6">
          <MainButton
            class="text-white opacity-60 w-full"
            label="place bid"
            bg-color="red"
            @click="$emit('continue')"
          />
        </div>
      </div>
      <BidTimeline />
    </div>
  </Modal>
</template>

<script setup lang="ts">

defineProps({
  lotNumber: { type: Number, default: 0 },
  bottleCount: { type: Number, default: 0 },
  currentBid: { type: Number, default: 0 },
  timeRemaining: { type: String, default: "00:00:00" }
});

defineEmits(["continue", "close"]);

</script>
