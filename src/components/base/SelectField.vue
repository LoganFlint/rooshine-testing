<template>
  <div>
    <div
      :class="[
        'w-full ',
        'appearance-none outline-none rounded',
        'flex flex-col justify-center',
        'letterspacing relative cursor-pointer',
        {
          'border border-planetOfTheApes': error,
          'opacity-50 cursor-not-allowed': disabled,
        },
      ]"
      :tabindex="0"
      @blur="state.showDropdown = false"
    >
      <div
        :class="[
          'flex items-center justify-between px-5 h-11',
          {
            'bg-speedOfLight border border-unicornSilver rounded ': dark,
            'bg-white ': !dark,
          },
        ]"
        @click="state.showDropdown = !state.showDropdown && !disabled"
      >
        <div
          :class="{ 'text-lunarRock': !modelValue }"
        >
          {{ (optionsObject ? optionsObject[modelValue] : modelValue) ?? label }}
        </div>

        <img
          src="../../assets/arrow_down.svg"
          class="w-3"
          alt="down arrow"
        >
      </div>
      <!-- Object as Options -->
      <div
        v-if="optionsObject"
        class="relative"
      >
        <div
          v-if="!mobile"
          :class="[
            'absolute mt-2 max-h-44',
            'transition-all duration-300 transform z-50 overflow-y-scroll',
            'bg-white rounded border border-planetOfTheApes',
            {
              'w-[280px] right-0': small,
              'w-80': !small,
              'opacity-100 translate-y-0 ': state.showDropdown,
              'opacity-0 -translate-y-4 invisible': !state.showDropdown,
            },
          ]"
        >
          <div
            v-for="(value, objKey) in optionsObject"
            :key="objKey"
            class="flex items-center py-1.5 px-5 transition-all duration-300 cursor-pointer"
            @click="handleClickOption(objKey)"
          >
            <div
              v-if="objKey === modelValue"
              class="text-black w-full"
            >
              {{ value }}
            </div>
            <div
              v-else
              class="w-full text-lunarRock hover:text-black w-64"
            >
              {{ value }}
            </div>
          </div>
        </div>
      </div>

      <!-- Array as Options -->
      <div
        v-else
        class="relative "
      >
        <div
          v-if="!mobile"
          :class="[
            'absolute mt-2 max-h-44',
            'transition-all duration-300 transform z-10 overflow-y-scroll',
            'bg-white rounded border border-planetOfTheApes w-full',
            {
              'opacity-100 translate-y-0 ': state.showDropdown,
              'w-[280px]': small,
              'w-80': !small,
              'opacity-0 -translate-y-4 invisible': !state.showDropdown,
            },
          ]"
        >
          <div
            v-for="(value, i) in options"
            :key="i"
            class="flex items-center py-1.5 px-5 transition-all duration-300 cursor-pointer"
            @click="handleClickOption(i)"
          >
            <div
              v-if="i === modelValue"
              class="text-black"
            >
              {{ value }}
            </div>
            <div
              v-else
              class="text-lunarRock hover:text-black w-64"
            >
              {{ value }}
            </div>
          </div>
        </div>
      </div>
      <!-- this only shows on a actual mobile device -->
      <select
        v-if="mobile"
        class="absolute top-0 right-0 left-0 bottom-0 w-full opacity-0"
        :value="modelValue"
        @change="handleChangeNativeSelect"
      >
        <option
          v-for="(value, i) in options"
          :key="i"
        >
          {{ value }}
        </option>
      </select>
    </div>
  </div>
</template>

<script setup lang="ts">

import type { PropType } from "vue";
import usePlatform from "../../hooks/platform";

const props = defineProps({
  modelValue: { type: String as PropType<string | number>, default: "" },
  options: { type: Object, default: () => ({}) },
  error: Boolean,
  label: { type: String, default: "" },
  optionsObject: { type: Object as PropType<{ [key: string]: string } | null>, default: null },
  dark: Boolean,
  disabled: Boolean,
  small: Boolean
});

const emit = defineEmits(["update:modelValue"]);
onMounted(async () => {
  mobile.value = await usePlatform()
})
const state = reactive({
  showDropdown: false,
})
const mobile = ref(false)
const selectedLabel = ref<string | number>(props.optionsObject ? props.optionsObject[props.modelValue] : props.modelValue)

function handleClickOption(key: number | string) {
  state.showDropdown = false
  if (props.optionsObject) {
    selectedLabel.value = props.optionsObject[key]
    emit("update:modelValue", key)
  } else {
    selectedLabel.value = props.options[key as number]
    emit("update:modelValue", selectedLabel.value)
  }
}

function handleChangeNativeSelect(event: Event) {
  const value = (event.target as HTMLSelectElement).value
  const index = Object.keys(props.options).findIndex(option => option === value)
  handleClickOption(index)
}

</script>
