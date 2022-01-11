<template>
  <UserActionsLoggedIn
    v-if="modelValue"
    @logged-out="$emit('update:modelValue', false)"
  />
  <UserActionsLoggedOut
    v-if="!modelValue"
    @logged-in="$emit('update:modelValue', true)"
  />
</template>

<script setup lang="ts">

const props = defineProps({
    modelValue: { type: Boolean, default: false }
});

defineEmits(["update:modelValue"]);

const state = reactive({
    loggedIn: props.modelValue
});

watch(() => props.modelValue, () => {
    state.loggedIn = props.modelValue;
});

</script>