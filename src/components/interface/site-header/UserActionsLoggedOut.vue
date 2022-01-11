<template>
  <div class="flex items-center space-x-4">
    <router-link :to="{ name: 'signin' }">
      <MainButton
        label="sign in"
        bg-color="white"
        text-color="red"
      />
    </router-link>

    <MainButton
      label="sign up"
      bg-color="red"
      text-color="white"
      @click="rerouteTo('signup')"
    />
  </div>
</template>

<script setup lang ="ts">

import { useStore } from "../../../store";
import router from "../../../router";
import { onBeforeRouteUpdate } from "vue-router";

const emit = defineEmits(["loggedIn"]);

const store = useStore();

onBeforeRouteUpdate(() => {
  if (store.user.email !== "") emit("loggedIn");
});

async function rerouteTo(routeName: string): Promise<void> {
  await router.push({ name: routeName });
}

</script>
