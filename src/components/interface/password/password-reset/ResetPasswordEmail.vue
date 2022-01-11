<template>
  <SignBaseModal
    no-close
    :is-open="true"
    @close="closeModal"
  >
    <div class="w-full max-w-sm">
      <form
        class="pt-10 pl-6 pr-5"
        @submit.prevent="continueToNext"
      >
        <div class="font-serif font-bold text-2xl">
          Reset Password
        </div>
        <div
          class="font-source text-lg pt-5 pr-10 pb-5"
        >
          Enter the email associated with your account and we’ll email you a verfification code before resetting your password.
        </div>
        <div>
          <div class="font-source text-lg pb-4">
            Email Address
          </div>
          <TextInput
            v-model="email"
            data-cy="reset-password-email-input"
            placeholder="Enter"
            :error="isError"
            :disabled="processing"
          />
          <div
            v-if="isError"
            class="pt-1.5 text-sm text-planetOfTheApes"
          >
            {{ state.emailError.label }}
          </div>
        </div>
        <MainButton
          class="w-full mt-7 mb-16"
          label="send"
          text-color="white"
          bg-color="red"
          :loading="processing"
          :disabled="processing"
          type="submit"
        />
      </form>
    </div>
  </SignBaseModal>
</template>

<script setup lang="ts">

import api from "../../../../api/api";

defineProps({
	isOpen: { type: Boolean, default: true },
});

const emit = defineEmits(["close", "continue"]);

const state = reactive({
	emailError: { 
		hasError: false, 
		label: "InvalidEntry" 
	},
})

const email = ref<string>("")
const isError = ref(false)

function resetValues() {
	email.value = ""
	isError.value = false
}

function closeModal() {
	emit("close")
	resetValues()
}

function hasError() {
	const mailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	if (!mailRegex.test(email.value)) {
		isError.value = true
		throw new Error("invalid email")
	}
}

const processing = ref(false)

async function continueToNext() {
	if (!processing.value) {
		try {
			hasError()
			processing.value = true
			await api.resetPasswordSendEmail({
				email: email.value,
			})
			emit("continue", email.value, "reset.password.email")
		} catch (reason) {
			if ((reason as { response: { data: string } })?.response?.data == "too many requests") {
				state.emailError.label = "Too many requests, please wait and try again"
				isError.value = true
			} else {
				state.emailError.label = "InvalidEntry"
				isError.value = true
			}
		} finally {
			processing.value = false
		}
	}
}

</script>
