<template>
  <div class="w-screen">
    <FeaturedBlog
      title="10 Highest Scoring Whiskies in the Summer 2021 Buying Guide"
      :image="featuredBlog"
    />
    <SubscribeBanner />
    <BottomSection />
    <SiteFooter />
  </div>
</template>

<script setup lang="ts">

import featuredBlog from "../assets/featuredblog.png";

</script>
