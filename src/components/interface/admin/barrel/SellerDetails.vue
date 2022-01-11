<template>
  <div> 
    <div class="mt-7 border border-unicornSilver rounded py-7 pl-7 pr-8">
      <div class="font-serif font-bold text-xl pb-5">
        Seller
      </div>
      <div>
        <div class="pb-1">
          {{ userName }}
        </div>
        <div class="flex pb-1">
          <img
            src="../../../../assets/envelope.svg"
            alt="envelope"
          > 
          <a
            :href="fullEmailLink"
            class="underline font-source pl-2"
          >{{ userEmail }}</a>
        </div>
        <div class="flex">
          <img
            src="../../../../assets/phone.svg"
            alt="phone"
          > 
          <a
            :href="fullPhoneLink"
            class="underline font-source pl-1"
          >{{ userPhone }} </a>
        </div>
      </div>
      <MainButton          
        class="py-2 w-full mt-5 mb-7"
        label="view account"
        bg-color="outline"
        text-color="red"
        @click="viewAccount"
      />

      <div class="w-80 h-0.5 bg-unicornSilver" />
          
      <div class="pt-4">
        <div class="font-source font-semibold pb-4">
          Notes
        </div>
        <div class="bg-speedOfLight rounded p-4 font-source text-sm">
          {{ notes }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

const props = defineProps({
  userName: { type: String, default: "Brandon Salindo" },
  userEmail: { type: String, default: "brandon@theloyalsdesign.com" },
  userPhone: { type: String, default: "(530) 201-1227" },   
  notes: {type: String, default: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."}   
});

const state = reactive({
  userEmail: props.userEmail,
  userPhone: props.userPhone
})
const mailto = "mailto:"
const fullEmailLink = `${mailto}${state.userEmail}`

const telClick = "tel:"
const fullPhoneLink = `${telClick}${state.userPhone}`

function viewAccount() {
  console.log("clicked viewAccount")
}

</script>
