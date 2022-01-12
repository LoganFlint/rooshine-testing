<template>
  <div
    data-cy="admin-members-personal-info"
    class="border border-unicornSilver rounded-sm pt-10 px-7 h-auto min-w-96"
  >
    <div class="font-serif font-bold pb-7 text-xl">
      Personal Info
    </div>
    <div
      class="border-b border-unicornSilver pb-4 flex items-center justify-between"
    >
      <div class="font-source font-semibold">
        First Name
      </div>
      <div class="w-1/2">
        {{ state.firstName }}
      </div>
    </div>

    <div
      class="border-b border-unicornSilver py-4 flex items-center justify-between"
    >
      <div class="font-source font-semibold">
        Last Name
      </div>
      <div class="w-1/2">
        {{ state.lastName }}
      </div>
    </div>

    <div
      class="border-b border-unicornSilver py-4 flex items-center justify-between"
    >
      <div class="font-source font-semibold">
        Email
      </div>
      <div class="w-1/2">
        {{ state.user.email }}
      </div>
    </div>

    <div
      class="border-b border-unicornSilver py-4 flex items-center justify-between"
    >
      <div class="font-source font-semibold">
        Phone
      </div>
      <div class="w-1/2">
        {{ state.user.phone }}
      </div>
    </div>

    <div
      class="border-b border-unicornSilver py-4 flex items-center justify-between"
    >
      <div class="font-source font-semibold">
        Address
      </div>
      <div class="w-1/2">
        <div v-if="state.shippingAddress?.line1">
          {{ state.shippingAddress?.line1 }}
        </div>
        <div v-if="state.shippingAddress?.line2">
          {{ state.shippingAddress?.line2 }}
        </div> 
        {{ state.shippingAddress?.city }}
        {{ state.shippingAddress?.district }}
        {{ state.shippingAddress?.postalCode }} 
      </div>
    </div>

    <div>
      <div class="font-source font-semibold pt-4 pb-2">
        Notes
      </div>
      <div class="pr-14 leading-tight">
        This is the owner of Blue Barrel Infirmary located in
      </div>
    </div>
    <MainButton
      data-cy="member-deactivate"
      class="py-1 my-6"
      label="deactivate account"
      bg-color="outline"
      text-color="red"
      @click="deactivateAccount"
    />
  </div>
</template>

<script setup lang="ts">
  import { useRoute } from "vue-router";
  import api from "../../../../api/api";
  import type { User, ShippingAddress } from "../../../../api/user";
  const route = useRoute();

  function deactivateAccount() {
    console.log("clicked deactivateAccount");
  }

  const userId = route.params.userId.toString();

  onMounted(async () => {
    state.user = await api.getUserById(userId);
    let nameSplit = state.user.fullName.split(" ")
    state.firstName = nameSplit[0]
    state.lastName = nameSplit[1]
    state.shippingAddress = state.user.shippingAddress
  });

  const state = reactive({
    user: {} as User,
    firstName: "",
    lastName: "",
    shippingAddress: null as ShippingAddress | null
  });

</script>
