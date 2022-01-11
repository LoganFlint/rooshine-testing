<template>
  <div class="flex flex-col items-center min-w-full">
    <div class="text-center pt-10">
      <div
        class="font-serif font-bold text-md pb-3"
      >
        Thanks{{ store.user.displayName ? ` ${store.user.displayName}, ` : "," }} here's a summary
      </div>
      <div class="font-source pb-10">
        If everything looks correct, complete your
        <br>registration and enjoy the auctions
      </div>
    </div>

    <div class="pb-11 flex justify-center w-full max-w-3xl">
      <FinalizeAddressCard
        v-model="store.user"
        class="w-1/2"
      />
      <div class="w-7" />
      <FinalizePaymentCard
        class="w-1/2"
        :fee="
          state.fee.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })
        "
        :card-number="state.cardNumber"
        :expiration="state.expirationDate"
        :address="state.address"
      />
    </div>

    <div class="text-xs text-center pb-5">
      By completing my registration I agree to the
      <a
        class="text-planetOfTheApes font-semibold"
        href="#"
      >Terms and Conditions</a>
    </div>
    <div class="flex justify-center">
      <MainButton
        label="COMPLETE REGISTRATION"
        class="w-60 h-9 mb-16"
        @click="activateUser"
      />
    </div>
    <ConfirmRegModal
      :is-open="state.showConfirmation"
      @close="state.showConfirmation = false"
    />
    <SandboxNotice
      :is-open="state.showSandboxNotice"
      @close="closeSandboxNotice"
    />
    <Modal
      :is-open="state.showErrorModal"
      @close="state.showErrorModal = false"
    >
      <div class="rounded bg-white p-8 text-center">
        <div class="font-serif font-bold text-3xl pb-4">
          There was a problem processing your payment!
        </div>Please review your payment details, or contact your institution.
        <br>
      </div>
    </Modal>
  </div>
</template>

<script setup lang="ts">

import { userIsBlank } from "../../api/modules/user"
import { useStore } from "../../store"
import type { User } from '../../api/user'
import router from "../../router";
import api from "../../api/api";

defineProps({
  userName: { type: String, default: "Brandon" },
});

const store = useStore();

if (userIsBlank(store.user as User)) {
  store.getCurrentUser().then(() =>{
    if(store.user.email == "") void router.push({ name: "signup" });
  // eslint-disable-next-line promise/prefer-await-to-callbacks
  }).catch((error) => {
    throw error;
  });
}

const state = reactive({
  fee: 5,
  showConfirmation: false,
  showSandboxNotice: false,
  cardNumber: store.cardData.number,
  expirationDate: `${store.billingActivation.expMonth}/${store.billingActivation.expYear}`,
  address: store.billingActivation.billingDetails.line1,
  showErrorModal: false,
  activated: false
});

function closeSandboxNotice(): void {
  state.showSandboxNotice = false;
  state.showConfirmation = true;
}

function activateUser(): void {
  api.activateUser(store.billingActivation)
    .then(() => {
      console.log("user activated successfully");
      state.activated = true;
      void router.push({ name: "register.finalize" });
    })
    .catch((e) => {
      state.showErrorModal = true;
      throw e;
    });
}

watch(() => state.activated, () => {
  state.showSandboxNotice = state.activated;
});

</script>
