<template>
  <div
    data-cy="add-payment-card-modal"
    class="rounded rounded-t pt-8 max-w-md"
  >
    <div
      class="px-7 flex items-center pb-7"
      @click="$emit('close')"
    >
      <div class="font-serif font-bold text-2xl">
        {{ state.messages.title }}
      </div>
    </div>
    <div class="px-7 h-[420px] overflow-y-scroll overflow-x-hidden">
      <div class="font-source font-semibold text-sm pb-5 pt-1">
        {{ state.messages.details }}
      </div>
      <TextInput
        v-model="state.billingInformation.billingDetails.name"
        data-cy="card-cardholderName"
        class="bg-white mb-4"
        :placeholder="state.messages.name"
        :required="true"
      />
      <div v-if="form.includes('card')">
        <TextInput
          v-model="state.billingInformation.cardData.number"
          data-cy="card-cardNumber"
          class="bg-white mb-4"
          placeholder="Card Number"
          :required="true"
        />
        <div class="flex items-center pb-10">
          <DateInput
            v-model="state.billingInformation.cardExpiration"
            data-cy="card-cardExp"
            input-type="text"
            class="bg-white text-center mr-4"
            placeholder="Exp. Date"
          />
          <TextInput
            v-model="state.billingInformation.cardData.cvv"
            data-cy="card-cardCvc"
            class="bg-white mr-4 w-24"
            placeholder="CVC"
            :required="true"
          />
          <img
            class="w-14 h-11"
            src="../../../../assets/cvc.png"
            alt="credit card back"
          >
        </div>
      </div>

      <div
        v-if="form.includes('card')"
        class="font-source font-semibold text-sm pb-5"
      >
        BILLING ADDRESS
      </div>
      <div class="h-10">
        <SelectField
          v-model="state.billingInformation.billingDetails.country"
          data-cy="card-country"
          class="border border-unicornSilver"
          label="Country"
          :options-object="countries"
        />
      </div>
      <TextInput
        v-model="state.billingInformation.billingDetails.line1"
        data-cy="card-line1"
        class="w-full bg-white mt-5"
        placeholder="Address Line 1"
        :required="true"
      />
      <TextInput
        v-model="state.billingInformation.billingDetails.line2"
        data-cy="card-line2"
        class="w-full bg-white mt-5 mb-5"
        placeholder="Address Line 2"
        :required="true"
      />
      <TextInput
        v-model="state.billingInformation.billingDetails.city"
        data-cy="card-city"
        class="w-full bg-white mb-5 mr-4"
        placeholder="Enter A City"
        :required="true"
      />

      <div class="flex">
        <TextInput
          v-model="state.billingInformation.billingDetails.postalCode"
          data-cy="card-postal-code"
          class="bg-white"
          placeholder="Postcode/Zip"
          :required="true"
        />
        <div class="h-10 ml-4">
          <SelectField
            v-model="state.billingInformation.billingDetails.district"
            data-cy="card-state"
            small
            class="border w-40 border-unicornSilver"
            label="State"
            :options-object="usStates"
          />
        </div>
      </div>
    </div>
    <div class="bg-gradient-to-t h-7 from-black opacity-20" />

    <div class="pt-4 pb-4 px-5 relative z-30 rounded-b">
      <MainButton
        data-cy="card-save"
        class="w-full"
        label="save"
        bg-color="red"
        text-color="white"
        :disabled="error"
        :loading="state.processing"
        @click="handleAction"
      />
    </div>
  </div>
</template>

<script setup lang="ts">

import api from "../../../../api/api";
import type { BillingDetails, BillingPayload, CardData } from "../../../../api/circle";
import type { BankPayment } from "../../../../api/payments";
import { useStore } from "../../../../store";
import { countries } from "../../../../abbreviations/countries";
import { usStates } from "../../../../abbreviations/states";
import router from "../../../../router";

const props = defineProps({
  form: { type: String, default: "add card" },
  cardId: { type: String, default: null },
  bankId: { type: String, default: null },
  bankPublicToken: { type: String, default: null }
});

const emit = defineEmits(["close"]);

const store = useStore();

const state = reactive({
  disabled: false,
  billingInformation: {
    cardNumber: null,
    cvv: null,
    cardData: {
      number: "",
      cvv: ""
    } as CardData,
    billingDetails: {
      name: "",
      line1: "",
      line2: "",
      city: "",
      district: "",
      country: "",
      postalCode: ""
    } as BillingDetails,
    cardExpiration: "",
  },
  messages: {
    title: "",
    details: "",
    name: ""
  },
  processing: false
});

onMounted(() => {
  switch (props.form) {
    case "add card":
      state.messages.title = "Add Debit/Credit Card";
      state.messages.details = "CARD DETAILS";
      state.messages.name = "Cardholder name" 
      break;
    case "add bank":
      state.messages.title = "Add Bank Account";
      state.messages.details = "ACCOUNT DETAILS";
      state.messages.name = "Account holder name"
      break;
    case "edit card":
      state.messages.title = "Edit";
      state.messages.details = "CARD DETAILS";
      state.messages.name = "Cardholder name"
      break;
    case "edit bank":
      state.messages.title = "Edit";
      state.messages.details = "ACCOUNT DETAILS";
      state.messages.name = "Account holder name";
      break;
  }
});

const error = computed(() => {
  if(!props.form.includes("bank")) return !(cardDataValid.value && addressValid.value);
  return !(addressValid.value && state.billingInformation.billingDetails.name.length !== 0);
});

const addressValid = computed(() => {
  return state.billingInformation.billingDetails.name.length != 0 &&
    state.billingInformation.billingDetails.line1.length != 0 &&
    state.billingInformation.billingDetails.city.length != 0 &&
    state.billingInformation.billingDetails.district.length != 0 &&
    state.billingInformation.billingDetails.postalCode.length != 0
});

const cardDataValid = computed(() => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();
  const expDate = state.billingInformation.cardExpiration.split("/");

  if(currentYear > Number(expDate[1])) return false;
  if(currentYear === Number(expDate[1]) && currentMonth > Number(expDate[0])) return false;

  return state.billingInformation.cardData.number.length != 0 &&
    state.billingInformation.cardExpiration != null &&
    state.billingInformation.cardData.cvv.length != 0;
});

function parseDate(value: string): number[] {
  const datePair = [];
  for (const item of value.split("/")) {
    datePair.push(Number(item));
  }
  return datePair;
}

async function handleAction(): Promise<void> {
  state.processing = true;
  if(props.form === "add card") await api.addCardPayment(await buildCardPayload());
  if(props.form === "edit card") await api.replaceCard(props.cardId, (await buildCardPayload()));
  if(props.form === "add bank") await api.addBankAccount(buildBankPayload());
  await store.getPaymentMethods();
  emit("close");
  state.processing = false;
  await router.push({ name: "profile" });
}

async function buildCardPayload(): Promise<BillingPayload> {
  const encrypted = await api.encryptCard({ number: state.billingInformation.cardData.number.replaceAll(/\s/g, ''), cvv: state.billingInformation.cardData.cvv } as CardData);
  const datePair = parseDate(state.billingInformation.cardExpiration);
  store.getKeyId();
  const payload = {
    encryptedData: encrypted,
    keyId: store.billingActivation.keyId,
    expMonth: datePair[0],
    expYear: datePair[1],
    billingDetails: state.billingInformation.billingDetails
  } as BillingPayload;
  return payload;
}

function buildBankPayload(): BankPayment {
  return {
    publicToken: props.bankPublicToken,
    accountId: props.bankId,
    billingDetails: state.billingInformation.billingDetails
  } as BankPayment;
}

</script>
