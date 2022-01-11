<template>
  <header class="flex justify-between items-center py-6 px-10">
    <img
      class="mr-10 cursor-pointer"
      width="145"
      alt="rooshine logo"
      src="../../../assets/rooshine_logo.png"
      @click="router.push({ name: 'marketing' })"
    >
    <nav
      class="transition-all duration-300 text-lg space-x-7 flex w-full"
      :class="{
        'opacity-100': !state.hideActions,
        'opacity-0 invisible': state.hideActions
      }"
    >
      <SiteHeaderNavLinks
        class="mt-4 w-3/4"
        :class="{
          'opacity-100': state.loggedIn,
          'opacity-0 invisible': !state.loggedIn
        }"
      />

      <UserActions
        v-model="state.loggedIn"
      />
    </nav>
  </header>
  <div
    v-if="state.loggedIn"
    class="border-b border-unicornSilver"
  />
  <router-view name="navbarModal" />
</template>

<script setup lang="ts">

import { onBeforeRouteUpdate, useRoute } from "vue-router"
import { useStore } from "../../../store";
import router from "../../../router";

const store = useStore();

const state = reactive({
  logoutProcessing: false,
  showUserOptions: false,
  loggedIn: store.user.email !== "",
  walletBalance: null as null | number,
  hideActions: false
});

watch(() => store.user.email, () => {
  if(store.user.userId == "") state.loggedIn = false;
  else state.loggedIn = true;
});

onMounted(() => {
  const route = useRoute();
  state.hideActions = route.name?.toString().includes("register") ?? false;
});

onBeforeRouteUpdate((to, from, next) => {
  if(to.name?.toString().includes("register")) state.hideActions = true;
  else if(from.name?.toString() === "register.finalize") {
    next({ name: "register" });
    return;
  }
  else state.hideActions = false;
  next();
});

</script>
