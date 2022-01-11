<template>
  <div class="bg-speedOfLight py-3 flex flex-wrap justify-center items-center">
    <div class="my-4 sm:my-0 font-serif font-bold text-2xl">
      Next Auction starting in:
    </div>
    <LotCounter
      class="my-4 sm:my-0 mx-5 2xl:mx-16"
      :next-lot-date="date"
    />
    <div class="my-4 sm:my-0 text-planetOfTheApes underline font-serif font-bold text-2xl">
      <router-link :to="{ name: 'past.auctions' }">
        View the Last Auction
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
  const date = new Date("January 28, 2022");
</script>
