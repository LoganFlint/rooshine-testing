<template>
  <SignBaseModal
    blur
    :is-open="isOpen"
    @close="closeModal"
  >
    <div class="ml-20 pt-20 flex flex-col">
      <div class="w-[469px] mr-80">
        <div class="font-serif font-bold text-5xl">
          Welcome to the club
        </div>
        <div class="pt-4 font-source text-2xl">
          A receipt for your registration fee has been
          <br>sent to
          <span class="italic">{{ email }}</span>
        </div>
      </div>
      <div class="pt-11">
        <div class="font-serif text-xl pb-4">
          Here are some recommended next steps...
        </div>
        <div class="flex justify-between pr-20">
          <WelcomeModalStep
            :image="wallet"
            color="red"
            title="Setup your wallet"
            body="To participate in an auction, you’ll need to set up a wallet to hold ISV tokens."
            label="get started"
            @click="rerouteTo('user-wallet-setup')"
          />
          <WelcomeModalStep
            :image="gavel"
            color="gray"
            title="Browse a live or past auction"
            body="Start viewing the goods."
            label="browse"
            @click="rerouteTo('live.auction')"
          />
          <WelcomeModalStep
            :image="bottle"
            color="gray"
            title="Learn more about buying and selling"
            body="Need more information? View our guide on using Rooshine."
            label="view"
            @click="rerouteTo('sell')"
          />
        </div>
        <div class="text-center pb-12">
          <router-link
            class="font-source underline text-xs font-semibold"
            :to="{ name: 'profile' }"
            @click="rerouteTo('profile')"
          >
            SKIP FOR NOW
          </router-link>
        </div>
      </div>
    </div>
  </SignBaseModal>
</template>

<script setup lang="ts">

import { useStore } from "../../../store";
import router from "../../../router"

import wallet from "../../../assets/wallet.svg"
import gavel from "../../../assets/gavel.svg"
import bottle from "../../../assets/bottle_drink.svg"

defineProps({ isOpen: Boolean });

const emit = defineEmits(["close"]);

const store = useStore();

const email = computed(() => {
  return store.user.email;
});

async function closeModal(): Promise<void> {
  emit("close");
  await rerouteTo("marketing");
}

async function rerouteTo(routeName: string): Promise<void> {
  await router.push({ name: routeName });
}

</script>
