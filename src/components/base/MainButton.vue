<template>
  <button
    v-if="round"
    ref="buttonRef"
    class="p-5 rounded-full text-white bg-planetOfTheApes"
  >
    <img
      v-if="arrowRight"
      :src="right"
      class="w-5 h-5"
      alt="right arrow"
    >
  </button>
  <button
    v-else-if="loading"
    ref="buttonRef"
    :class="[
      'text-center flex items-center tracking-wider justify-center py-3 bg-planetOfTheApes text-xs rounded font-source font-semibold whitespace-nowrap',
      {
        'uppercase': uppercase,
        'opacity-50 cursor-not-allowed': disabled,
        'pt-3': loading && label !== 'sign out',
        'border bg-transparent': bgColor == 'outline',
        'text-white': bgColor !== 'outline',
        'text-planetOfTheApes': textColor === 'red',
      },
    ]"
  >
    {{ label }}
    <div class="relative w-0">
      <div
        :class="[
          'absolute left-0 -top-3.5 w-7 h-7',
          {
            '-left-2': label == 'sign out'
          },
        ]"
      >
        <Spinner :red="bgColor == 'outline'" />
      </div>
    </div>
  </button>
  <button
    v-else
    ref="buttonRef"
    :class="[
      (customPx ? '' : 'px-5 ') + 'py-3 tracking-wider flex items-center text-xs rounded font-source font-semibold whitespace-nowrap',
      {
        'uppercase': uppercase,
        'text-planetOfTheApes': textColor === 'red',
        'text-white': textColor === 'white',
        'text-unicornSilver': textColor === 'silver',
        'px-10 tracking-wider text-lg': large,
        'px-20 font-semibold text-xs': xlarge,
        'bg-white': bgColor === 'white',
        'bg-unicornSilver border border-unicornSilver': bgColor === 'silver',
        'bg-black': bgColor === 'black',
        'bg-speedOfLight': bgColor === 'speed',
        'bg-planetOfTheApes': bgColor === 'red',
        'border bg-transparent': bgColor === 'outline',
        'opacity-50 cursor-not-allowed': disabled,
        'cursor-not-allowed': disabledBid,
      },
    ]"
  >
    <div class="w-0">
      <slot name="start" />
    </div>
    <div class="w-full">
      <slot name="middle" />
      {{ label }}
    </div>
    <div class="w-0">
      <slot name="end" />
    </div>
  </button>
</template>

<script setup lang="ts">

import right from "../../assets/arrow_right.svg";

defineProps({
  label: { type: String, default: "" },
  bgColor: { type: String, default: "red" },
  textColor: { type: String, default: "white" },
  disabled: { type: Boolean, default: false },
  uppercase: { type: Boolean, default: true },
  large: Boolean,
  xlarge: Boolean,
  customPx: Boolean,
  arrowRight: Boolean,
  round: Boolean,
  disabledBid: Boolean,
  loading: Boolean,
});

const emit = defineEmits(["buttonRef"]);

const buttonRef = ref<HTMLButtonElement | null>()

onMounted(() => {
  emit("buttonRef", buttonRef.value)
})

</script>
