<template>
  <div class="w-full min-h-screen bg-granite bg-speedOfLight flex justify-center items-center">
    <div class="drop-shadow-lg">
      <div class="flex">
        <div class="bg-granite bg-planetOfTheApes">
          <div
            class="text-white font-serif font-bold text-[124px] relative rotate-90 py-32 px-4 z-50"
          >
            404
          </div>
        </div>
        <div class="bg-white pt-14 pl-14 pr-12 text-center">
          <div class="font-serif font-bold text-4xl text-planetOfTheApes">
            We’re Dry
          </div>
          <div class="font-source text-2xl w-60 pt-4">
            Something's gone wrong. Try again later.
          </div>
        </div>
      </div>
      <div class="z-30 relative -top-56 px-2">
        <EmptyBottle />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
onMounted(() => {
	console.log("mounted error component")
})
</script>
