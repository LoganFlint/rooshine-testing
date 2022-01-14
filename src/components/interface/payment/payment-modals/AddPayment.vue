<template>
  <SignBaseModal
    no-close
    :is-open="routeData.route == 'add.payment'"
    @close="closeModal"
  >
    <div
      data-cy="add-payment-modal"
      class="pt-8 flex flex-col items-center border border-blue"
    >
      <div class="font serif font-bold text-2xl pb-8 text-center">
        Add New Payment Method
      </div>
      <div class="pt-8">
        <div
          :class="[
            'rounded mb-6 flex items-center py-5 pl-5 w-80 mx-8 cursor-pointer',
            {
              'border border-planetOfTheApes': addBank,
              'border border-unicornSilver': !addBank,
            },
          ]"
          @click="selectBank"
        >
          <img
            class="w-7 h-7"
            src="../../../../assets/bank.svg"
            alt="bank"
          >
          <div class="pl-4">
            <div class="font-source font-bold">
              Bank Account
            </div>
            <div class="text-tiny pt-0.5">
              Use a bank account to buy
            </div>
          </div>

          <div
            v-if="addBank"
            class="ml-auto pr-5"
          >
            <img
              src="../../../../assets/chosen_payment.svg"
              alt="check mark"
            >
          </div>
        </div>
        <div
          data-cy="add-card-payment"
          :class="[
            'rounded mb-6 flex items-center py-5 pl-5 w-80 mx-8 cursor-pointer',
            {
              'border border-planetOfTheApes': addCard,
              'border border-unicornSilver': !addCard,
            },
          ]"
          @click="selectCard"
        >
          <img
            src="../../../../assets/cards.svg"
            alt="bank"
          >
          <div class="pl-4">
            <div class="font-source font-bold">
              Debit/Credit Card
            </div>
            <div class="text-tiny pt-0.5">
              Use a debit or credit card to buy
            </div>
          </div>

          <div
            v-if="addCard"
            class="ml-auto pr-5"
          >
            <img
              src="../../../../assets/chosen_payment.svg"
              alt="check mark"
            >
          </div>
        </div>
        <div class="pb-8 px-5">
          <MainButton
            data-cy="continue-add-card"
            v-if="addCard"
            class="w-full"
            label="continue"
            bg-color="red"
            text-color="white"
            :disabled="btnDisabled"
            @click="continueToNextStep"
          />

          <PlaidLink
            v-if="addBank && state.plaidLinkToken"
            client-name="rooshine"
            env="sandbox"
            :link-token="state.plaidLinkToken"
            :public-key="publicKey"
            webhook="https://requestb.in"
            :on-load="plaidAction"
            :on-success="onSuccess"
            :on-exit="plaidAction"
            :on-event="plaidAction"
          >
            <MainButton
              class="w-full"
              label="continue"
              bg-color="red"
              text-color="white"
              :disabled="btnDisabled"
            />
          </PlaidLink>
        </div>
      </div>
    </div>
  </SignBaseModal>
</template>

<script setup lang="ts">
  import type { PropType } from "vue";
  import type { RouteData } from "../../../base/ProfileModalManager.vue";
  const plaidPublicKey = import.meta.env.VITE_APP_PLAID_PUBLIC_KEY;
  import { useStore } from "../../../../store";
  import router from "../../../../router";

  const store = useStore();

  const publicKey = plaidPublicKey;


  const props = defineProps({
    routeData: { type: Object as PropType<RouteData>, required: true },
    plaidPublicToken: { type: String, default: "" },
    accountId: { type: String, default: "" },
  });

  const state = reactive({
    plaidLinkToken: "",
    plaidPublicToken: props.plaidPublicToken,
    accountId: props.accountId,
  });

  void store
    .getPlaidUserToken()
    .then((token) => (state.plaidLinkToken = token));

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async function onSuccess(public_token: string, metadata: any) {
    state.plaidPublicToken = public_token;
    state.accountId = metadata.account_id;
    await router.push({
      name: "add.payment.bank",
      params: { bankPublicToken: public_token, bankId: state.accountId },
    });
  }

  const emit = defineEmits(["close", "goBack", "continue", "addCard"]);

  const addBank = ref(false);
  const addCard = ref(false);

  function selectBank() {
    if (addBank.value) {
      addBank.value = false;
    } else {
      addCard.value = false;
      addBank.value = true;
    }
  }

  function selectCard() {
    if (addCard.value) {
      addCard.value = false;
    } else {
      addBank.value = false;
      addCard.value = true;
    }
  }

  const btnDisabled = computed(() => !addBank.value && !addCard.value);

  async function continueToNextStep() {
    if (addCard.value) await router.push({ name: "add.payment.card" });
  }

  function closeModal() {
    emit("close");
  }

  function plaidAction(): void {
    //Placeholder for plaid, will throw error if certain callbacks are not present
  }
</script>
