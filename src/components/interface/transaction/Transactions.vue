<template>
  <div class="max-w-3xl border-unicornSilver border pt-7">
    <div class="font-serif font-bold text-2xl pb-3 pl-8">
      Transactions
    </div>
    <div class="px-8 flex justify-between items-center h-14 mb-9">
      <div class="flex h-16 items-center relative">
        <TextInput
          class="w-80 focus:none"
          placeholder="Search"
        />
        <SearchButton />
      </div>
      <div class="flex-shrink border-unicornSilver h-12 flex items-center border rounded">
        <SelectField
          v-model="timePeriod"
          class="pr-5 w-44"
          label="Last 30 Days"
          :options="timePeriodOptions"
        />
        <div class="px-4 border-l border-unicornSilver h-full flex items-center">
          <img
            class="w-5 h-5"
            src="../../../assets/calender.svg"
            alt="calender"
          >
        </div>
      </div>

      <div
        class="flex items-center pl-5 pr-4 justify-between rounded border border-unicornSilver w-48 h-12"
      >
        <div class="font-source text-xl">
          Filter
        </div>
        <img
          class="w-5 h-4"
          src="../../../assets/filter.svg"
          alt="filter toggles"
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

defineProps({ newUser: Boolean });

const timePeriod = ref("")
const timePeriodOptions = {
  "Last Week": "one week",
  "Last 30 Days": "one moneth",
  "Last Year": "one year",
};

</script>
