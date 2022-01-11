<template>
  <div>
    <MarketingBanner />

    <AuctionRibbonLive
      v-if="liveAuction"
      :lots="state.lots"
      :time="5"
      interval="days"
    />
    <AuctionRibbonCountdown v-else />

    <div class="px-10 mt-14 flex flex-wrap justify-center gap-4">
      <MarketingLinkTile
        route="live.auction"
        :image="currentAuction"
        label="Current Auction"
      />
      <MarketingLinkTile
        route="past.auctions"
        :image="pastAuction"
        label="Past Auctions"
      />
      <MarketingLinkTile
        route="live.auction"
        :image="shopWithUs"
        label="Shop with Us"
      />
    </div>

    <PastHighlightsSection class="pt-4" />
    <div class="mb-16">
      <ReviewBanner />
    </div>

    <div class="px-14 mt-1.5 mb-16">
      <Blog />
    </div>
    <SubscribeBanner />

    <BottomSection />
    <SiteFooter />
  </div>
</template>

<script setup lang="ts">

import { useStore } from "../store";
import type { Lot } from "../api/lot";

import currentAuction from "../assets/current_auction.png";
import pastAuction from "../assets/past_auction.png";
import shopWithUs from "../assets/shop_with_us.png";

const liveAuction = ref(true);
const store = useStore();

const state = reactive({
  lots: null as Lot[] | null
});



store
  .getLots()
  .then((lots) => {
    state.lots = lots;
  })
  .catch(reason => {
    console.warn("reason", reason);
  });

</script>
