<template>
  <div class="w-full max-w-2xl">
    <div class="pb-10 flex flex-col items-center pt-12">
      <div class="font-serif font-bold text-xl">
        Where can we ship winning auctions?
      </div>
      <div class="font-source pt-2.5">
        Please fill out a valid shipping address below
      </div>
    </div>

    <form
      class="flex flex-col items-center font-source"
      data-cy="address-form"
      @submit.prevent="goToBilling"
    >
      <div class="w-full items-center flex flex-col">
        <div class="flex items-start w-full max-w-2xl">
          <div class="text-lg flex flex-col w-1/2 mr-8">
            Enter an address
            <TextInput
              v-model="state.address.line1"
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
              v-model="state.address.line2"
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
              v-model="state.address.city"
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
            <div class="text-lg">
              Enter a postal code
              <TextInput
                v-model="state.address.postalCode"
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
          <div class="text-lg flex flex-col w-1/2 mr-8">
            <div class="text-lg">
              State
              <SelectField
                v-model="state.address.district"
                dark
                class="mt-2"
                label="Choose a State *"
                :options-object="usStates"
              />
              <div
                v-if="state.errors.district.hasError"
                class="text-planetOfTheApes pt-1"
              >
                {{ state.errors.district.label }}
              </div>
            </div>
          </div>
          <div class="w-1/2">
            <div class="text-lg">
              Country
              <SelectField
                v-model="state.address.country"
                dark
                class="mt-2"
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

      <div class="flex flex-col justify-center items-center">
        <Checkbox
          class="mt-10"
          :checked="state.clicked"
          :disabled="processing"
          :error="state.deliveryAge.hasError"
          label="I certify I can receive delivery of spirits"
          type="submit"
          @update:checked="state.clicked = !state.clicked"
        />
        <div
          v-if="state.deliveryAge.hasError"
          class="text-center text-xs text-planetOfTheApes"
        >
          {{ state.deliveryAge.label }}
        </div>
      </div>

      <MainButton
        label="Continue"
        class="w-60 h-9 mt-8 mb-16"
        type="submit"
        :loading="processing"
        :disabled="processing"
      />
    </form>
  </div>
</template>

<script setup lang="ts">

import router from "../../router"
import api from "../../api/api"
import { countries } from "../../abbreviations/countries"
import { usStates } from "../../abbreviations/states"
import { isNumber } from "@vueuse/core"
import type { ShippingAddress } from '../../api/user'

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
}

const emit = defineEmits(["continue"]);

const state = reactive<{ clicked: boolean, deliveryAge: ErrorLabel, errors: RequiredFields, address: ShippingAddress }>({
  clicked: false,
  errors: {
    line1: { hasError: false, label: "Address is required" },
    city: { hasError: false, label: "City is required" },
    district: { hasError: false, label: "State is required" },
    country: { hasError: false, label: "Country is required" },
    postalCode: { hasError: false, label: "Postal Code is required" },
  },
  deliveryAge: { hasError: false, label: "This field is required" },
  address: {
    line1: "",
    line2: "",
    city: "",
    /** aka state */
    district: "",
    country: "",
    postalCode: "",
  }
})

const error = ref(false)
const processing = ref(false)

// TODO make sure postal code is a lngth of 5 and only numbers

function checkError() {
  let hasError = false
  state.deliveryAge.hasError = state.clicked === true
  hasError = state.deliveryAge.hasError
  state.errors.line1.hasError = state.address.line1.length < 1
  hasError = hasError || state.errors.line1.hasError
  state.errors.city.hasError = state.address.city.length < 1
  hasError = hasError || state.errors.city.hasError
  state.errors.country.hasError = state.address.country.length < 1
  hasError = hasError || state.errors.country.hasError

  if (!isNumber(state.address.postalCode) && !isNaN(Number.parseInt(state.address.postalCode))) {
    const postalCodeNum = Number.parseInt(state.address.postalCode)
    state.errors.postalCode.hasError = isNaN(postalCodeNum) || postalCodeNum <= 0
    state.address.postalCode = `${postalCodeNum}`
  } else {
    // it still might be a number
    state.errors.postalCode.hasError = !isNumber(state.address.postalCode)
  }
  if (hasError) throw new Error("missing values")
}

async function goToBilling() {
  if (!processing.value) {
    try {
      checkError();
      processing.value = true;
      await api.shipping(state.address);
      emit("continue");
      void router.push({ name: "register.billing" });
    } catch (e) {
      error.value = true
    } finally {
      processing.value = false
    }
  }
}

</script>
