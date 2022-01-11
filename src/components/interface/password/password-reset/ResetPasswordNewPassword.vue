<template>
  <SignBaseModal
    no-close
    :is-open="true"
    @close="closeModal"
  >
    <form
      class="pt-10 px-6 max-w-sm"
      @submit.prevent="complete"
    >
      <div class="font-serif font-bold text-2xl pb-6 pr-28">
        Reset your password
      </div>
      <div>
        <div class="font-source text-lg pb-4">
          New Password
        </div>
        <TextInput
          v-model="password"
          :error="state.passwordOneError.hasError"
          :disabled="processing"
          placeholder="Enter"
          input-type="password"
          autocomplete="off"
        />

        <div class="font-source text-lg py-4">
          Confirm Password
        </div>
        <TextInput
          v-model="passwordConfirm"
          :error="state.passwordTwoError.hasError"
          :disabled="processing"
          placeholder="Enter"
          input-type="password"
          autocomplete="off"
        />
        <div
          v-if="state.passwordTwoError.hasError"
          class="text-miyamotoRed font-source text-xs pt-1.5 pl-4"
        >
          {{ state.passwordTwoError.label }}
        </div>
        <div
          v-else-if="state.tokenExpiredError.hasError"
          class="text-miyamotoRed font-source text-s pt-1.5 pl-4"
        >
          <router-link
            :to="{ name: 'reset.password.email', params: { userEmail } }"
          >
            {{ state.tokenExpiredError.label }}
          </router-link>
        </div>
      </div>
      <MainButton
        class="w-full mt-7 mb-16"
        label="submit"
        text-color="white"
        bg-color="red"
        type="submit"
        :loading="processing"
        :disabled="processing"
      />
    </form>
  </SignBaseModal>
</template>

<script setup lang="ts">

import router from "../../../../router";
import api from "../../../../api/api";

defineProps({
  isOpen: { type: Boolean, default: true },
  userEmail: { type: String, default: "" },
});
const emit = defineEmits(["close", "continue"]);
const state = reactive({
  passwordOneError: { hasError: false, label: "Incorrect Password" },
  passwordTwoError: { hasError: false, label: "Password Mismatch" },
  tokenExpiredError: { hasError: false, label: "Verification expired, click here to try again" },
})

const password = ref<string>("")
const passwordConfirm = ref<string>("")

function closeModal() {
  emit("close")
}

function checkError() {
  let hasError = false
  state.passwordOneError.hasError = password.value.length < 1
  hasError = hasError || state.passwordOneError.hasError
  state.passwordTwoError.hasError = passwordConfirm.value.length < 1
  hasError = hasError || state.passwordTwoError.hasError
  state.passwordTwoError.hasError = password.value != passwordConfirm.value
  hasError = hasError || state.passwordTwoError.hasError
  if (hasError) throw new Error("missing values")
}

const processing = ref(false)

async function complete(): Promise<void> {
  try {
    checkError()
    processing.value = true
    await api.resetPasswordComplete({
      password: password.value,
    })
    await router.push({ name: "signin" })
  } catch (reason) {
    if ((reason as { response: { data: string } })?.response?.data == "missing confirm-token cookie") {
      state.tokenExpiredError.hasError = true
    }
  } finally {
    processing.value = false
  }
}

</script>
