<template>
  <div class="w-full h-72 rounded border border-unicornSilver">
    <div class="py-4 mt-2 mx-2 bg-speedOfLight px-8 flex justify-between">
      <div>Registration Fee</div>
      <div class="font-bold">
        ${{ fee }}
      </div>
    </div>

    <div class="pt-5 mr-8 flex justify-between">
      <div class="pl-10">
        <div>Payment Type: {{ cardType }}</div>
        <div>Exp. {{ date }}</div>
      </div>
      <div class="flex-shrink w-32 pl-5">
        {{ store.billingActivation.billingDetails.line1 }}
        {{ store.billingActivation.billingDetails.line2 }}
      </div>
    </div>

    <div class="pl-8 mt-6">
      <Checkbox
        v-model="store.billingActivation.saveCard"
        label="Save Payment Info for future use"
        class="text-sm"
        :checked="modelValue"
      />

      <MainButton
        class="mt-6 py-1.5"
        label="edit"
        text-color="red"
        bg-color="outline"
        @click="openEditPayment"
      />
    </div>
  </div>

  <EditRegistrationPayment
    v-model="state.payInfo"
    :is-open="showEditPayment"
    :last-four="extractLastFour(cardNumber)"
    @update:model-value="savePayment"
  />
</template>

<script setup lang="ts">

import { useStore } from "../../../store";
import type { PayInfo } from "../../../api/payments";

defineProps({
  fee: { type: String, default: "5" },
  cardType: { type: String, default: "Visa" },
  cardNumber: { type: String, default: "" },
  expiration: { type: String, default: "" },
  address: { type: String, default: "" },
  modelValue: { type: Boolean, default: false }
});

defineEmits(["update:modelValue"]);

const store = useStore();

const state = reactive({
  clicked: false,
  payInfo: {
    expiration: "",
    cvv: "",
    address: "",
    zipCode: "",
    city: "",
    state: "",
    country: "",
  } as PayInfo,
})

function extractLastFour(cardNumber: string): string {
  const strippedNumber = cardNumber.replaceAll(" ", "");
  return strippedNumber.substring(strippedNumber.length -4 , strippedNumber.length);
}

const showEditPayment = ref(false)

function openEditPayment() {
  showEditPayment.value = true
}

function savePayment(payment: PayInfo, savePayment: boolean) {
  showEditPayment.value = false;
  const updatedBilling = {
    cardData: store.cardData,
    encryptedCardData: store.billingActivation.encryptedData,
    billingDetails: {
      name: store.user.fullName,
      line1: payment.address,
      line2: "",
      city: payment.city,
      district: payment.state,
      country: payment.country,
      postalCode: payment.zipCode
    },
    expirationDatePair: [ Number(date.value.split("/")[0].trim()), Number(date.value.split("/")[1].trim())]
  }
  store.updateBilling(updatedBilling);
}

const date = computed(() => {
  let monthStr = store.billingActivation.expMonth?.toString();
  let yearStr = store.billingActivation.expYear?.toString();

  if (monthStr?.length == 1) {
    monthStr = "0" + monthStr;
  }

  yearStr = yearStr?.slice(-2);
  return `${monthStr}/${yearStr}`;
});

</script>
