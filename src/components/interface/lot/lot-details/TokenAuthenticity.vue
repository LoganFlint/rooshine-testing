<template>
  <div class="bg-white pt-9 pb-12 w-[421px]">
    <div class="flex border-b border-unicornSilver pb-4">
      <div class="font-serif pl-7 font-bold text-2xl pr-2">
        Token of Authenticity
      </div>
      <img
        src="../../../../assets/info_icon.svg"
        alt="info"
      >
    </div>
    <div class="pt-12 flex justify-center items-center">
      <BarrelToken
        class="w-[230px] h-[300px]"
        :lot-number="state.lotObject.lotNumber"
        :year="state.lotObject.startDate"
        :total-bottles="state.lotObject.totalBottles"
        :sold-bottles="state.lotObject.soldBottles"
        :lot-name="returnTrimmed(state.lotObject.name)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  defineProps({ 
    token: { type: String, default: "" },
   });

   const state = reactive({
   lotObject: 	{
    name: "Old Malt Cask Ardbeg 32 Year Old 1967",
		lotNumber: 12345678,
		startDate: "2022",
    soldBottles: "1",
    totalBottles: 251,
    }
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


