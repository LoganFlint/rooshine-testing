<template>
  <div>
    <div class="pt-14 px-52">
      <div>
        <div class="font-serif font-bold text-5xl pb-4">
          How to Sell
        </div>
        <div class="font-source text-2xl">
          A step-by-step process on how to get started
          <br>selling your wares with RooShine.
        </div>
      </div>
      <div
        v-for="item in sellSteps"
        :key="item.number"
        class="pt-14"
      >
        <SellSteps
          :number="item.number"
          :title="item.title"
          :description="item.description"
          :link="item.link"
          :link-description="item.linkDescription"
          :image="item.image"
        />
      </div>
    </div>
    <div class="pt-20">
      <SubscribeBanner />

      <BottomSection />
      <SiteFooter />
    </div>
  </div>
</template>

<script setup lang="ts">
import image from "../assets/sell_example.png";

const sellSteps = [
  {
    number: 1,
    title: "Register as a member",
    description:
      "You must be a registered user to use RooShine, as a buyer and/or a seller. There is a one-off, non-refundable website registration fee of £5+VAT. This is to ensure that your registered card details are confirmed and to avoid illegitimate bidding.",
    link: "#",
    linkDescription: "to be taken to the website registration page.",
    image: image,
  },
  {
    number: 2,
    title: "Register your bottles",
  },
  {
    number: 3,
    title: "Send the bottles to RooShine",
  },
  {
    number: 4,
    title: "Auction",
  },
  {
    number: 5,
    title: "Receive your payment",
  },
];

</script>
