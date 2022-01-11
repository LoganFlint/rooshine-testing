<template>
  <div
    class="w-96 max-w-sm items-center justify-center rounded flex flex-col py-28 px-16 text-white bg-planetOfTheApes"
  >
    <img
      src="../../../assets/gavel_white.svg"
      alt="gavel"
    >
    <div class="font-serif font-bold text-3xl text-center pt-5 pb-4">
      You have placed your bids!
    </div>
    <div
      class="font-source text-sm pb-12 text-center"
    >
      We’ll notify you if someone outbids you on any of your bottles. Good Luck!
    </div>
    <div class="flex">
      <MainButton
        class="m-auto"
        label="back to barrel details"
        bg-color="outline"
        text-color="white"
        @click="emitClose"
      />
    </div>
    <div class="pt-4 flex justify-center">
      <router-link
        :to="{ name: 'live.auction' }"
        @click="emitClose"
      >
        BROWSE MORE AUCTIONS
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">

const emit = defineEmits(["close"]);

function emitClose() {
  emit("close");
}

</script>
