<template>
  <div class="flex flex-wrap items-center justify-center">
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
  </div>
</template>

<script setup lang="ts">

import blog1 from "../../../assets/blog1.png";
import blog2 from "../../../assets/blog2.png";
import blog3 from "../../../assets/blog3.png";

</script>
