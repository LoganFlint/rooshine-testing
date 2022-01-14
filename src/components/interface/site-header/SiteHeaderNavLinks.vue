<template>
  <div class="flex h-5">
    <NavLink
      data-cy="live-auctions-link"
      user
      :to="{ name: 'live.auction' }"
      text="Live Auction"
      class="pr-7"
    />
    <NavLink
      data-cy="past-auctions-link"
      user
      :to="{ name: 'past.auctions' }"
      text="Past Auction"
      class="pr-7"
    />
    <NavLink
      data-cy="sell-link"
      user
      :to="{ name: 'sell' }"
      text="Sell"
      class="pr-7"
    />
    <a
      data-cy="blog-link"
      text="Blog"
      class="pr-7"
      target="_blank"
      href="https://medium.com/"
    >Blog</a>
  </div>
</template>

<script setup lang ="ts">

</script>
