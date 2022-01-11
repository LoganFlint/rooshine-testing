<template>
  <div class="w-96 max-w-sm rounded-t bg-white">
    <div
      class="
        flex
        font-source font-bold
        py-3
        justify-center
        items-center
        border-b border-unicornSilver
      "
    >
      <div class="border-r border-unicornSilver pr-3">
        LOT <span>#{{ lotNumber }}</span>
      </div>
      <div class="pl-3">
        {{ bottleCount }} Bottles
      </div>
    </div>
    <div class="flex justify-between px-6 py-5">
      <div class="font-serif font-bold text-2xl">
        Place Bid
      </div>
      <div class="flex items-center">
        <img
          src="../../../assets/red_clock.svg"
          alt="clock"
        >
        <div class="text-planetOfTheApes font-semibold font-source pl-1.5">
          {{ timeRemaining }}
        </div>
      </div>
    </div>

    <div class="pb-4 px-6">
      <TextInput
        class="bg-white font-semibold"
        :placeholder="bottleCountMessage"
        bid-arrow-right
        placeholder-bold
        disabled
      />
    </div>
    <div class="flex justify-center font-source font-bold text-sm pb-5">
      <div class="pr-1">
        Total Bid Amount:
      </div>
      <img
        class="mr-1"
        src="../../../assets/barrel.svg"
        alt="barrel"
      >
      <div>
        {{ bidTotal.toLocaleString(undefined, {
          maximumFractionDigits: 2,
        }) }}
      </div>
    </div>

    <div class="flex justify-center pb-5 px-6">
      <MainButton
        class="w-full"
        label="place bid"
        @click="$emit('continue')"
      />
    </div>

    <BidTimeline highest-bid />
  </div>
</template>

<script setup lang="ts">

  const props = defineProps({
    lotNumber: { type: Number, default: 0 },
    name: { type: String, default: "" },
    bottleCount: { type: Number, default: 0 },
    selected: { type: Number, default: 0 },
    bidTotal: { type: Number, default: 0 },
    timeRemaining: { type: String, default: "00:00:00" }
  });

  defineEmits(["continue"]);

  const bottleCountMessage = computed(() => {
    return `${props.bottleCount} bottles selected`;
  });

</script>
