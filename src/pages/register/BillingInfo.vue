<template>
  <div class="pt-10 px-28">
    <div class="text-center font-bold font-serif text-xl pb-3">
      You're almost done!
    </div>
    <div class="text-center font-source pb-10">
      There is a small, one-time $5.00 registration
      <br>fee to meet age verification and other compliance
      <br>obligations for your account.
    </div>

    <form
      data-cy="billing-info-form"
      @submit.prevent="submitBilling"
    >
      <div class="pt-7 bg-speedOfLight flex flex-col px-10 w-full max-w-2xl mx-auto">
        <div class="w-full flex flex-col">
          <div class="flex items-end w-full max-w-2xl">
            <div class="text-lg flex flex-col w-1/2 pr-4">
              <div class="mb-1">
                Card Number
              </div>
              <TextInput
                v-model="state.billingInformation.cardData.number"
                visa
                maxlength="19"
                class="max-w-xs bg-white"
                placeholder="Enter Card Number"
                type="text"
              />
            </div>
          </div>
        </div>
        <div class="w-full flex flex-col pt-7">
          <div class="flex items-end w-full max-w-2xl">
            <div class="text-lg flex flex-col w-1/2 mr-8">
              Cardholder's Name
              <TextInput
                v-model="state.billingInformation.billingDetails.name"
                class="max-w-xs bg-white"
                placeholder="Full Name on Card"
                type="text"
              />
            </div>
            <div class="w-1/2 flex-row flex items-end">
              <div class="pr-5">
                <div class="font-source text-lg pb-1.5">
                  Expiration Date
                </div>
                <DateInput
                  v-model="state.billingInformation.cardExpiration"
                  input-type="text"
                  class="bg-white text-center"
                  placeholder="MM/YYYY"
                />
              </div>
              <div class="pr-5">
                <div class="font-source text-lg pb-1.5">
                  Security Code
                </div>
                <TextInput
                  v-model="state.billingInformation.cardData.cvv"
                  input-type="number"
                  maxlength="3"
                  class="bg-white"
                  placeholder="CVV"
                  type="text"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="mt-9 mb-8 border border-black" />

        <div>
          <div class="pb-7 font-source font-bold text-sm">
            Billing Address
          </div>
          <div class="w-full flex flex-col">
            <div class="flex items-end w-full max-w-2xl">
              <div class="text-lg flex flex-col w-1/2 mr-8">
                <div class="mb-1">
                  Enter an address
                </div>
                <TextInput
                  v-model="state.billingInformation.billingDetails.line1"
                  class="bg-white max-w-sm mr-8 w-full"
                  placeholder="Address 1"
                  input-type="text"
                  type="text"
                />
              </div>
              <div class="w-1/2">
                <div class="text-lg">
                  <TextInput
                    v-model="state.billingInformation.billingDetails.line2"
                    class="bg-white max-w-sm w-full"
                    placeholder="Address 2"
                    input-type="text"
                    type="text"
                  />
                </div>
              </div>
            </div>
          </div>

          <div class="w-full flex flex-col pt-7">
            <div class="flex items-end w-full max-w-2xl">
              <div class="text-lg flex flex-col w-1/2 mr-8">
                <div class="mb-1">
                  City
                </div>
                <TextInput
                  v-model="state.billingInformation.billingDetails.city"
                  class="bg-white mr-8 w-full max-w-sm"
                  placeholder="Enter a City"
                  input-type="text"
                  type="text"
                />
              </div>
              <div class="w-1/2">
                <div class="text-lg">
                  Country
                  <SelectField
                    v-model="state.billingInformation.billingDetails.country"
                    small
                    class="h-11"
                    label="Select"
                    :options-object="countries"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="w-full flex flex-col pt-7 pb-11">
          <div class="flex items-end w-full max-w-2xl">
            <div class="text-lg flex flex-col w-1/2 mr-8">
              <div class="mb-1">
                State/Province
              </div>
              <SelectField
                v-model="state.billingInformation.billingDetails.district"
                small
                class="h-11"
                label="Select"
                :options-object="usStates"
              />
            </div>
            <div class="w-1/2">
              <div class="text-lg">
                Enter a postal code
                <TextInput
                  v-model="state.billingInformation.billingDetails.postalCode"
                  class="bg-white max-w-sm"
                  placeholder="Postcode/Zip"
                  input-type="text"
                  type="text"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>

  <div class="flex justify-center">
    <MainButton
      label="Continue"
      class="w-60 h-9 mt-8 mb-16"
      :loading="processing"
      :disabled="!readyToSubmit"
      type="submit"
      @click="submitBilling"
    />
  </div>
</template>

<script setup lang="ts">

import { countries } from "../../abbreviations/countries"
import { usStates } from "../../abbreviations/states"
import { useStore } from "../../store"
import { userIsBlank } from "../../api/modules/user"
import type { User } from '../../api/user'
import type { CardData, BillingDetails } from "../../api/circle";

import api from "../../api/api"


const emit = defineEmits(["continue"]);

const store = useStore()

const readyToSubmit = computed(() => {
  return validateBillingDetails() && validateCardNumber() && validateCVV() && validateExpirationDate();
});

const state = reactive({
  userInfoReady: true,
  userInfoProcessing: false,
  submitClicked: false,
  submitProcessing: false,
  billingInformation: {
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
  }
})

if (userIsBlank(store.user as User)) {
  state.userInfoReady = false
  state.userInfoProcessing = true

  void store.getCurrentUser().then(() => {
    state.userInfoProcessing = false
    state.userInfoReady = true
  })
}

async function submitBilling(): Promise<void> {
  state.submitProcessing = true;
  state.submitClicked = true;

  const encrypted = await api.encryptCard({ number: state.billingInformation.cardData.number.replaceAll(/\s/g, ''), cvv: state.billingInformation.cardData.cvv } as CardData);

  const datePair = parseDate(state.billingInformation.cardExpiration);

  store.updateBilling({
    cardData: state.billingInformation.cardData,
    encryptedCardData: encrypted,
    billingDetails: state.billingInformation.billingDetails,
    expirationDatePair: datePair
  });
  
  state.submitProcessing = false;
  emit("continue");
}

/** indicates if the button should show spinner */
const processing = computed(
  () => {
    if (!state.submitClicked) return false // if they haven't clicked, don't show it
    return !state.userInfoReady || state.userInfoProcessing || state.submitProcessing
  }
)

function parseDate(value: string): number[] {
  const datePair = [];
  for (const item of value.split("/")) {
    datePair.push(Number(item));
  }
  return datePair;
}

function validateCardNumber(): boolean {
  const cardNumber = state.billingInformation.cardData.number.replaceAll(/\s/g, '');
  return cardNumber.length === 16 && !isNaN(Number(cardNumber));
}

function validateBillingDetails(): boolean {
  const details = state.billingInformation.billingDetails;
  return details.name !== "" &&
    details.line1 !== "" &&
    details.city !== "" &&
    details.country !== "" &&
    details.district !== "" &&
    details.postalCode !== ""
}

function validateCVV(): boolean {
  const cvv = state.billingInformation.cardData.cvv.replaceAll(/\s/g, '');
  return !isNaN(Number(cvv));
}

function validateExpirationDate(): boolean {
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const expirationDate = parseDate(state.billingInformation.cardExpiration);
  if (expirationDate[1] === currentYear) return (expirationDate[0] >= currentMonth && expirationDate[0] <= 12);
  return ((expirationDate[1] >= currentYear) && (expirationDate[0] > 0 && expirationDate[0] <= 12));
}

</script>
