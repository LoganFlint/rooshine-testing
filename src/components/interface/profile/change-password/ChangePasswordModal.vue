<template>
  <SignBaseModal
    no-close
    :is-open="routeData.route == 'profile.change.password'"
    blur
    @close="$emit('close')"
  >
    <div
      data-cy="change-password-modal"
      class="pl-6 pt-8"
    >
      <div class="font-serif font-bold text-2xl">
        Change your password
      </div>
      <form @submit.prevent="changePassword">
        <div class="pr-6 pb-8">
          <div class="font-source text-lg pt-6 pb-4">
            Current Password
          </div>
          <TextInput
            v-model="currentPassword"
            data-cy="current-password"
            :error="state.currentPassword.hasError"
            :disabled="processing"
            class="bg-speedOfLight mr-8 w-full"
            placeholder="Enter"
            input-type="password"
          />
          <div
            v-if="state.currentPassword.hasError"
            class="text-miyamotoRed font-source text-xs pt-1.5 pl-4"
          >
            {{ state.currentPassword.label }}
          </div>
        </div>

        <div class="bg-speedOfLight -ml-6">
          <div class="pl-5 pt-4 pb-5 pr-6">
            <div class="font-source text-lg pb-3">
              New Password
            </div>
            <TextInput
              v-model="newPasswordOne"
              data-cy="new-password"
              :error="state.newPasswordOneError.hasError"
              :disabled="processing"
              class="bg-white mr-8 w-full"
              placeholder="Enter"
              input-type="password"
            />
            <div
              v-if="state.newPasswordOneError.hasError"
              class="text-miyamotoRed font-source text-xs pt-1.5 pl-4"
            >
              {{ state.newPasswordOneError.label }}
            </div>
          </div>

          <div class="pl-5 pr-6">
            <div class="font-source text-lg pb-3">
              Confirm Password
            </div>
            <TextInput
              v-model="newPasswordTwo"
              data-cy="confirm-password"
              :error="state.newPasswordTwoError.hasError"
              :disabled="processing"
              class="bg-white mr-8 w-full"
              placeholder="Enter"
              input-type="password"
            />
            <div
              v-if="state.newPasswordTwoError.hasError"
              class="text-miyamotoRed font-source text-xs pt-1.5 pl-4"
            >
              {{ state.newPasswordTwoError.label }}
            </div>
          </div>
          <div class="pl-5 pr-6 flex justify-center">
            <MainButton
              data-cy="submit-password"
              label="change"
              class="mt-7 mb-7 w-full"
              type="submit"
              :loading="processing"
              :disabled="processing"
            />
          </div>
        </div>
      </form>
    </div>
  </SignBaseModal>
</template>

<script setup lang="ts">

import type { PropType } from "vue"
import api from "../../../../api/api"
import type { RouteData } from "../../../base/ProfileModalManager.vue"

defineProps({ routeData: { type: Object as PropType<RouteData>, required: true } });

const emit = defineEmits(["close", "continue", "goBack"]);

const state = reactive({
  currentPassword: { hasError: false, label: "Incorrect Password" },
  newPasswordOneError: { hasError: false, label: "Password Is Empty" },
  newPasswordTwoError: { hasError: false, label: "Password Mismatch" },
});

const currentPassword = ref<string>("");
const newPasswordOne = ref<string>("");
const newPasswordTwo = ref<string>("");

function checkError(): void {
  let hasError = false
  state.currentPassword.hasError = currentPassword.value.length < 1
  hasError = hasError || state.currentPassword.hasError
  state.newPasswordOneError.hasError = newPasswordOne.value.length < 1
  hasError = hasError || state.newPasswordOneError.hasError
  state.newPasswordTwoError.hasError = newPasswordOne.value != newPasswordTwo.value
  hasError = hasError || state.newPasswordTwoError.hasError
  if (hasError) throw new Error("missing values")
}

const error = ref(false);
const processing = ref(false);

async function changePassword() {
  if (!processing.value) {
    try {
      checkError();
      processing.value = true;
      await api.changePassword({
        current: currentPassword.value,
        new: newPasswordOne.value,
      });
      emit("continue", 1);
    } catch (e) {
      error.value = true;
    } finally {
      processing.value = false;
    }
  }
}

</script>
