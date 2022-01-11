<template>
  <img
    id="editremovedrop"
    class="w-5 h-5 cursor-pointer"
    src="../../../../assets/menu_select.svg"
    alt="payment method options"
    @click="$emit('update:modelValue', !modelValue)"
  >

  <DropDownMenu
    :is-open="modelValue"
    :options="options"
    @selected="handleEmit"
    @close="$emit('update:modelValue', false)"
  />
</template>

<script setup lang="ts">

import type { PaymentMenuOption } from '../../../../api/payments';

const props = defineProps({ modelValue: { type: Boolean, default: false }, isBank: { type: Boolean, default: false } });

const emit = defineEmits(["remove", "edit", "update:modelValue"]);

const options = [
  {
    name: "Edit",
    disabled: props.isBank ? true : null,
    message: props.isBank ? "Bank account details cannot be updated. Please remove and add a new bank account." : null
  },
  {
    name: "Remove",
  }
] as PaymentMenuOption[];

function handleEmit(selected: string): void {
  emit(selected == "Edit" ? "edit" : "remove");
}

</script>
