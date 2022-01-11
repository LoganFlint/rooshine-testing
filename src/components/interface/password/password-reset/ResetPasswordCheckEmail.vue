<template>
  <SignBaseModal
    no-close
    :is-open="true"
    @close="closeModal"
  >
    <form
      class="max-w-sm bg-planetOfTheApes px-8 text-center"
      @submit.prevent="resendEmail"
    >
      <div>
        <img
          class="pt-20 mx-auto"
          src="../../../../assets/email_sent.svg"
          alt="email sent"
        >
        <div class="pt-4 font-serif font-bold text-2xl pb-5 text-white">
          Check your mail
        </div>
        <div
          class="font-source text-lg pb-6 text-white"
        >
          We have sent a verification code to {{ userEmail }}
        </div>
      </div>

      <MainButton
        class="w-full mt-5"
        label="Enter Verification Code"
        text-color="red"
        bg-color="white"
        @click="continueToNext"
      />
      <MainButton
        class="w-full mt-5 mb-16 bg-opacity-20"
        label="Didn’t receive it? Try again"
        text-color="white"
        bg-color="black"
        type="submit"
        :loading="processing"
        :disabled="processing"
      />
    </form>
  </SignBaseModal>
</template>

<script setup lang="ts">

import api from "../../../../api/api"

const props = defineProps({
  isOpen: { type: Boolean, default: true },
  userEmail: { type: String, default: "" },
});

const emit = defineEmits(["close", "continue"]);

function closeModal() {
  emit("close")
}

function continueToNext() {
  emit("continue", props.userEmail, "reset.password.checkemail")
}

const error = ref(false)
const processing = ref(false)

async function resendEmail() {
  if (!processing.value) {
    try {
      processing.value = true
      await api.resetPasswordSendEmail({
        email: props.userEmail,
      })
    } catch (e) {
      error.value = true
    } finally {
      processing.value = false
    }
  }
}

</script>
