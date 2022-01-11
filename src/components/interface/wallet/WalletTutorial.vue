<template>
  <div
    class="fixed top-0 bg-black opacity-80 h-screen w-screen z-20"
    @click="nextStep()"
    @click.stop
  />
  <div
    data-cy="blank-wallet"
    class="top-20 px-14 pt-10 mb-5"
  >
    <div class="flex">
      <img
        class="w-14 h-14"
        src="../../../assets/barrel.svg"
        alt="barrel"
      >
      <div class="pl-3.5 font-source flex flex-col">
        <div class="text-xs">
          balance
        </div>
        <div class="text-4xl font-semibold">
          {{ balance }}
          <span class="text-3xl font-normal">ISV</span>
        </div>
      </div>
    </div>
    <div class="flex">
      <div
        :class="[
          'flex flex-col mr-6 h-[365px]',
          {
            'z-50 opacity-100 relative bg-white': state.currentStep == 'transactions',
          },
        ]"
      >
        <Transactions class="w-full" />
        <TransactionList
          class="w-full"
          new-user
        />
      </div>

      <div>
        <Tutorial
          v-if="state.currentStep === 'tokens'"
          class="absolute left-64 ml-8 bottom-20 opacity-80 z-20"
          description="To participate in our auctions, you’ll need to make bids using our ISV Tokens. You can purchase them here."
          @nextStep="goToCollections"
        />

        <Tutorial
          v-if="state.currentStep === 'collections'"
          description="All our auctions come with a unique NFT showing proof of your bottle purchases. You’ll find those here."
          class="absolute left-64 ml-8 top-20 opacity-80 z-20"
          @nextStep="goToTransactions"
        />
        <Tutorial
          v-if="state.currentStep === 'transactions'"
          description="Find a history of all the transactions that you have sent or received here."
          class="absolute left-14 -bottom-2 opacity-80 z-20"
          step-three
          @close="closeModal"
        />
        <WalletMyCollection
          :class="[
            'mb-6',
            {
              'z-50 opacity-100 relative bg-white': state.currentStep === 'collections',
            },
          ]"
          new-user
        />
        <BuySellTokens
          :class="[
            'flex flex-col mr-6',
            {
              'z-50 opacity-100 relative bg-white': state.currentStep === 'tokens',
            },
          ]"
          new-user
          total="0"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

defineProps({
  balance: { type: Number, default: 0 }
});

const emit = defineEmits(["closeTutorial"]);

let showTooltip = ref(true)

const state = reactive({
  steps: ["tokens", "collections", "transactions", "completed"],
  currentStep: "tokens",
  currentIndex: 0
});

function resetValues() {
  state.currentStep = state.steps[3]
}
function closeModal() {
  showTooltip.value = false;
  resetValues();
  emit("closeTutorial");
}

function nextStep() {
  state.currentStep = state.steps[++state.currentIndex];
  if(state.currentStep == "completed") closeModal();
}

function goToCollections() {
  state.currentStep = state.steps[1]
}
function goToTransactions() {
  state.currentStep = state.steps[2]
}

</script>
