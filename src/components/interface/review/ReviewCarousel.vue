<template>
  <div class="relative h-96">
    <Carousel
      :images="images"
      review
      @changeIndexTo="updateIndex"
    />

    <div class="mt-10 mb-12 px-32 text-center relative">
      <img
        :src="quotes"
        alt="quotes"
        class="mx-auto"
      >
      <div class="pt-5 font-serif font-bold text-white text-lg">
        {{ reviews[index].review }}
      </div>
      <div class="uppercase tracking-widest mt-8 mb-16 flex flex-col justify-center text-center">
        <div class="font-source font-bold text-white">
          {{ reviews[index].name }}
        </div>
        <div class="font-source text-white">
          {{ reviews[index].userType }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import reviews1 from "../../../assets/reviews1.png"
import image2 from "../../../assets/image2.png"
import image3 from "../../../assets/image3.png"
import quotes from "../../../assets/quotes.svg";

const images = [reviews1, image2, image3]

const index = ref(0)

const reviews = [
	{
		review:
			"Pleased to be back for another auction win. Great service as usual from the really helpful staff. No doubt I'll be back bidding again soon!",
		name: "Boston G",
		userType: "buyer",
	},
	{
		review: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas nulla tortor, commodo a velit quis.",
		name: "Gustav B",
		userType: "buyer",
	},
	{
		review: "Consectetur adipiscing elit. Maecenas nulla tortor, commodo a velit quis. Lorem ipsum dolor sit amet.",
		name: "Mary G.",
		userType: "buyer",
	},
]

function updateIndex(event: Event) {
	index.value = Number(event)
}

</script>
