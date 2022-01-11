<template>
  <div class="pt-5 flex items-center">
    <img
      v-if="card.type === 'Card'"
      src="../../../../assets/cards.svg"
      alt="card"
    >

    <img
      v-else
      src="../../../../assets/bank.svg"
      alt="bank"
    >

    <div class="pl-4 flex flex-grow flex-col text-center items-start">
      <div
        v-if="card.type === 'Card'"
        class="font-source font-semibold"
      >
        {{ card.network }}
      </div>
      <div
        v-if="card.type === 'Bank'"
        class="font-source font-semibold"
      >
        {{ returnTrimmed(card.institutionName) }}
      </div>
      <div
        v-if="card.type === 'Card'"
        class="font-source text-sm"
      >
        ***{{ card.last4 }}
      </div>

      <div
        v-if="card.type === 'Bank'"
        class="font-source text-sm"
      >
        {{ card.redactedAccountNumber }}
      </div>
    </div>

    <PaymentSelectDropdown
      v-model="state.showOptions"
      :is-bank="card.type === 'Bank'"
      @remove="removePaymentMethod"
      @edit="handleEdit"
    />
  </div>
</template>

<script setup lang="ts">

import type { PropType } from "vue";
import type { CardPayment } from "../../../../api/payments";
import router from "../../../../router";
import api from "../../../../api/api";

const props = defineProps({
  card: { type: Object as PropType<CardPayment>, required: true },
});

const emit = defineEmits(["updatePaymentMethods"]);

const state = reactive({
  showOptions: false
});

function returnTrimmed(name: string) {
  let truncate = " ...";

  if (name.length > 12) {
    var maxLength = 14;
    var trimmedString = name.substr(0, maxLength);
    return (trimmedString = trimmedString
      .substr(
        0,
        Math.min(trimmedString.length, trimmedString.lastIndexOf(" "))
      )
      .concat(truncate));
  } else {
    return name;
  }
}

async function removePaymentMethod(): Promise<void> {
  await api.deletePaymentMethod(props.card.type.toLocaleLowerCase(), props.card.type === 'Card'? props.card.cardId : props.card.bankAccountId);
  emit("updatePaymentMethods");
}

async function handleEdit(): Promise<void> {
  if(props.card.type === "Card") await router.push({ name: 'edit.payment', params: { paymentId: props.card.cardId } });
  //else await router.push({ name: 'edit.payment', params: { paymentId: props.card.bankAccountId, form: "edit bank" } });
  else {
    await api.deletePaymentMethod("bank", props.card.bankAccountId);
    await router.push({ name: "add.payment.bank" });
  }
}



</script>
