<template>
  <div class="flex bg-repeat bg-granite">
    <div
      v-if="state.currentStep === 'create'"
      class="max-w-4xl pt-20 px-20 flex flex-col bg-white shadow-md m-auto"
    >
      <WalletSetupInput :step="state.currentStep" />

      <MainButton
        data-cy="wallet-setup-reveal-phrase-button"
        class="mb-16"
        label="I UNDERSTAND, REVEAL MY PHRASE"
        @click="continueToNextStep"
      />
    </div>

    <div
      v-if="state.currentStep === 'show'"
      class="max-w-4xl pt-20 px-20 flex flex-col bg-white shadow-md m-auto"
    >
      <WalletSetupInput
        v-model="state.mnemonicPhrase"
        :step="state.currentStep"
      />
      <MainButton
        class="mb-16"
        label="I've written it down"
        @click="continueToNextStep"
      />
    </div>

    <div
      v-if="state.currentStep === 'verify'"
      class="max-w-4xl pt-20 px-20 flex flex-col bg-white shadow-md m-auto"
    >
      <WalletSetupInput
        v-model="state.userMnemonicPhrase"
        :step="state.currentStep"
        :error="state.error"
        :read-only="false"
      />

      <MainButton
        v-if="!state.readyToContinue"
        class="mb-4"
        label="verify my secret phrase"
        :loading="state.processing"
        :disabled="emptyInputs"
        @click="state.error = hasError()"
      />

      <MainButton
        v-if="state.readyToContinue"
        class="mb-4"
        label="CONTINUE"
        @click="handleSubmit"
      />

      <div class="pb-8 text-center text-planetOfTheApes text-xs font-semibold">
        <a
          class="cursor-pointer"
          @click="goBack"
        >SHOW ME MY PHRASE AGAIN</a>
      </div>
    </div>
  </div>

  <Modal
    blur
    :is-open="state.showUserHasWalletModal"
    @close="closeUserHasWalletModal"
  >
    <div class="bg-white p-8 justify-center">
      <div class="font-serif text-xl font-bold m-auto mb-4 text-center">
        Wallet Already Exists!
      </div>
      <div class="text-center">
        You already have a wallet!
      </div>
      <MainButton
        class="m-auto mt-6"
        label="GO TO MY WALLET"
        @click="closeUserHasWalletModal"
      />
    </div>
  </Modal>

  <Modal
    blur
    :is-open="state.registrationModal.show"
    @close="rerouteToRegistration"
  >
    <div class="bg-white p-8 justify-center">
      <div class="font-serif text-xl font-bold m-auto mb-4 text-center">
        Registration Incomplete!
      </div>
      <div class="text-center">
        You need to finish your registration before you can set up your wallet!
      </div>
      <MainButton
        class="m-auto mt-6"
        label="FINISH REGISTRATION"
        @click="rerouteToRegistration"
      />
    </div>
  </Modal>

  <Modal
    blur
    :is-open="state.showActivationPaymentModal"
    @close="rerouteTo('profile')"
  >
    <div class="bg-white p-8 m-auto">
      <div class="font-serif text-xl font-bold m-auto mb-4 text-center">
        Missing Account Activation Payment!
      </div>
      <div class="text-center">
        Your account activation payment is missing or still processing. <br> Some features, such as creating a wallet or barrel, are not available.
      </div>

      <div class="mt-4 text-center text-sm text-planetOfTheApes">
        <div class="font-serif font-bold mb-2">
          You are in the sandbox!
        </div>
        <div>
          Some features may not be available at this time!
        </div>
      </div>
      <MainButton
        class="m-auto w-32 mt-6"
        label="OKAY"
        @click="rerouteTo('profile')"
      />
    </div>
  </Modal>
</template>

<script setup lang="ts">

import { Mnemonic } from "@hashgraph/sdk";
import router from "../../../router";
import api from "../../../api/api";
import { useStore } from "../../../store";
import type { User } from "../../../api/user";

const store = useStore();

const state = reactive({
  mnemonicPhrase: [] as string[],
  publicKey: null as string | null,
  userMnemonicPhrase: [] as string[],
  error: false,
  readyToContinue: false,
  showUserHasWalletModal: false,
  showActivationPaymentModal: false,
  registrationModal: {
    show: false,
    onboardingStep: undefined as string | undefined
  },
  currentIndex: 0,
  userId: "",
  steps: ["create", "show", "verify", "created"],
  currentStep: "create",
  processing: false,
  walletAddress: "" as string | null 
});

const emptyInputs = computed(() => {
  for (let i = 0; i < state.userMnemonicPhrase.length; i++) {
    if (state.userMnemonicPhrase[i] == "") {
      state.readyToContinue = false;
      return true;
    }
  }
  return false;
});

onMounted(async () => {
  const user = await store.getCurrentUser().then((user: User) => {
    state.userId = user.userId;
    return user;
  }).catch(async (error) => {
    console.warn("User is not logged in.", error);
    await rerouteTo("signin");
    return undefined;
  });

  state.registrationModal.onboardingStep = user?.onboardingStep;
  console.log("Onboarding step: ", state.registrationModal.onboardingStep);
  state.walletAddress = user?.walletAddress ?? null;

  if(state.walletAddress || state.registrationModal.onboardingStep == "account") state.showUserHasWalletModal = true;
  if(state.registrationModal.onboardingStep == "activationPayment") state.showActivationPaymentModal = true;
  if(state.registrationModal.onboardingStep !== "" && state.registrationModal.onboardingStep !== "account" && state.registrationModal.onboardingStep !== "createWallet") state.registrationModal.show = true;
});

function hasError(): boolean {
  for (let i = 0; i < state.mnemonicPhrase.length; i++) {
    if (state.mnemonicPhrase[i] !== state.userMnemonicPhrase[i]) {
      state.readyToContinue = false;
      state.error = true;
      return true;
    }
  }
  state.readyToContinue = true;
  return false;
}

void (async function getMnemonicOnLoad(): Promise<void> {
  const mnemonic = await Mnemonic.generate12();
  state.mnemonicPhrase = mnemonic.words;
  const removeItems = getRandomInts(0, 11, 3); // we want to remove 3 words from 0 to 11
  const newUserMnemonicPhrase = state.mnemonicPhrase.slice();
  removeItems.forEach(num => (newUserMnemonicPhrase[num] = "")); // remove any that we were told to remove
  state.userMnemonicPhrase = newUserMnemonicPhrase;
})();

function getRandomInts(min: number, max: number, howMany: number): number[] {
  let keepGoing = true
  const randAr: Array<number> = []
  while (keepGoing) {
    const rand = Math.floor(Math.random() * (max - min + 1)) // generates a number from 0 to max (inclusive)
    // shift up every time we encounter a number that is already used that is lower than ours
    // note: we start with our random number without any shift
    const realRandNum = randAr.reduce((prevNum, currNum) => {
      return currNum <= prevNum ? prevNum + 1 : prevNum
    }, min + rand)
    randAr.push(realRandNum)
    randAr.sort((a, b) => a - b) // required for realRandNum calculation
    max-- // reduce it by one because we removed one and add it to our array
    // if we have enough random numbers ||OR|| we have ALL the numbers allowed
    if (randAr.length >= howMany || max - min < 0) {
      keepGoing = false
    }
  }
  return randAr
}

function continueToNextStep(): void {
  state.currentStep = state.steps[++state.currentIndex]
}

function goBack(): void {
  state.currentStep = state.steps[--state.currentIndex]
}

async function handleSubmit(): Promise<void> {
  if (hasError()) return;
  if (!state.processing) {
    const recoveredMnemonic = await Mnemonic.fromString(state.userMnemonicPhrase.toString());
    const privateKey = await recoveredMnemonic.toPrivateKey();
    const timestamp = new Date(new Date().getTime() - 10000).toISOString();
    const encoder = new TextEncoder();
    const messageBytes = encoder.encode(`${state.userId} ${timestamp}`);
    const signatureBytes = privateKey.sign(messageBytes);
    const signature = window.btoa(String.fromCharCode(...signatureBytes));

    try {
      state.processing = true;
      await api.wallet({
        timestamp: timestamp,
        signature: signature,
        address: privateKey.publicKey.toString(),
      });

      await goToWallet();
    } catch (e) {
      console.log("The api call failed.");
      console.warn(e);
      try{
        state.registrationModal.onboardingStep = (await store.getCurrentUser()).onboardingStep;
        state.registrationModal.show = true;
      } catch (e) {
        console.warn("User is not logged in.");
        await rerouteTo("signin");
      }
    } finally {
      state.processing = false;
    }
  }
}

async function goToWallet(): Promise<void> {
  await router.push({ name: "wallet", params: { showTutorial: "true" } });
}

async function closeUserHasWalletModal(): Promise<void> {
  state.showUserHasWalletModal = false;
  await rerouteTo("wallet");
}

async function rerouteToRegistration(): Promise<void> {
  switch(state.registrationModal.onboardingStep){
      case "createWallet":
      await rerouteTo("user-wallet-setup");
      break;
    case "verifyIdentity":
      await rerouteTo("register.identity");
      break;
    case "shippingAddress":
      await rerouteTo("register.address");
      break;
    case "billing":
      await rerouteTo("register.billing");
      break;
    case "activationPayment":
      await rerouteTo("register.billing");
      break;
    default:
      console.warn("Issue with onboarding step in registration: ", state.registrationModal.onboardingStep);
  }
}

async function rerouteTo(routerName: string): Promise<void> {
  await router.push({ name: routerName });
}

</script>
