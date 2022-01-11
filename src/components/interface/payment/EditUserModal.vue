<template>
  <SignBaseModal
    no-close
    :is-open="isOpen"
    @close="close"
  >
    <div
      v-if="localUser"
      class="max-h-screen max-w-lg px-5"
    >
      <div class="pl-5 pt-7 pb-5 font-serif font-bold text-2xl">
        Edit your information
      </div>
      <form
        class="flex flex-col font-source h-96 pr-5 overflow-y-scroll"
        @submit.prevent="submitNewUserData"
      >
        <div class="flex flex-col">
          <div class="items-center flex flex-col">
            <div class="w-full flex">
              <div class="text-lg flex flex-col w-1/2 mr-8">
                What’s your name?
                <TextInput
                  v-model="localUser.fullName"
                  placeholder="Full Name"
                  :error="state.errors.fullName.hasError"
                  :disabled="processing"
                  autocomplete="off"
                  input-type="text"
                />
              </div>
              <div class="text-lg w-1/2">
                <div class="h-7" />
                <TextInput
                  v-model="localUser.displayName"
                  :error="state.errors.displayName.hasError"
                  :disabled="processing"
                  autocomplete="off"
                  input-type="text"
                  placeholder="Display Name"
                />
              </div>
            </div>
          </div>

          <div class="flex flex-col items-start pt-7 text-lg w-1/2">
            Phone Number
            <TextInput
              v-model="localUser.phone"
              :error="state.errors.phone.hasError"
              :disabled="processing"
              class="mt-1"
              autocomplete="off"
              input-type="text"
              placeholder="Phone Number"
            />
          </div>

          <div class="w-full items-center flex flex-col pt-7">
            <div class="flex items-start w-full max-w-2xl">
              <div class="text-lg flex flex-col w-1/2 mr-8">
                Enter an address
                <TextInput
                  v-model="localUser.shippingAddress.line1"
                  :error="state.errors.line1.hasError"
                  :disabled="processing"
                  class="mt-1"
                  placeholder="Address 1 *"
                />
                <div
                  v-if="state.errors.line1.hasError"
                  class="text-planetOfTheApes pt-1"
                >
                  {{ state.errors.line1.label }}
                </div>
              </div>
              <div class="w-1/2">
                <div class="h-9" />
                <TextInput
                  v-model="localUser.shippingAddress.line2"
                  placeholder="Address 2 *"
                />
              </div>
            </div>
          </div>

          <div class="w-full items-center flex flex-col pt-7">
            <div class="flex items-start w-full max-w-2xl">
              <div class="text-lg flex flex-col w-1/2 mr-8">
                City
                <TextInput
                  v-model="localUser.shippingAddress.city"
                  :error="state.errors.city.hasError"
                  :disabled="processing"
                  class="mt-1"
                  placeholder="Enter a City *"
                />
                <div
                  v-if="state.errors.city.hasError"
                  class="text-planetOfTheApes pt-1"
                >
                  {{ state.errors.city.label }}
                </div>
              </div>
              <div class="w-1/2">
                State
                <SelectField
                  v-model="localUser.shippingAddress.district"
                  :error="state.errors.district.hasError"
                  :disabled="processing"
                  dark
                  :class="['mt-2', { 'mb-8': !state.errors.district.hasError }]"
                  label="Choose a State *"
                  :options-object="usStates"
                />
                <div
                  v-if="state.errors.city.hasError"
                  class="text-planetOfTheApes pt-1"
                >
                  {{ state.errors.city.label }}
                </div>
              </div>
            </div>
          </div>

          <div class="w-full items-center flex flex-col pt-7">
            <div class="flex items-start w-full max-w-2xl">
              <div class="text-lg flex flex-col w-1/2 mr-8">
                <div class="text-lg">
                  Enter a postal code
                  <TextInput
                    v-model="localUser.shippingAddress.postalCode"
                    :error="state.errors.postalCode.hasError"
                    :disabled="processing"
                    class="mt-1"
                    placeholder="Postcode/Zip"
                    maxlength="5"
                  />
                  <div
                    v-if="state.errors.postalCode.hasError"
                    class="text-planetOfTheApes pt-1"
                  >
                    {{ state.errors.postalCode.label }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="w-full items-center flex flex-col pt-7">
            <div class="flex items-start w-full max-w-2xl">
              <div class="text-lg flex flex-col w-full">
                <div class="text-lg pb-6">
                  Country
                  <SelectField
                    v-model="localUser.shippingAddress.country"
                    :error="state.errors.country.hasError"
                    :disabled="processing"
                    dark
                    :class="['mt-2', { 'mb-8': !state.errors.country.hasError }]"
                    label="Choose a Country *"
                    :options-object="countries"
                  />
                  <div
                    v-if="state.errors.country.hasError"
                    class="text-planetOfTheApes pt-1"
                  >
                    {{ state.errors.country.label }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gradient-to-t h-7 from-black opacity-20" />
        </div>

        <div class="bg-white flex flex-col justify-center py-5 w-full absolute bottom-0 left-0">
          <MainButton
            class="mx-5"
            label="update"
            bg-color="red"
            text-color="white"
            type="submit"
            :loading="processing"
            :disabled="processing || submitDisabled"
          />
        </div>
      </form>
    </div>
  </SignBaseModal>
</template>

<script setup lang="ts">

import { isNumber } from "@vueuse/core";
import type { PropType } from "vue";
import { countries } from "../../../abbreviations/countries";
import { usStates } from "../../../abbreviations/states";
import type { User } from "../../../api/user";
import api from "../../../api/api";

interface ErrorLabel {
  hasError: boolean
  label: string
}

interface RequiredFields {
  line1: ErrorLabel
  city: ErrorLabel
  district: ErrorLabel
  country: ErrorLabel
  postalCode: ErrorLabel
  fullName: ErrorLabel
  displayName: ErrorLabel
  phone: ErrorLabel
}

const props = defineProps({
  isOpen: Boolean,
  modelValue: { type: Object as PropType<User>, required: true },
});

const emit = defineEmits(["close", "update:modelValue"]);
watch(
  () => props.isOpen,
  () => {
    if (props.isOpen) {
      // made a local copy of user data
      localUser.value = { ...props.modelValue } // remove reactivity from the User object
      localUser.value.shippingAddress = {
        ...props.modelValue.shippingAddress,
      } // we have to copy this separate, otherwise it will link!
    }
  }
)

const state = reactive<{ errors: RequiredFields }>({
  errors: {
    line1: { hasError: false, label: "Address is required" },
    city: { hasError: false, label: "City is required" },
    country: { hasError: false, label: "Country is required" },
    district: { hasError: false, label: "State is required" },
    postalCode: { hasError: false, label: "Postal Code is required" },
    fullName: { hasError: false, label: "fullName required" },
    displayName: { hasError: false, label: "displayName is required" },
    phone: { hasError: false, label: "phone number is required" },
  },
})

const localUser = ref<User>({ ...props.modelValue })

const submitDisabled = computed(
  () =>
    localUser.value.fullName.length < 1 ||
    localUser.value.displayName.length < 1 ||
    localUser.value.phone.length < 1 ||
    localUser.value.shippingAddress.line1.length < 1 ||
    localUser.value.shippingAddress.city.length < 1 ||
    localUser.value.shippingAddress.country.length < 1
)

function checkError() {
  let hasError = false

  state.errors.fullName.hasError = localUser.value.fullName.length < 1
  hasError = hasError || state.errors.fullName.hasError
  state.errors.displayName.hasError = localUser.value.displayName.length < 1
  hasError = hasError || state.errors.displayName.hasError
  state.errors.phone.hasError = localUser.value.phone.length < 1
  hasError = hasError || state.errors.phone.hasError

  state.errors.line1.hasError = localUser.value.shippingAddress.line1.length < 1
  hasError = hasError || state.errors.line1.hasError
  state.errors.city.hasError = localUser.value.shippingAddress.city.length < 1
  hasError = hasError || state.errors.city.hasError
  state.errors.country.hasError = localUser.value.shippingAddress.country.length < 1
  hasError = hasError || state.errors.country.hasError

  if (!isNumber(localUser.value.shippingAddress.postalCode) && !isNaN(Number.parseInt(localUser.value.shippingAddress.postalCode))) {
    const postalCodeNum = Number.parseInt(localUser.value.shippingAddress.postalCode)
    state.errors.postalCode.hasError = isNaN(postalCodeNum) || postalCodeNum <= 0
    localUser.value.shippingAddress.postalCode = `${postalCodeNum}`
  } else {
    // it still might be a number
    state.errors.postalCode.hasError = !isNumber(localUser.value.shippingAddress.postalCode)
  }

  if (hasError) throw new Error("missing values")
}

function close() {
  emit("close")
}

const processing = ref(false)

async function submitNewUserData() {
  if (!processing.value) {
    try {
      checkError()
      processing.value = true
      localUser.value = await api.updateCurrentUser(localUser.value as User)
      emit("update:modelValue", localUser.value)
      close()
    } catch (e) {
      console.error("Error:", e)
    }
    processing.value = false
  }
}

</script>
