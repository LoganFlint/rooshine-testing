<template>
  <div class="h-auto ml-5 bg-speedOfLight w-[675px] px-7 pb-20">
    <div class="pt-7 pb-3 font-serif font-bold text-2xl">
      Set a Reserve Price
    </div>
    <div class="font-source text-sm pr-24 pb-7">
      A reserve price (to protect a minimum price or 'no sale') can be added at your discretion, and we can help advise on the level to set this at
      before the auction starts.
    </div>
    <form>
      <div class="pb-7">
        <div class="text-lg font-source pb-3">
          Reserve Price
        </div>
        <TextInput
          v-model="state.reservePrice"
          class="w-full bg-white"
          dollar-sign
          number
          @input="updateReservePrice"
        />
      </div>
      <div class="flex justify-center">
        <MainButton
          label="Continue"
          class="w-60 h-9 mt-8"
          @click="continueToNext"
        />
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">

const props = defineProps({
  barrelId: { type: String, default: "" },
  reservePrice: { type: Number, default: null }
});

const emit = defineEmits(["continue", "updateReservePrice"]);

const state = reactive({
  reservePrice: props.reservePrice === null ? "" : props.reservePrice.toLocaleString()
});

function continueToNext() {
  try {
    emit("updateReservePrice", state.reservePrice);
    emit("continue", props.barrelId, "create-barrel.reserve");
  } catch (e) {
    console.warn(e);
  }
}

function updateReservePrice(e: Event): void {
	emit("updateReservePrice", isNaN(Number((e.target as HTMLInputElement).value.replaceAll(",", "")))? 0 : Number((e.target as HTMLInputElement).value.replaceAll(",", "")));
}

</script>
