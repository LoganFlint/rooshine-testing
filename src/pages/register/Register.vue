<template>
  <div class="w-full flex flex-col items-center">
    <div class="my-10 mx-28 flex flex-col item">
      <div class="flex">
        <div class="pr-5 font-serif pb-4 text-4xl font-bold">
          Register
        </div>
        <div
          class="max-w-sm pr-5 font-source text-lg leading-6"
        >
          Join other whisky enthusiasts in the largest online sprit auction on block chain.
        </div>
      </div>
      <div class="mt-5 border rounded border-unicornSilver">
        <RegisterTabs
          class="pr-24 pl-24"
          :steps="steps"
          :current-index="currentIndex"
        />

        <div class="mx-auto flex flex-col items-center">
          <router-view @continue="continueToNextStep" />
        </div>
      </div>
    </div>
  </div>

  <Modal
    :is-open="emailExistsModal"
    blur
    @close="returnToMarketing"
  >
    <div class="bg-white p-8 px-24 items-center justify-center">
      <div class="text-lg m-auto mb-6">
        That email already exists!
      </div>

      <MainButton
        color="red"
        label="Go back to Rooshine"
        class="m-auto"
        @click="returnToMarketing"
      />
    </div>
  </Modal>
</template>

<script setup lang="ts">

import axios from "axios";
import router from "../../router"
import { onBeforeRouteUpdate } from "vue-router"
import { useStore } from "../../store";
import RegisterTabs from "./RegisterTabs.vue"

const store = useStore();

let currentIndex = ref(0);

let emailExistsModal = ref(false);

/** update currentIndex on forward/back navigation */
onBeforeRouteUpdate(to => {
  if (to.name && currentIndex.value !== routes.indexOf(to.name.toString())) currentIndex.value = routes.indexOf(to.name.toString());
});

/** correct currentIndex from a reload */
onMounted(async () => {
  await goToCorrectStep();
});

const steps = ["account details", "verify identity", "address details", "billing information", "finalize registration"];

const routes = ["register.account", "register.identity", "register.address", "register.billing", "register.finalize"];

async function continueToNextStep(): Promise<void> {
  await router.push({ name: routes[++currentIndex.value] });
}

async function returnToMarketing(): Promise<void> {
  emailExistsModal.value = false;
  await logoutAndReroute("marketing");
}

async function goToCorrectStep(): Promise<void> {
  let onboardingStep = "";

  try {
    onboardingStep = (await store.getCurrentUser()).onboardingStep ?? "";
  } catch (error) {
    console.warn(error);
  }

  switch (onboardingStep) {
    case "verifyIdentity":
      onboardingStep = "identity";
      break;
    case "shippingAddress":
      onboardingStep = "address";
      break;
    case "billing":
      onboardingStep = "billing";
      break;
    case "activationPayment":
      onboardingStep = "billing";
      break;
    case "createWallet":
      onboardingStep = "finalize";
      break;
    default:
      onboardingStep = "account"
  }

  currentIndex.value = routes.indexOf(`register.${onboardingStep}`);
  await router.push({ name: routes[currentIndex.value] });
}

async function logoutAndReroute(routeName: string): Promise<void> {
  await store.logout();
  await router.push({ name: routeName });
}

axios.interceptors.response.use(
  response => {
    return Promise.resolve(response);
  },
  // eslint-disable-next-line promise/prefer-await-to-callbacks
  async (error) => {
    const { status } = error.response;
    if (status === 401) {
      console.warn("Registration incomplete, returning to sign in.");
      await logoutAndReroute("signin");
    }
    if (status === 404) {
      console.warn("Not found, returning home.");
      await logoutAndReroute("marketing");
    }
    if (status === 409) {
      console.warn("Email already exists.");
      if(currentIndex.value !== 1) emailExistsModal.value = true;
    }
    return Promise.reject(error);
  }
);

</script>
