<template>
  <div class="relative">
    <div class="relative">
      <input
        :type="inputType"
        :placeholder="placeholder"
        :value="modelValue"
        :class="[
          'h-11 w-full pl-5 pr-5  font-source rounded bg-speedOfLight',
          'border border-unicornSilver focus:border-black focus:ring-0  placeholder-lunarRock focus:right-0 ',
          {
            'pl-10': email,
            'bg-white px-5 ': inputType === 'number',
            'pr-5': arrowRight,
            'pr-5': bidArrowRight,
            'placeholder-black': placeholderBold,
            'border border-vampireStateBuilding bg-opacity-5 bg-vampireStateBuilding': error,
            'pl-9': dollarSign,
            'bg-white py-[22px]': white,
            'pr-0': mnemonic,
            'border border-miyamotoRed': invalid,
            'pr-0': mnemonic,
            'pl-16': barrel,
            'text-planetOfTheApes focus:text-planetOfTheApes text-3xl text-center': mintBottles,

          },
        ]"
        v-bind="$attrs"
        :pattern="pattern"
        :min="minimumValue"
        :step="increment"
        @input="updateValue"
        @focus="state.focused = true"
        @blur="state.focused = false"
        @keydown="if($event.key === '.' && pattern === '[0-9]'){$event.preventDefault();}"
      >
      <div
        v-if="dollarSign"
        :class="[
          'absolute left-5 top-2.5',
          {
            'opacity-40': !state.focused,
            '': state.focused,
          },
        ]"
      >
        $
      </div>
      <img
        v-if="email"
        src="../../assets/envelope.svg"
        class="absolute h-3.5 left-4 top-4"
        alt="email"
      >
      <img
        v-if="arrowRight"
        src="../../assets/arrow_right_red.svg"
        class="absolute right-4 bottom-4"
        alt="Right Arrow"
      >
      <img
        v-if="bidArrowRight"
        src="../../assets/bid_arrow_right.svg"
        class="absolute right-4 bottom-4"
        alt="Right Bid Arrow"
      >
      <div
        v-if="placeBid"
        :class="[
          'absolute right-2 bottom-0 top-0 flex items-center placeholder-black',
          {
            'text-planetOfTheApes': red,
            '-bottom-0.5': !red,
          },
        ]"
      >
        {{ placeBidString }}
      </div>
      <img
        v-if="visa"
        src="../../assets/visa_input.png"
        alt="visa"
        class="absolute right-4 bottom-3"
      >
      <img
        v-if="barrel"
        src="../../assets/barrel.svg"
        alt="barrel"
        class="absolute left-6 bottom-3"
      >
    </div>
  </div>
  <div
    v-if="minBid"
    class="pt-2 font-source text-xs text-planetOfTheApes"
  >
    You must bid atleast: 8,050
  </div>
</template>

<script setup lang="ts">

import type { PropType } from "vue"

const props = defineProps({
  modelValue: { type: [String, Number] as PropType<string | number | null>, default: null },
  placeholder: { type: String, default: null },
  email: Boolean,
  inputType: { type: String, default: "text" },
  date: Boolean,
  arrowRight: Boolean,
  bidArrowRight: Boolean,
  placeBid: Boolean,
  placeBidString: { type: String, default: null, required: false },
  red: Boolean,
  error: Boolean,
  white: Boolean,
  placeholderBold: Boolean,
  dollarSign: Boolean,
  visa: Boolean,
  mnemonic: Boolean,
  invalid: Boolean,
  required: Boolean,
  minBid: Boolean,
  barrel: Boolean,
  mintBottles: Boolean,
  pattern: { type: String, default: null },
  minimumValue: { type: Number, default: null },
  increment: { type: Number, default: null }
});

const emit = defineEmits(["update:modelValue"]);

const state = reactive({
  focused: false,
})

//eslint-disable-next-line
//@ts-ignore
const isError = computed(() => { //eslint-disable-line
  if (props.required === true) return (`${props.modelValue}`).length < 1
  else return false
})

function updateValue(event: Event) {
  let value = (event.target as HTMLInputElement).value;
  if (props.placeBid || props.dollarSign) value = Number(value.replaceAll(",", "")).toLocaleString();
  emit("update:modelValue", value)
}


</script>

<style scoped>
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
