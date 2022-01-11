<template>
  <div class="max-w-md h-auto border border-unicornSilver pb-9 mb-5">
    <div class="font-serif text-xl font-bold flex h-16">
      <div class="pr-6 pl-6 py-5 flex-grow">
        Buy Tokens
      </div>
      <div class="bg-unicornSilver rounded-bl-3xl pl-5 py-5 w-64">
        Sell Tokens
      </div>
    </div>

    <div class="pt-6 px-6 flex flex-col">
      <div class="flex justify-between items-center">
        <div class="bg-speedOfLight pl-4 pr-10 font-source py-3.5">
          <div class="font-bold text-xl">
            ${{ currentPrice }}
            <span class="font-normal">USD</span>
          </div>
        </div>

        <div
          v-if="newUser"
          class="flex-grow"
        >
          <PaymentSelectField
            v-model="state.selectedCard"
            new-user
            class="justify-between"
          />
        </div>

        <div
          v-else
          class="flex-grow"
        >
          <PaymentSelectField v-model="state.selectedCard" />
        </div>
      </div>

      <div
        v-if="newUser"
        class="border-l border-black border-dotted my-2.5 ml-0.5 pl-5 font-source text-xs py-2"
      />

      <div
        v-else
        class="border-l border-black border-dotted my-2.5 ml-0.5 pl-5 font-source text-xs py-2"
      >
        Transaction Fee: {{ transaction }} USD
      </div>

      <div class="border border-unicornSilver rounded mb-8 px-8 py-3">
        <div class="flex flex-col justify-center">
          <div>YOU RECEIVE</div>
          <div class="mt-0.5 flex items-center">
            <TextInput
              v-model="ISV"
              class="w-48"
              input-type="number"
              barrel
              :minimum-value="0"
              :increment="1"
              :pattern="'[0-9]'"
            />
            <div class="pl-1 text-sm">
              ISV
            </div>
          </div>
        </div>
      </div>
      <MainButton
        label="preview purchase"
        :disabled="buttonDisabled"
        @click="openIsvPurchase"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CardPayment } from "../../../api/payments";
import router from "../../../router";
import { onBeforeRouteUpdate } from "vue-router";
import { useStore } from "../../../store";
const store = useStore();

let price = ref<number>();
let ISV = ref<number>(0);
const isvPerDollar = 1 / 0.96;
const showIsvPurchase = ref(false);

export interface IsvConfirmation {
  type: string
  total: number
  accountNumber: string
  isvAmount: number | null
  isvTotal: string
  transactionFee: number
  paymentName: string
  name: string
  lastFour: string
  redactedAccountNumber: string
}

defineProps({
  newUser: Boolean,
});

onBeforeRouteUpdate(() => {
  ISV.value = 0
});

const state = reactive({
  selectedCard: {
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
    redactedAccountNumber: ""
  } as CardPayment,
  cardName: returnTrimmed(""),
  cardNumber: "",
  accountNumber: "",
  isvAmount: ""
});

let buttonDisabled = computed(() => {
  return ISV.value == 0 || cardIsBlank(state.selectedCard);
});

let currentPrice = computed(() => {
  if (ISV.value == null) {
    return (price.value = 0).toString();
  } else {
    let value = Math.round((price.value = ISV.value * isvPerDollar))
    return value.toFixed(2);
  }
});

let transaction = computed(() => {
  let fee = parseInt(currentPrice.value)
  if (currentPrice.value) {
    return parseInt(Math.round(fee * 0.007).toFixed(2))
  } else {
    return fee = 0
  }
});

let grandTotal = computed(() => {
  if (currentPrice.value) {
    let total = parseInt(currentPrice.value) + transaction.value;
    return Math.round(total)
  } else {
    return 0
  }
});

//Helper function for detecting disabled button
function cardIsBlank(card: CardPayment): boolean {
  return card.bankAccountId == "" &&
    card.cardId == "" &&
    card.createdAt == "" &&
    card.expMonth == null &&
    card.expYear == null &&
    card.institutionName == "" &&
    card.last4 == "" &&
    card.network == "" &&
    card.redactedAccountNumber == "" &&
    card.type == "" &&
    card.updatedAt == null
}

async function openIsvPurchase(): Promise<void> {
  if (buttonDisabled.value) return;
  showIsvPurchase.value = true;
  let isvPurchaseConfirmation: IsvConfirmation = {
    type: state.selectedCard.type,
    isvAmount: ISV.value,
    isvTotal: currentPrice.value,
    transactionFee: transaction.value,
    total: grandTotal.value,
    paymentName: state.cardName,
    name: store.user.fullName,
    lastFour: state.cardNumber,
    accountNumber: state.accountNumber,
    redactedAccountNumber: state.selectedCard.redactedAccountNumber
  }
  await router.push({ name: "wallet.purchase-confirm", params: { ...isvPurchaseConfirmation } })
}

function returnTrimmed(name: string) {
  if (name.length > 12) {
    var maxLength = 8;
    var trimmedString = name.substr(0, maxLength);
    return (trimmedString = trimmedString
      .substr(
        0,
        Math.min(trimmedString.length, trimmedString.lastIndexOf(" "))
      )
    );
  } else {
    return name;
  }
}

watch(
  () => state.selectedCard.type,
  () => {
    if (state.selectedCard.type === "Card") {
      state.cardNumber = state.selectedCard.last4;
      state.cardName = state.selectedCard.network;
      state.accountNumber = state.selectedCard.cardId
    } else {
      state.cardNumber = returnTrimmed(state.selectedCard.bankAccountId)
      state.cardName = returnTrimmed(state.selectedCard.institutionName)
      state.accountNumber = state.selectedCard.bankAccountId
    }
  }
);

</script>
