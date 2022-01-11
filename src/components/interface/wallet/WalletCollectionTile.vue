<template>
  <div
    v-for="lot in state.lotDetails"
    :key="lot.lotNumber"
    class="pr-4"
  >
    <BarrelToken
      class="w-[145px] h-[223px]"
      :lot-number="lot.lotNumber"
      :year="lot.year"
      :total-bottles="lot.total"
      :sold-bottles="lot.sold"
      :lot-name="returnTrimmed(lot.lotName)"
    />
  </div>
</template>

<script setup lang="ts">
const state = reactive({
  lotDetails: [
  {
    lotNumber: 12345678,
    lotName: "Macallan 10 Year Old Sherry Oak",
    total: 250,
    sold: "1",
    year: "2022",
  },
  {
    lotNumber: 22345678,
    lotName: "something small",
    total: 300,
    sold: "2",
    year: "2022",
  },
  {
    lotNumber: 32345678,
    lotName: "random name",
    total: 250,
    sold: "1",
    year: "2022",
  },
  {
    lotNumber: 42345678,
    lotName: "Macallan 10 Year Old Sherry Oak",
    total: 250,
    sold: "1",
    year: "2022",
  },
]
})


let truncate = " ..."
function returnTrimmed(lotName: string) {
  if(lotName.length > 16) {
   
    return lotName.substring(0,16).concat(truncate)
  } else {
    return lotName
  }
}


</script>
