<template>
  <div class="w-80 bg-white border border-unicornSilver rounded flex">
    <img
      class="pt-3 pl-1 w-24"
      src="../../../assets/live_auction_img.png"
      alt="live auction"
    >
    <div class="h-28 w-[1px] bg-unicornSilver" />
    <div class="text-left pt-3 pr-5 flex flex-col pl-4">
      <div class="font-serif font-bold">
        {{ title }}
      </div>
      <div class="flex mt-2 justify-between">
        <div>
          <div class="leading-3 text-sm mb-[1px]">
            Last Bid
          </div>
          <div class="font-bold">
            {{ name }}
          </div>
        </div>
        <div class="font-semibold text-2xl text-planetOfTheApes">
          {{
            amount.toLocaleString(undefined, {
              maximumFractionDigits: 2,
            })
          }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

defineProps({
  title: { type: String, required: true },
  name: { type: String, required: true },
  amount: { type: Number, required: true },
});

</script>
