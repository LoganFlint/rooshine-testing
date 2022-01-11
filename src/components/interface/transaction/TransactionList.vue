<template>
  <div
    v-if="newUser"
    class="
      max-w-3xl
      text-center
      border-b border-l border-r border-unicornSilver
      h-52
    "
  >
    <div class="flex flex-col justify-center items-center py-8">
      <img
        class="w-10 h-10 mb-1"
        src="../../../assets/newusercollections.svg"
        alt="transactions"
      >
      <div>
        Keep track of all your purchased and sold <br>
        items here.
      </div>
    </div>
  </div>

  <div v-else>
    <div
      class="
        bg-speedOfLight
        pl-8
        py-2
        font-semibold
        text-xs
        border-b border-t border-unicornSilver
        max-w-3xl
      "
    >
      1 OCTOBER - 30 OCTOBER
    </div>
    <TransactionItem
      title="Received ISV"
      date="OCTOBER 22 @ 2:45 PM"
      :image="recieved"
      recieved
      bit-amount="24,000"
    />
    <TransactionItem
      title="Received ISV"
      date="OCTOBER 22 @ 2:45 PM"
      :image="sold"
      sold
      bit-amount="10,000"
    />
    <TransactionItem
      title="Received ISV"
      date="OCTOBER 22 @ 2:45 PM"
      :image="recieved"
      recieved
      bit-amount="24,000"
      details
    />
    <TransactionItem
      title="Received ISV"
      date="OCTOBER 22 @ 2:45 PM"
      :image="sold"
      sold
      bit-amount="6,000"
    />
  </div>
</template>

<script setup lang="ts">

import recieved from "../../../assets/recieved.svg";
import sold from "../../../assets/sold.svg";
  
defineProps({ newUser: Boolean });

</script>
