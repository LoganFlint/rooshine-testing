<template>
  <div class="flex flex-col justify-center items-center">
    <div
      class="transition-all duration-300 text-planetOfTheApes pb-4"
      :class="{
        'opacity-100': error,
        'opacity-0 invisible': !error
      }"
    >
      One or more words are incorrect.
    </div>
    <div
      :class="[
        'w-96 bg-speedOfLight grid grid-cols-3 gap-x-1 gap-y-1 pl-8 pb-3',
        {
          'border border-planetOfTheApes': error,
        },
      ]"
    >
      <div
        v-for="i in 12"
        :key="i"
        class="flex items-center"
      >
        <label
          :class="[
            {
              'font-semibold': boldFont,
              'font-light': !boldFont,
            },
          ]"
        >{{ i.toString().padStart(2, "\u{00A0}") }}.</label>
        <TextInput
          :id="`${i}`"
          mnemonic
          :value="modelValue[i - 1] ?? '---'"
          :name="`word:${i}`"
          :class="[
            'my-1 rounded-none w-20',
            {
              'font-semibold': boldFont,
              'font-light': !boldFont,
          
              'border-t-0 border-r-0 border-l-0': border,
              'border-none': !border,
            },
          ]"
          :disabled="disabled"
          :readonly="readOnly"
          @input="handleInput(i, $event)"
          @focus="handleFocus(i, $event)"
          @blur="handleBlur(i)"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from "vue"

const props = defineProps({
  modelValue: { type: Array as PropType<string[]>, default: [] as Array<string> },
  error: { type: Boolean, default: false },
  readOnly: { type: Boolean, default: false },
  boldFont: Boolean,
  border: Boolean,
  disabled: Boolean,
})

const emit = defineEmits(["update:modelValue"]);

const focused = ref<number | null>(null);

function handleFocus(index: number, event: Event) {
  focused.value = index

  if (props.readOnly) {
    (event.target as HTMLInputElement).select()
  }
}

function handleBlur(index: number) {
  focused.value = index
}

function handleInput(index: number, event: Event) {
  const newValue = props.modelValue.slice()
  newValue[index - 1] = (event.target as HTMLInputElement).value
  emit("update:modelValue", newValue)
}

</script>
