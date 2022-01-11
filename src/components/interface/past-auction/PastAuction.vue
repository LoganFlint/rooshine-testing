<template>
  <div
    data-cy="past-auction-cards"
    class="flex flex-wrap"
  >
    <PastAuctionCard
      :image="pastauction1"
      month="June"
      year="2021"
      day="day-day"
      route="marketing"
    />
    <PastAuctionCard
      route="marketing"
      :image="pastauction2"
      month="June"
      year="2021"
    />
    <PastAuctionCard
      route="marketing"
      :image="pastauction3"
      month="June"
      year="2021"
    />
    <PastAuctionCard
      route="marketing"
      :image="pastauction4"
      month="June"
      year="2021"
    />
    <PastAuctionCard
      route="marketing"
      :image="pastauction5"
      month="June"
      year="2021"
    />
    <PastAuctionCard
      route="marketing"
      :image="pastauction6"
      month="June"
      year="2021"
    />
    <PastAuctionCard
      route="marketing"
      :image="pastauction7"
      month="June"
      year="2021"
    />
    <PastAuctionCard
      route="marketing"
      :image="pastauction8"
      month="June"
      year="2021"
    />
  </div>
</template>

<script setup lang="ts">

import pastauction1 from "../../../assets/pastauction1.png";
import pastauction2 from "../../../assets/pastauction2.png";
import pastauction3 from "../../../assets/pastauction3.png";
import pastauction4 from "../../../assets/pastauction4.png";
import pastauction5 from "../../../assets/pastauction5.png";
import pastauction6 from "../../../assets/pastauction6.png";
import pastauction7 from "../../../assets/pastauction7.png";
import pastauction8 from "../../../assets/pastauction8.png";

</script>
