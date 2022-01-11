<template>
  <div class="bg-white pt-9 ml-7 mr-7 pb-12 w-[421px]l">
    <div class="flex border-b border-unicornSilver pb-4">
      <div class="font-serif pl-7 font-bold text-2xl pr-2">
        Barrel Details
      </div>
    </div>
    <div class="mt-7 pl-7 pr-4 overflow-y-scroll">
      <div class="font-source flex justify-between items-center pb-4 border-b border-unicornSilver">
        <div class="font-semibold w-44 pr-2">
          Distillery
        </div>
        <div class="text-right">
          {{ distillery }}
        </div>
      </div>

      <div class="font-source flex justify-between items-center py-4 border-b border-unicornSilver">
        <div class="font-semibold w-44 pr-2">
          Location
        </div>
        <div class="text-right">
          {{ location }}
        </div>
      </div>

      <div class="font-source flex justify-between items-center py-4 border-b border-unicornSilver">
        <div class="font-semibold w-44 pr-2">
          Size
        </div>
        <div class="text-right">
          {{ size }}cl
        </div>
      </div>

      <div class="font-source flex justify-between items-center py-4 border-b border-unicornSilver">
        <div class="font-semibold w-44 pr-2">
          Type
        </div>
        <div class="text-right">
          {{ type }}
        </div>
      </div>

      <div class="font-source flex justify-between items-center py-4 border-b border-unicornSilver">
        <div class="font-semibold w-44 pr-2">
          Age
        </div>
        <div class="text-right">
          {{ age }} Years Old
        </div>
      </div>

      <div class="font-source flex justify-between items-center py-4 border-b border-unicornSilver">
        <div class="font-semibold w-44 pr-2">
          Strength
        </div>
        <div class="text-right">
          {{ strength }}%
        </div>
      </div>

      <div class="font-source flex justify-between items-center py-4 border-b border-unicornSilver">
        <div class="font-semibold w-44 pr-2">
          Cask Type
        </div>
        <div class="text-right">
          {{ caskType }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default defineComponent({
	props: {
		distillery: { type: String, default: "" },
		location: { type: String, default: "" },
		size: { type: Number, default: null },
		type: { type: String, default: "" },
		age: { type: Number, default: null },
		strength: { type: Number, default: null },
		caskType: { type: String, default: "" },
	},
})
</script>