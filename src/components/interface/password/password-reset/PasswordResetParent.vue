<template>
  <div class="bg-granite h-screen w-screen">
    <router-view
      :user-email="userEmail"
      @continue="continueToNextStep"
      @close="close"
    />
  </div>
</template>

<script setup lang="ts">

import router from "../../../../router";

defineProps({ userEmail: { type: String, default: "" } });
defineEmits(["close"]);
const routes = ["reset.password.email", "reset.password.checkemail", "reset.password.verify", "reset.password.newpassword"]

async function close() {
	await router.push({ name: "marketing" })
}

async function continueToNextStep(email: string, fromStep: string) {
	const currentIndex = routes.indexOf(fromStep)
	await router.push({
		name: routes[currentIndex + 1],
		params: {
			userEmail: email,
		},
	})
}

</script>
