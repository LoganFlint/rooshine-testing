<template>
  <div class="flex">
    <div v-for="card in adminAuctionCards" :key="card.title">
      <AuctionCard
        :title="card.title"
        :date="card.date"
        :listings="card.listings"
        :live="card.live"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  const adminAuctionCards = [
    {
      title: "Auction Name",
      date: "Oct 01, 2021 - Oct 31, 2021",
      listings: 580,
      live: true,
    },
    {
      title: "Auction Name",
      date: "Oct 01, 2021 - Oct 31, 2021",
      listings: 152,
      live: false,
    },
    {
      title: "Auction Name",
      date: "Oct 01, 2021 - Oct 31, 2021",
      listings: 421,
      live: false,
    },
  ];
</script>
