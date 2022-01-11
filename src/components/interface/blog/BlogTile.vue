<template>
  <div class="pr-7 pb-6">
    <div class="w-96 h-[521px] bg-unicornSilver rounded">
      <img
        :src="image"
        alt="blog image"
      >
      <div class="flex flex-col h-72 flex-grow-0 justify-between pl-7">
        <div class="font-serif font-bold text-3xl pt-7 pr-10">
          {{ title }}
        </div>
        <div class="font-source text-xl flex items-center text-planetOfTheApes">
          <!-- <SocialLink
            route
            route-name="blog-article"
            text="Read More"
            :image="arrowRight"
          /> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

// import arrowRight from "../../../assets/red_arrow_right.svg";

defineProps({
  image: { type: String, default: "" },
  title: { type: String, default: "" },
});

</script>
