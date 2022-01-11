<template>
  <SignBaseModal
    blur
    no-close
    :is-open="true"
  >
    <div class="pt-9 bg-planetOfTheApes px-20 ">
      <img
        class="mx-auto w-[76px] h-[76px]"
        src="../../../assets/white_barrel.svg"
        alt=""
      >
      <div class="font-serif font-bold text-2xl text-center text-white py-5">
        There Was an error with <br> your ISV purchase
      </div>

      <MainButton       
        class="py-1 w-full mb-14"
        label="back to wallet"
        bg-color="outline"
        text-color="white"
        @click="backToWallet" 
      />
    </div>
  </SignBaseModal>
</template>

<script setup lang="ts">
import router from "../../../router";

async function backToWallet() {
    console.log("There was an error")
    await router.push({ name: "wallet"})
}



</script>
