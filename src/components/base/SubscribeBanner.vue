<template>
  <div>
    <div
      class="
        py-16
        bg-subscribeBanner bg-planetOfTheApes
        flex flex-col
        items-center
      "
    >
      <div class="font-serif font-bold text-white text-3xl">
        Subscribe to Our Newsletter
      </div>
      <div class="pt-3 pb-11 font-source text-lg text-white">
        Get updates on upcoming auctions and news from Rooshine.
      </div>
      <TextInput
        v-model="email"
        class="w-80"
        arrow-right
        placeholder="Email Address"
        input-type="text"
        autocomplete="off"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    const email = ref<string | null>(null);

    return { email };
  },
});
</script>
