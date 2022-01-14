<template>
  <div class="mt-6 py-7 px-7 max-w-xs border border-unicornSilver rounded">
    <div class="font-serif font-bold text-2xl">
      Payment Methods
    </div>
    <div>
      <SavedPayments :index="0" />
    </div>
    <div class="my-6 border border-unicornSilver" />

    <div
      data-cy="add-payment-method"
      class="flex items-center cursor-pointer"
      @click="openAddPayment"
    >
      <img
        class="cursor-pointer h-3 w-3"
        src="../../../../assets/add_symbol.svg"
        alt="plus symbol"
      >
      <a
        class="font-source font-semibold pl-2 text-planetOfTheApes"
      >Add a Payment Method</a>
    </div>
  </div>
</template>

<script setup lang="ts">

  const emit = defineEmits(["addPayment"]);

  function openAddPayment() {
    emit("addPayment");
  }

</script>
