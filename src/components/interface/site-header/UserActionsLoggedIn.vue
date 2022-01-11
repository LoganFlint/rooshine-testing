<template>
  <div class="flex">
    <img
      class="pr-5 cursor-pointer"
      src="../../../assets/search.svg"
      alt="search"
      @click="openSearchBar"
    >
    <Search       
      :is-open="showSearchBar"
      @close="closeSearchBar" 
    />
    <img
      src="../../../assets/user.svg"
      alt="user"
      class="pr-5 cursor-pointer"
      @click="openUserMenu"
    >

    <UserOptionDropdown
      :is-open="state.showUserOptions"
      :options="userOptions"
      @select-item="editMenuSelected"
      @close="handleOutside"
    />

    <div class="flex items-center bg-speedOfLight rounded-lg pr-4 py-2 mx-4 pr-8">
      <img
        class="pl-3.5"
        src="../../../assets/barrel.svg"
        alt="barrel"
      >
      <div class="mx-4 cursor-default">
        {{ walletBalance.toLocaleString(undefined, { maximumFractionDigits: 2 }) }}
      </div>
      <MainButton
        data-cy="wallet-button"
        label="wallet"
        bg-color="red"
        text-color="white"
        @click="rerouteTo('wallet')"
      />
    </div>
  </div>
</template>

<script setup lang ="ts">

import { useStore } from "../../../store";
import router from '../../../router';

const props = defineProps({
  walletBalance: { type: Number, default: 0 }
});

console.log("Wallet balance: ", props.walletBalance); 

const emit = defineEmits(["loggedOut"]);

const store = useStore();

const state = reactive({
  showUserOptions: false,
  logoutProcessing: false
});

const userOptions = {
  Profile: "Profile",
  Logout: "Logout",
};

async function rerouteTo(routeName: string): Promise<void> {
  await router.push({ name: routeName });
}

function openUserMenu() {
  state.showUserOptions = true;
}

function handleOutside() {
  state.showUserOptions = false;
}

async function editMenuSelected(selected: string) {
  state.showUserOptions = false;
  if (selected === 'Profile') {
    await router.push({ name: "profile" });
  }
  else if (selected === 'Logout') {
    await logout();
    await router.push({ name: "marketing" });
  }
}

async function logout() {
  state.logoutProcessing = true;
  emit("loggedOut");
  await store.logout().then(async () => {
    state.logoutProcessing = false;
    await router.push({ name: "marketing" });
  }).catch((error) => {
    console.warn(error);
  });
}

const showSearchBar = ref(false)

function openSearchBar() {
  showSearchBar.value = true
}

function closeSearchBar() {
    showSearchBar.value = false
}

</script>
