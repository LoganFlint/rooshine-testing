<template>
  <div class="py-5">
    <div class="flex items-center">
      <div class="border border-planetOfTheApes w-8 h-8 rounded-full mr-2.5" />
      <div class="font-source text-sm">
        <span class="font-semibold">{{ userName }}</span> placed a bid for 2
        bottles in <span class="font-semibold">lot #{{ parseInt(lotNumber) }} </span> in
        the <span class="font-semibold">{{ auctionName }} </span>.
      </div>
    </div>
    <div class="pl-10 font-source text-xs ">
      {{ notificationTime }}
    </div>
    <div
      v-if="note"
      class="my-3 ml-10"
    >
      <div class="font-source italic text-xs max-w-sm rounded bg-speedOfLight p-2">
        {{ note }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  defineProps({
    notificationTime: {type: String, default: ""},
    userName: { type: String, default: "" },
    lotNumber: { type: String, default: "" },
    auctionName: { type: String, default: "" },
    note: { type: String, default: "" },
  });
</script>
