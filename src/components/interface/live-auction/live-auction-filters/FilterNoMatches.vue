<template>
  <div class="w-full h-full min-h-screen text-center bg-speedOfLight pt-48">
    <img
      src="../../../../assets/gavel.svg"
      alt="gavel"
      class="m-auto"
    >
    <div class="font-bold text-xl text-planetOfTheApes font-serif mt-5">
      There are no matches for your search!
    </div>
    <div class="font-source mt-4 mb-8">
      Clear your filters or revise your selections.
    </div>
    <MainButton
      label="clear your selections"
      bg-color="outline"
      text-color="red"
      class="py-1.5 w-64 m-auto"
      @click="$emit('resetFilter')"
    />
  </div>
</template>

<script setup lang="ts">

    defineEmits(["resetFilter"]);

</script>