<template>
  <SignBaseModal
    blur
    :is-open="state.open"
    @close="closeModal"
  >
    <div class="pt-9 px-5">
      <div class="font-serif font-bold text-2xl text-center -mt-3 px-24 pb-6">
        Purchase Review
      </div>
      <div
        class="bg-magneticGray rounded-3xl flex items-center pl-5 py-[22px] mb-5"
      >
        <div>
          <img
            v-if="type === 'Card'"
            class="w-6 h-6"
            src="../../../assets/cards.svg"
            alt="card or wallet symbol"
          >
          <img
            v-if="type === 'Bank'"
            class="w-6 h-6"
            src="../../../assets/bank.svg"
            alt="card or wallet symbol"
          >
        </div>
        <div class="pl-5">
          <div
            v-if="type === 'Card'"
            class="font-source font-semibold"
          >
            {{ paymentName }} *** {{ lastFour }}
          </div>
          <div
            v-if="type === 'Bank'"
            class="font-source font-semibold"
          >
            {{ paymentName }} {{ redactedAccountNumber }}
          </div>
          <div>{{ name }}</div>
        </div>
      </div>
      <div
        class="flex items-center justify-between border-b border-unicornSilver pb-3 mb-5 text-trolleyGray font-source text-sm"
      >
        <div>Item</div>
        <div>Subtotal</div>
      </div>
      <div
        class="flex items-center justify-between pb-6 border-b border-unicornSilver mb-5 text-lg"
      >
        <div>
          <div class="flex items-center pb-4">
            <img
              src="../../../assets/barrel.svg"
              alt="barrel or token symbol"
            >
            <div class="pl-2">
              {{ isvAmount }} ISV
            </div>
          </div>
          <div>Transaction Fee</div>
        </div>
        <div>
          <div class="pb-4">
            ${{ isvTotal }}
          </div>
          <div class="text-right">
            ${{ transactionFee }}
          </div>
        </div>
      </div>
      <div
        class="flex items-center justify-between font-source font-bold text-lg pb-6"
      >
        <div>Total</div>
        <div>${{ total }}</div>
      </div>
      <MainButton
        class="py-1 w-full mb-6"
        label="confirm purchase"
        bg-color="red"
        text-color="white"
        @click="confirmPurchase"
      />
    </div>
  </SignBaseModal>
</template>

<script setup lang="ts">
  import api from "../../../api/api";
  import router from "../../../router";

  export interface IsvConfirmation{
  total: string
  isvAmount: string
  isvTotal: string
  transactionFee: string
}

  let props = defineProps({
    paymentName: { type: String, default: "" },
    name: { type: String, default: "" },
    lastFour: { type: String, default: "" },
    accountNumber: { type: String, default: "" },
    isvAmount: { type: String, default: "" },
    isvTotal: { type: String, default: "" },
    transactionFee: { type: String, default: "" },
    total: { type: String, default: "" },
    type: { type: String, default: "" },
    isOpen: Boolean,
    redactedAccountNumber: { type: String, default: "" },
  });

  let state = reactive({
    open: true,
  });

  const emit = defineEmits(["close", "continue"]);


  async function closeModal() {
    emit("close");
    await router.push({ name: "wallet"});
  }

  const card = ref({
    amount: parseInt(props.total),
    cardId: props.accountNumber,
  });

  const bank = ref({
    amount: parseInt(props.total),
    bankAccountId: props.accountNumber,
  });

  async function confirmPurchase() {
    let paymentType = computed(() => {
      if (props.type === "Card") {
        return card.value;
      } else {
        return bank.value;
      }
    });

    try {
      await api.purchasIsv(paymentType.value);
      state.open = false;
      await router.push({ name: "wallet.purchase-complete" });
    } catch (e) {
      await router.push({ name: "wallet.purchase-error" });
      console.log(e);
    }
  }
</script>
