<template>
  <div class="border w-[340px] border-unicornSilver pt-8 pb-9 text-center">
    <div v-if="lot">
      <div class="font-serif font-bold text-[52px] pb-2.5">
        {{ lotCount }}
      </div>
      <div class="font-source font-bold text-sm ">
        LOT COUNT
      </div>
    </div>

    <div v-if="participant">
      <div class="font-serif font-bold text-[52px] pb-2.5">
        {{ participants }}
      </div>
      <div class="font-source font-bold text-sm ">
        PARTICIPANTS? VISITORS?
      </div>
    </div>

    <div v-if="totalRevenue">
      <div class="font-serif font-bold text-[52px] pb-2.5">
        ${{ revenue.toLocaleString(undefined, {
          maximumFractionDigits: 2,
        }) }}
      </div>
      <div class="font-source font-bold text-sm ">
        TOTAL REVENUE
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  lotCount: {type: Number, default: 0},
  participants: {type: Number, default: 0},
  revenue: {type: Number, default: 0},
  lot: Boolean,
  participant: Boolean,
  totalRevenue: Boolean,

})
</script>
