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
      <div data-cy="purchase-complete-title" class="font-serif font-bold text-[40px] text-center pt-5 pb-4 text-white ">
        Purchase <br> Complete!
      </div>
      <div class="text-sm text-center text-white pb-5">
        Your ISV has been added to your wallet
      </div>

      <MainButton   
        data-cy="close-isv-purchased"    
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
  await router.push({ name: "profile"})
}



</script>
