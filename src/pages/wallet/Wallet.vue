<template>
  <div>
    <router-view name="walletModal" />
    <WalletTutorial
      v-if="state.showTutorial"
      @close-tutorial="closeTutorial"
    />
    <div
      v-if="!state.showTutorial"
      class="px-14 pt-10 mb-5"
    >
      <div class="flex pb-4">
        <img
          class="w-14 h-14"
          src="../../assets/barrel.svg"
          alt="barrel"
        >
        <div class="pl-3.5 font-source flex flex-col">
          <div data-cy="wallet-balance" class="text-xs">
            BALANCE
          </div>
          <div class="text-4xl font-semibold">
            {{ state.balance?.toLocaleString(undefined, {
              maximumFractionDigits: 2,
            }) }}
            <span class="text-3xl font-normal">ISV</span>
          </div>
        </div>
      </div>
      <div class="flex">
        <Transactions class="mr-6" />
        <div>
          <WalletMyCollection class="mb-6" />
          <BuySellTokens />
        </div>
      </div>
      <UnlockWalletModal
        :is-open="state.showUnlockWalletModal"
        @unlock="unlockWallet"
      />
    </div>
  </div>
</template>

<script setup lang="ts">

import api from "../../api/api";
import router from "../../router";
import { useStore } from "../../store";

const store = useStore();

const props = defineProps({
  showTutorial: { type: String, default: "false" }
});

const state = reactive({
  balance: null as number | null,
  showTutorial: props.showTutorial === 'true',
  showUnlockWalletModal: false,
});

function closeTutorial(): void {
  state.showTutorial = false;
  state.showUnlockWalletModal = true;
}

onMounted(() => {
  store.getCurrentUser().then(user => {
    if (user.walletAddress === "") void router.push({ name: "user-wallet-setup" });
    if (!state.showTutorial) state.showUnlockWalletModal = true;
  }).catch((e: Error) => {
    console.warn(e);
    void router.push({ name: "signin" });
  });
});

async function unlockWallet(publicKey: string): Promise<void> {
  state.showUnlockWalletModal = false;
  state.balance = await api.queryBalance(publicKey);
}

</script>
