<template>
  <div class="py-7 pl-7 pr-8 mt-6 max-w-xs h-auto border border-unicornSilver rounded">
    <div class="font-serif font-bold text-2xl">
      Notifications
    </div>
    <div class="pt-2 pb-7 font-source">
      Choose the type of notifications you want to receive
    </div>

    <ToggleNotification
      v-model="withdraw"
      class="mb-6 justify-between"
      label="Withdraw Activity"
    />
    <ToggleNotification
      v-model="lotEnd"
      class="mb-6 justify-between"
      label="Auction Ending"
    />
    <ToggleNotification
      v-model="lotStart"
      class="mb-6 justify-between"
      label="Auction Start"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue"
export default defineComponent({
	setup() {
		const withdraw = ref(false)
		const lotStart = ref(false)
		const lotEnd = ref(false)

		return {
			withdraw,
			lotStart,
			lotEnd,
		}
	},
})
</script>
