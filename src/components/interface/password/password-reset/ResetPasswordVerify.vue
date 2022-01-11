<template>
  <SignBaseModal
    no-close
    :is-open="true"
    @close="closeModal"
  >
    <form
      class="pt-10 pl-6 pr-5 max-w-sm"
      @submit.prevent="continueToNext"
    >
      <div class="font-serif font-bold text-2xl">
        Email Verification
      </div>
      <div
        class="font-source text-lg pt-5 pr-20 pb-5"
      >
        Enter the 6 digit code that was sent to the email address {{ userEmail }}
      </div>
      <div class="flex justify-between mr-2 pb-3">
        <PinInput
          v-model="codes"
          :error="error"
          :disabled="processing"
          :button-ref="submitPinButton"
        />
      </div>
      <div
        v-if="error"
        class="text-planetOfTheApes text-xs"
      >
        Enter a valid confirmation code
      </div>
      <MainButton
        class="w-full mt-5 mb-16"
        label="send"
        text-color="white"
        bg-color="red"
        type="submit"
        :loading="processing"
        :disabled="processing"
        @button-ref="updateButtonRef"
      />
    </form>
  </SignBaseModal>
</template>

<script setup lang="ts">

import api from "../../../../api/api";

const props = defineProps({
	isOpen: { type: Boolean, default: true },
	userEmail: { type: String, default: "" },
});

const emit = defineEmits(["close", "continue"]);

const submitPinButton = ref<HTMLButtonElement | null>(null)
const codes = ref(["", "", "", "", "", ""])

function emptyCode() {
	codes.value = ["", "", "", "", "", ""]
}

function updateButtonRef(el: HTMLButtonElement) {
	submitPinButton.value = el
}

function closeModal() {
	emit("close")
	emptyCode()
}

function validateCode(arr: Array<string>) {
	arr.forEach(value => {
		if (value === "") {
			error.value = true
			throw new Error("invalid code")
		}
	})
}

const error = ref(false)
const processing = ref(false)

async function continueToNext() {
	try {
		validateCode(codes.value)
		processing.value = true
		await api.resetPasswordVerifyEmail({
			code: codes.value.join(""),
		})
		emit("continue", props.userEmail, "reset.password.verify")
	} catch (e) {
		emptyCode()
		error.value = true
	} finally {
		processing.value = false
	}
}

</script>
