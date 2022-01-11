<template>
  <div class="h-auto rounded border border-unicornSilver pt-9 pl-10 pr-12">
    <div
      v-if="profile"
      class="font-serif font-bold text-2xl pb-8"
    >
      Account Info
    </div>

    <div
      v-if="addressIsBlank(modelValue)"
      class="mb-5"
    >
      No Address
    </div>
    <div
      v-else
      class="mb-5"
    >
      <div>{{ modelValue.fullName }}</div>
      <div>{{ modelValue.shippingAddress.line1 }},</div>
      <div>{{ modelValue.shippingAddress.line2 }}</div>
      <div>
        {{ modelValue.shippingAddress.city }}, {{ modelValue.shippingAddress.district }}
        {{ modelValue.shippingAddress.postalCode }}
      </div>
    </div>

    <div class="mb-7">
      <div>{{ modelValue.email }}</div>
      <div>{{ formatPhone(modelValue.phone) }}</div>
    </div>

    <div
      v-if="profile"
      class="flex pb-6"
    >
      <MainButton
        class="py-1.5 mr-3"
        label="edit"
        text-color="red"
        bg-color="outline"
        @click="openUpdateUser"
      />

      <MainButton
        class="py-1.5"
        label="change password"
        text-color="red"
        bg-color="outline"
        @click="$emit('changePassword')"
      />
    </div>

    <MainButton
      v-else
      class="py-1.5"
      label="edit"
      text-color="red"
      bg-color="outline"
      @click="openUpdateUser"
    />
    <EditUserModal
      v-model="state.user"
      :is-open="showUpdateUser"
      @update:modelValue="updateUser"
      @close="showUpdateUser = false"
    />
  </div>
</template>

<script setup lang="ts">

import type { PropType } from "vue"
import type { User } from "../../../api/user"
import { createEmptyUser } from '../../../api/modules/user'

const props = defineProps({
  modelValue: {
    type: Object as PropType<User>,
    default: createEmptyUser(),
  },
  profile: Boolean,
});

const emit = defineEmits(["close", "changePassword", "update:modelValue"]);

const state = reactive({
  user: props.modelValue,
})

const showUpdateUser = ref(false)

function openUpdateUser() {
  state.user = props.modelValue // updated the user data upon opening the modal
  showUpdateUser.value = true
}

function addressIsBlank(user: User) {
  return (
    [
      user.fullName,
      user.shippingAddress.line1,
      user.shippingAddress.line2,
      user.shippingAddress.city,
      user.shippingAddress.district,
      user.shippingAddress.postalCode,
    ].join("") == ""
  )
}

function updateUser(user: User) {
  showUpdateUser.value = false
  emit("update:modelValue", user)
}

function formatPhone(phoneNum: string) {
  if (phoneNum.length > 9) return "(" + phoneNum.slice(0, 3) + ") " + phoneNum.slice(3, 6) + "-" + phoneNum.slice(6)
  else return phoneNum
}

</script>
