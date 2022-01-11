<template>
  <SignBaseModal
    :is-open="isOpen"
    no-close
    @close="$emit('close')"
  >
    <div class="flex flex-col">
      <div class="pl-6 pb-5 pt-6 bg-white">
        <div class="font-medium text-3xl">
          Auction Ended
        </div>
        <div class="font-source text-xs">
          Auction Totals
        </div>
        <div class="font-source text-4xl pr-2">
          {{
            total.toLocaleString(undefined, {
              maximumFractionDigits: 2,
            })
          }}
          <span class="font-semibold text-xl">isv</span>
        </div>
      </div>
      <BidTimeline />
    </div>
  </SignBaseModal>
</template>

<script setup lang="ts">

	defineProps({
		total: { type: Number, default: 0 },
		isOpen: Boolean,
	});
	
  defineEmits(["close"]);

</script>
