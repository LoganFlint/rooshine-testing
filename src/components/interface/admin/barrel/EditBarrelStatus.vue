<template>
  <div
    v-if="isOpen"
    class="fixed top-0 left-0 right-0 bottom-0"
    @click="close"
  />
  <div>
    <div
      :class="[
        'absolute rounded cursor pointer',
        {
          'opacity-100 translate-y-0 ': isOpen,
          'opacity-0 -translate-y-4 invisible': !isOpen,
        },
      ]"
      @click="close"
    >
      <div
        class="relative w-40 top-7 right-16 shadow-2xl py-1 transition-all duration-300 transform z-10 bg-white rounded"
      >
        <div class="text-center font-source font-semibold">
          Mark as:
        </div>
        <div
          v-for="(value, i) in Object.values(options)"
          :key="i"
          class="flex justify-center items-center py-3.5 cursor-pointer hover:bg-whiteSmoke"
          data-cy="barrel-status-option"
          @click="handleClickOption(i)"
        >
          <div class="flex flex-col w-28 text-center">
            <div
              :data-cy-barrel-status="value"
              :class="[
                'font-semibold py-2 px-5 rounded-full',
                {
                  'bg-coralBisque': value === 'denied',
                  'bg-wildPrimrose': value === 'approved',
                  'border border-wildPrimrose': value === 'requested',
                  'bg-mountainMint': value === 'delivered'
                },
              ]"
            >
              {{ `${value.charAt(0).toUpperCase() + value.slice(1)}` }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

const props = defineProps({
  modelValue: { type: String, default: "" },
  options: { type: Object, required: true },
  isOpen: { type: Boolean, default: false },
});

const emit = defineEmits(["selectItem", "close", "update:modelValue"]);

const state = reactive({
  indexOfSelected: 0,
})

const selected = ref()

function handleClickOption(i: number) {
  state.indexOfSelected = i
  selected.value = Object.values(props.options)[i]
  emit("selectItem", selected.value)
  emit("update:modelValue", selected.value)
}

function close() {
  emit("close")
}

</script>
