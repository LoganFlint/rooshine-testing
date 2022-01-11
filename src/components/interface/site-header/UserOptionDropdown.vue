<template>
  <div
    v-if="isOpen"
    class="fixed top-0 left-0 right-0 bottom-0"
    @click="close"
  />
  <div>
    <div
      :class="[
        'transition-all duration-300 absolute rounded cursor pointer z-50',
        {
          'opacity-100 translate-y-0 ': isOpen,
          'opacity-0 -translate-y-4 invisible': !isOpen,
        },
      ]"
      @click="close"
    >
      <div class="relative w-32 -bottom-12 -left-32 z-50  shadow-2xl py-1 transition-all duration-300 transform  bg-white rounded">
        <div
          v-for="(value, i) in Object.values(options)"
          :key="i"
          :data-cy-option="value"
          class="flex items-center py-3.5 pl-5 cursor-pointer hover:bg-whiteSmoke"
          @click="handleClickOption(i)"
        >
          <div class="flex flex-col mr-10">
            <div class="font-semibold">
              {{ value }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from "vue"
export default defineComponent({
	props: {
		modelValue: { type: String, default: null },
		options: { type: Object, required: true },
		isOpen: { type: Boolean, default: false },
	},
	emits: ["selectItem", "close"],
	setup(props, { emit }) {
		const state = reactive({
			indexOfSelected: 0,
		})
		const selected = ref()
		function handleClickOption(i: number) {
			state.indexOfSelected = i
			selected.value = Object.values(props.options)[i]
			emit("selectItem", selected.value)
		}

		function close() {
			emit("close")
		}

		return {
			handleClickOption,
			close,
		}
	},
})
</script>
