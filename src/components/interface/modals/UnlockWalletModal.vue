<template>
  <Modal
    :is-open="state.open"
    blur
  >
    <div class="bg-white p-8">
      <div class="text-xl font-serif font-bold">
        Unlock Your Wallet!
      </div>
      <div class="mt-6">
        Please enter your mnemonic phrase to get access to your wallet!
      </div>
      <div
        class="h-4 -mb-2 transition-all duration-300 text-planetOfTheApes text-center m-auto font-bold mt-4"
        :class="{
          'opacity-0': !state.error.hasError,
          'opacity-100': state.error.hasError
        }"
      >
        {{ state.error.message }}
      </div>
      <MnemonicInput
        v-model="state.mnemonicPhrase"
        border
      />
      <MainButton
        class="m-auto mt-14"
        label="VERIFY MY MNEMONIC PHRASE"
        :disabled="emptyInputs"
        @click="verifyPhrase"
      />
    </div>
  </Modal>
</template>

<script setup lang ="ts">

import { Mnemonic, PublicKey } from "@hashgraph/sdk";
import { useStore } from "../../../store";

const store = useStore();

defineProps({
  isOpen: { type: Boolean, default: false }
});

const emit = defineEmits(["unlock"]);

const state = reactive({
  mnemonicPhrase: [] as string[],
  error: {
    hasError: false,
    message: ""
  },
  publicKey: "",
  open: true
});

onMounted(() => {
  for (let i = 0; i < 12; i++) {
    state.mnemonicPhrase.push("");
  }
});

const emptyInputs = computed(() => {
  for (let i = 0; i < state.mnemonicPhrase.length; i++) {
    if (state.mnemonicPhrase[i] == "") return true;
  }
  return false;
});

async function verifyPhrase(): Promise<void> {
  try {
    const verified = await checkPhrase();
    if (verified) {
      resetError();
      store.setPublicKey(state.publicKey);
      emit("unlock", state.publicKey);
      state.publicKey = "";
      state.open = false;
    }
    else error("One or more words does not match your mnemonic phrase.");
  } catch (e) {
    console.warn("Error", e);
    error("One or more words does not match your mnemonic phrase.")
  }
}

async function checkPhrase(): Promise<boolean> {
  const walletPublicKey = (PublicKey.fromString((await store.getCurrentUser()).walletAddress ?? "")).toString();
  if (!walletPublicKey) {
    state.error.hasError = true;
    state.error.message = "User has no wallet";
    throw new Error("User has no wallet!");
  }
  const mnemonic = await Mnemonic.fromString(state.mnemonicPhrase.toString());
  const privateKey = await mnemonic.toPrivateKey();
  const userPublicKey = privateKey.publicKey.toString();
  if (walletPublicKey !== userPublicKey) {
    error("One or more words does not match your mnemonic phrase.");
    return false;
  }
  state.publicKey = userPublicKey;
  return true;
}

function error(message: string): void {
  state.error.hasError = true;
  state.error.message = message;
}

function resetError(): void {
  state.error.hasError = false;
  state.error.message = "";
}

</script>