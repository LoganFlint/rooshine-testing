<template>
  <div>
    <div
      v-for="(card, i) in state.paymentMethods"
      :key="createUniqueKey(i, card.type === 'Card'? card.cardId : card.bankAccountId)"
      :index="i"
    >
      <PaymentMethod
        :card="card"
        @update-payment-methods="updatePaymentMethods"
      />
    </div>
  </div>
</template>

<script setup lang="ts">

import { useStore } from "../../../../store";
import type { CardPayment, PayInfo } from "../../../../api/payments";

const state = reactive({
  paymentMethods: [
    {
      type: "",
      cardId: "",
      network: "",
      last4: "",
      expMonth: null,
      expYear: null,
      createdAt: "",
      updatedAt: null,
      bankAccountId: "",
      institutionName: "",
      redactedAccountNumber: "",
    },
  ] as CardPayment[],

  payInfo: {
    expiration: "",
    cvv: "",
    address: "",
    zipCode: "",
    city: "",
    state: "",
    country: "",
  } as PayInfo,

  count: 0
});

const store = useStore();

onMounted(async () => {
   await updatePaymentMethods();
});

async function updatePaymentMethods(): Promise<CardPayment[]> {
  state.paymentMethods = await store.getPaymentMethods();
  return state.paymentMethods;
} 

watch(() => store.paymentMethods, () => {
  state.paymentMethods = store.paymentMethods;
});

function createUniqueKey(index: number, id: string): string {
  return `${index}.${id}`;
}

</script>
