<template>
  <div
    v-if="isOpen"
    class="fixed top-0 left-0 right-0 bottom-0"
    @click="$emit('close')"
  />
  <div>
    <div
      :class="[
        'absolute rounded cursor pointer transition-all duration-300',
        {
          'opacity-100 translate-y-0 ': isOpen,
          'opacity-0 -translate-y-4 invisible': !isOpen,
        },
      ]"
      @click="$emit('close')"
    >
      <div class="relative w-32 top-1 right-32 shadow-2xl py-1 transform z-10 bg-white rounded">
        <div
          v-for="(option, i) in options"
          :key="i"
          class="transition-all duration-300 flex items-center py-3.5 pl-5 cursor-pointer hover:bg-whiteSmoke"
          :class="{
            'text-americanSilver': option.disabled
          }"
          @mouseover="state.showMessage[i] = true"
          @mouseleave="state.showMessage[i] = false"
          @click="handleClickOption(i)"
        >
          <div class="flex flex-col mr-10">
            <div class="font-semibold">
              {{ option.name }}
            </div>
          </div>
          <div
            v-if="option.message"
            class="transition-all duration-300 bg-white text-xs text-planetOfTheApes absolute ml-28 w-64 p-4 leading-1 rounded drop-shadow-xl"
            :class="{
              'opacity-100': state.showMessage[i],
              'opacity-0': !state.showMessage[i]
            }"
          >
            {{ option.message }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import type { PropType } from "vue";
import type { PaymentMenuOption } from "../../api/payments";

const props = defineProps({
  modelValue: { type: String, default: null },
  options: { type: Object as PropType<Array<PaymentMenuOption>>, required: true },
  isOpen: { type: Boolean, default: false },
});

const emit = defineEmits(["selected", "close"]);

const state = reactive({
    showMessage: [] as boolean []
});

onMounted(() => {
    for(let i = 0; i < props.options.length; i++) {
        state.showMessage.push(false);
    }
});

function handleClickOption(i: number) {
  if(!props.options[i].disabled) emit("selected", props.options[i].name);
}

</script>