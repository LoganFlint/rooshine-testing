<template>
  <div
    v-for="(code, i) in modelValue"
    :key="i"
  >
    <input
      :key="i"
      :ref="itemRefs[i]"
      :value="code"
      type="number"
      :disabled="disabled"
      :class="[
        'mr-2 h-14 w-11 pl-5 bg-speedOfLight rounded outline-none',
        'border border-unicornSilver',
        'focus:border focus:border-black',
        { 'border-planetOfTheApes border': error },
      ]"
      @keydown="handleKeyPress($event, i)"
      @input="updateValue($event, i)"
    >
  </div>
</template>

<script setup lang="ts">

import type { PropType, Ref } from "vue"

const props = defineProps({
	modelValue: {
		type: (Array as PropType<string[]>) || Number,
		default: ["", "", "", "", "", ""],
	},
	/** used to focus button after Pin is typed in */
	buttonRef: {
		type: Object as PropType<HTMLButtonElement | null>,
		default: null,
	},
	error: Boolean,
	disabled: Boolean,
});

const emit = defineEmits(["update:modelValue"]);
const itemRefs: Array<Ref<Element | null>> = [];

props.modelValue.forEach(() => {
	itemRefs.push(ref<Element | null>(null))
})

const elAr: Array<HTMLInputElement | HTMLButtonElement> = []

onMounted(() => {
	itemRefs.forEach(elRef => {
		if (Array.isArray(elRef.value) && elRef.value.length > 0)
			elAr.push(elRef.value[0] as HTMLInputElement)
		else
			elAr.push(elRef.value as HTMLInputElement)
	})
	if (props.buttonRef)
		elAr[itemRefs.length] = props.buttonRef // fixes hot-reload not loading via watch below
	if (elAr.length > 0) {
		elAr[0].focus()
	}
})

watch(
	() => props.buttonRef,
	() => {
		if (props.buttonRef) elAr[itemRefs.length] = props.buttonRef
	})

function handleKeyPress(event: KeyboardEvent, index: number) {
	const inputElement: HTMLInputElement = event.target as HTMLInputElement
	if (event.key == "Enter" || event.key == "ArrowRight") { // enter or right arrow go right
		focusInput(index + 1)
		event.preventDefault()
	} else if (((event.key == "Backspace" || event.key == "ArrowLeft")
		&& (event.target as HTMLInputElement).value == "")
		|| (event.key == "ArrowLeft")) {  //empty with backspace OR left arrow, go to the left
		focusInput(index - 1)
		event.preventDefault()
	} else if ((event.key == "ArrowUp" || event.key == "ArrowDown") && (inputElement.value == "")) {
		inputElement.value = "0" // if it's blank, make it zero the first keypress
		const newModalValue = props.modelValue
		newModalValue[index] = inputElement.value
		emit("update:modelValue", newModalValue)
		inputElement.select()
		event.preventDefault()
	} else if (["-", "+", "."].includes(event.key)) {
		event.preventDefault()
	}
}

function focusInput(newIndex: number) {
	if (elAr[newIndex])
		elAr[newIndex].focus();
	if (newIndex > -1 && newIndex < itemRefs.length)
		(elAr[newIndex] as HTMLInputElement).select();
}

function updateValue(event: Event, index: number) {
	const inputElement: HTMLInputElement = event.target as HTMLInputElement
	let code = inputElement.value
	let selectText = false
	const newModalValue = props.modelValue

	if (code.length > 0 && newModalValue[index] === "") {
		focusInput(index + 1)
	} else { // if we're not moving to the next, select the text instead
		selectText = true
	}
	if (code === "-1") {
		code = "9"
	} else {
		// we keep the right-character, which allows them to type a new number, replacing the old one
		if (code.length > 1) {
			code = code.slice(1, 2)
		}
	}
	if (inputElement.value !== code) inputElement.value = code
	if (selectText) inputElement.select()
	newModalValue[index] = code
	emit("update:modelValue", newModalValue)
}

</script>

<style scoped>
/* Chrome, Safari, Edge, Opera */
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
	-webkit-appearance: none;
	margin: 0;
}

/* Firefox */
input[type="number"] {
	-moz-appearance: textfield;
}
</style>
