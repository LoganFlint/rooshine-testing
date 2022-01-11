<template>
  <div
    class="
      w-96
      bg-planetOfTheApes
      text-white text-sm
      rounded-b
      overflow-y-auto
      max-w-sm
    "
  >
    <div
      class="
        border-b border-opacity-10 border-black
        bg-strongEnvy
        py-2.5
        px-6
        flex
        justify-between
        items-center
      "
    >
      <div class="font-serif text-xl">
        Highest Single Bid
      </div>
      <div class="flex items-center">
        <img
          class="mr-1.5 w-4 h-4"
          src="../../assets/white_barrel.svg"
          alt="barrel"
        >
        <div class="font-source text-2xl">
          {{ bidPrice.toLocaleString(undefined, {
            maximumFractionDigits: 2,
          }) }}
        </div>
      </div>
    </div>

    <div
      class="
        py-4
        m-auto
        flex
        items-center
        justify-center
        border-b-2 border-opacity-10 border-black
      "
    >
      <img
        src="../../assets/timeline_clock.svg"
        class="h-3 mr-2"
      >
      <div class="uppercase tracking-wider font-semibold">
        Bid Timeline
      </div>
    </div>

    <div class="py-5 px-10">
      <div
        v-for="(bid, index) in bids"
        :key="index"
        class="relative"
      >
        <BidEntry :entry="bid" />
        <div
          class="
            absolute
            h-[15px]
            left-[20px]
            top-[40px]
            border-l border-white border-dashed
          "
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  setup() {
    const bidPrice = ref(16850);
    const bids = [
      {
        type: "bid",
        name: "Gustav Bellows",
        time: "3:12pm",
        amount: "200,850",
      },
      {
        type: "bid",
        name: "You",
        time: "3:12pm",
        amount: "200,800",
      },
      {
        type: "time",
        added: "10 Minutes",
        amount: "200,800",
      },
      {
        type: "bid",
        name: "Mary Gillespie",
        time: "3:05pm",
        amount: "200,600",
      },
    ];
    return { bids, bidPrice };
  },
});
</script>
