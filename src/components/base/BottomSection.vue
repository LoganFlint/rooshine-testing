<template>
  <section class="bg-speedOfLight flex flex-col justify-center items-center">
    <img
      class="mb-11 mt-14"
      :src="sketchLogo"
      alt="roo img"
    >
    <div class="mb-11 p-2 rounded-full bg-planetOfTheApes flex justify-center items-center">
      <SocialLink
        :image="Facebook"
        url="http://www.facebook.com/drinkrooshine/"
        class="mx-2"
      />
      <SocialLink
        :image="Twitter"
        url="https://twitter.com/rooshine?lang=en"
        class="mx-2"
      />
      <SocialLink
        :image="Instagram"
        url="https://www.instagram.com/drinkrooshine/?hl=en"
        class="mx-2"
      />
      <SocialLink
        :image="Youtube"
        url="https://www.youtube.com/"
        class="mx-2"
      />
    </div>
    <div class="flex mb-5 text-xs font-semibold text-flintPurple">
      <div
        class="cursor-pointer mr-5"
        @click="openTerms"
      >
        SERVICE AGREEMENT
      </div>
      <TermsModal
        :is-open="showTerms"
        @close="showTerms = false"
      />
      <router-link
        class="mr-5"
        :to="{ name: 'marketing' }"
      >
        SITEMAP
      </router-link>
      <router-link
        class="mr-5"
        :to="{ name: 'marketing' }"
      >
        FAQ
      </router-link>
      <div
        class="cursor-pointer mr-5"
        @click="openPrivacy"
      >
        PRIVACY POLICY
      </div>
      <PrivacyModal
        :is-open="showPrivacy"
        @close="showPrivacy = false"
      />
    </div>
  </section>
</template>

<script setup lang="ts">

import Facebook from "../../assets/facebook.svg";
import Instagram from "../../assets/instagram.svg";
import Twitter from "../../assets/twitter.svg";
import Youtube from "../../assets/youtube.svg";
import sketchLogo from "../../assets/rooshine_sketch_logo.svg";

let showTerms = ref(false);
let showPrivacy = ref(false);

function openTerms() {
  showTerms.value = true;
}

function openPrivacy() {
  showPrivacy.value = true;
}

</script>
