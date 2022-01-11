<template>
  <SignBaseModal
    no-close
    :is-open="isOpen"
    @close="closeModal"
  >
    <div class="rounded rounded-t pt-8 max-w-md">
      <div
        class="px-7 flex items-center pb-7"
        @click="closeModal"
      >
        <img
          src="../../../../assets/arrow_left.svg"
          alt="arrow left"
        >
        <div class="pl-6 font-serif font-bold text-2xl">
          Edit Payment Method
        </div>
      </div>
      <div class="px-7 max-h-[420px] overflow-y-scroll overflow-x-hidden">
        <div class="font-source font-semibold text-sm pb-5 pt-1">
          PAYMENT METHOD
        </div>
        <div class="flex items-center pb-10">
          <img
            class="w-14 h-11"
            src="../../../../assets/cards.svg"
            alt="cards"
          >
          <div class="pl-4">
            <div class="font-source font-bold">
              {{ cardType }}
            </div>
            <div class="text-sm font-source">
              Card ending in {{ lastFour }}
            </div>
          </div>
        </div>

        <div class="flex pb-5 items-center">
          <DateInput
            v-model="state.payInfo.expiration"
            class="bg-white mr-3.5 w-full"
            placeholder="MM/YYYY"
            :required="true"
          />
          <Checkbox
            label="Set as default"
            class="font-source text-sm w-full"
            @update:modelValue="state.clicked = !state.clicked"
          />
        </div>

        <div class="font-source font-semibold text-sm pb-5">
          BILLING ADDRESS
        </div>
        <SelectField
          v-model="state.payInfo.country"
          class="h-11 border border-unicornSilver"
          label="Country"
          :options-object="countries"
        />
        <TextInput
          v-model="state.payInfo.address"
          class="w-full bg-white mt-5 mb-5"
          placeholder="Address Line 1"
          :required="true"
        />

        <div class="flex flex-shrink pb-10">
          <TextInput
            v-model="state.payInfo.zipCode"
            class="bg-white mr-4 w-40"
            placeholder="Postcode/Zip"
            :required="true"
          />

          <SelectField
            v-model="state.payInfo.state"
            class="border w-full border-unicornSilver"
            label="State"
            :options-object="usStates"
          />
        </div>
        <TextInput
          v-model="state.payInfo.city"
          class="w-full bg-white mb-5 mr-4"
          placeholder="Enter A City"
          :required="true"
        />
      </div>
      <div class="bg-gradient-to-t h-7 from-black opacity-20" />

      <div class="pt-4 pb-4 px-5 relative z-30 rounded-b">
        <MainButton
          class="w-full"
          label="save"
          bg-color="red"
          text-color="white"
          :disabled="!isError"
          @click="save"
        />
      </div>
    </div>
  </SignBaseModal>
</template>

<script setup lang="ts">

import { countries } from "../../../../abbreviations/countries";
import { usStates } from "../../../../abbreviations/states";
import type { PropType } from "vue";
import type { PayInfo } from "../../../../api/payments";

const props = defineProps({
    cardType: { type: String, default: "" },
    lastFour: { type: String, default: "0000" },
    isOpen: { type: Boolean },
    modelValue: { type: Object as PropType<PayInfo>, required: true }
});

const emit = defineEmits(["goBack", "close", "save", "update:modelValue"]);

const state = reactive({
    disabled: false,
    clicked: false,
    payInfo: { ...props.modelValue },
});

const isError = computed(() => {
    return (
        state.payInfo.expiration?.length > 0 &&
        state.payInfo.address?.length > 0 &&
        state.payInfo.zipCode?.length > 0 &&
        state.payInfo.city?.length > 0 &&
        state.payInfo.state?.length > 0 &&
        state.payInfo.country?.length > 0
    )
})

watch(
    () => props.isOpen,
    () => {
        state.payInfo = { ...props.modelValue }
    }
)

function save(): void {
    emit("update:modelValue", state.payInfo, state.clicked)
}

function closeModal(): void {
    save();
    emit("close");
}

</script>