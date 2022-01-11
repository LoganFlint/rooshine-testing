<template>
  <div
    data-cy="featured-blog"
    class="px-14 pt-20"
  >
    <div class="flex justify-center">
      <div class="bg-speedOfLight max-w-lg pl-12 pr-6 flex flex-col">
        <div class="pt-16 pb-3 font-black font-source text-lg">
          FEATURED
        </div>
        <div class="pr-9 pb-14 font-bold font-serif text-4xl">
          {{ title }}
        </div>
        <MainButton
          label="read article"
          bg-color="red"
          text-color="white"
        />
      </div>
      <img
        :src="image"
        alt="featured blogs"
      >
    </div>
    <div class="pt-10 grid grid-cols-3 gap-12 min-w-full justify-items-center">
      <BlogTile
        :image="blog1"
        title="“It’s like magic”: Q&A with student distiller Rosie du Toit"
      />
      <BlogTile
        :image="blog2"
        title="A beginner’s guide to whisky cocktails – seven easy lockdown serves to start"
      />
      <BlogTile
        :image="blog3"
        title="Wacky facts about whisky capable of stunning even the most seasoned of drinkers."
      />

      <BlogTile
        :image="blog4"
        title="“It’s like magic”: Q&A with student distiller Rosie du Toit"
      />
      <BlogTile
        :image="blog5"
        title="A beginner’s guide to whisky cocktails – seven easy lockdown serves to start"
      />
      <BlogTile
        :image="blog6"
        title="Wacky facts about whisky capable of stunning even the most seasoned of drinkers."
      />
    </div>
  </div>
</template>

<script setup lang="ts">

import blog1 from "../../../assets/blog1.png";
import blog2 from "../../../assets/blog2.png";
import blog3 from "../../../assets/blog3.png";
import blog4 from "../../../assets/blog4.png";
import blog5 from "../../../assets/blog5.png";
import blog6 from "../../../assets/blog6.png";

defineProps({
  title: { type: String, default: "" },
  image: { type: String, default: "" },
});

</script>
