<template>
  <div class="flex flex-col px-7 border-b border-unicornSilver py-4">
    <div class="flex justify-between items-center">
      <div class="w-3.5 mr-5">
        <img
          v-if="recieved"
          :src="image"
          alt="arrow"
        >
        <img
          v-if="sold"
          :src="image"
          alt="arrow"
        >
      </div>

      <div class="flex flex-col flex-grow">
        <div class="text-lg">
          {{ title }}
        </div>
        <div class="text-xs font-light">
          {{ date }}
        </div>
      </div>

      <div class="flex flex-col items-end">
        <div class="text-lg">
          <span
            v-if="recieved"
            class="text-base"
          >+</span>
          <span
            v-else
            class="text-base"
          >-</span>
          {{ bitAmount }}
        </div>
        <div class="text-xs font-light">
          {{ bitAmount }}
          <span>USD</span>
        </div>
      </div>
    </div>
    <TransactionDetails v-if="details" />
  </div>
</template>
<script setup lang="ts">

defineProps({
  recieved: Boolean,
  sold: Boolean,
  details: Boolean,
  image: { type: String, required: true },
  date: { type: String, default: "" },
  title: { type: String, default: "" },
  bitAmount: { type: String, default: "" },
  usAmount: { type: String, default: "" },
});

</script>
