<template>
  <div class="flex h-5">
    <NavLink
      user
      :to="{ name: 'live.auction' }"
      text="Live Auction"
      class="pr-7"
    />
    <NavLink
      user
      :to="{ name: 'past.auctions' }"
      text="Past Auction"
      class="pr-7"
    />
    <NavLink
      user
      :to="{ name: 'sell' }"
      text="Sell"
      class="pr-7"
    />
    <a
      text="Blog"
      class="pr-7"
      target="_blank"
      href="https://medium.com/"
    >Blog</a>
  </div>
</template>

<script setup lang ="ts">

</script>