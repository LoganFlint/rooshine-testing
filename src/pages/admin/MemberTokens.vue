<template>
  <PageHeader
    member-info
    member-name="Brandon Salindo"
    member-status="BUYER"
  />
  <div class="flex flex-wrap pb-5">
    <div
      v-for="(token, i) in state.lotObject"
      :key="i"
      class=" pt-11 pl-11"
    >
      <BarrelToken
        data-cy="barrel-tokens"
        class="mr-5 w-[145px] h-[223px]"
        :lot-number="token.lotNumber"
        :year="token.startDate"
        :total-bottles="token.totalBottles"
        :sold-bottles="token.soldBottles"
        :lot-name="returnTrimmed(token.name)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  const state = reactive({
   lotObject: 	[{
    name: "Old Malt Cask Ardbeg 32 Year Old 1967",
		lotNumber: 12345678,
		startDate: "2022",
    soldBottles: "1",
    totalBottles: 251,
    }, 
    {
    name: "Old Malt Cask Ardbeg 32 Year Old 1967",
		lotNumber: 12345678,
		startDate: "2022",
    soldBottles: "1",
    totalBottles: 251,
    },
    {
    name: "Old Malt Cask Ardbeg 32 Year Old 1967",
		lotNumber: 12345678,
		startDate: "2022",
    soldBottles: "1",
    totalBottles: 251,
    }
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
