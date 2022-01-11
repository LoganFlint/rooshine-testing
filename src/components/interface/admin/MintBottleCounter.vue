<template>
  <div
    data-cy="mint-bottle-counter"
    class="mt-12 bg-speedOfLight py-7 px-6 max-w-sm"
  >
    <div class="font-serif font-bold text-xl">
      Mint Bottle Tokens
    </div>
    <div class="font-source text-sm pt-2.5 pb-7">
      How many bottles can be minted from this barrel?
    </div>
    <div class="flex items-center pb-8">
      <div
        :class="[
          ' py-1.5 px-4 mr-2.5 text-[22px] text-planetOfTheApes border border-planetOfTheApes rounded flex justify-center items-center  ',
          {
            'cursor-not-allowed bg-opacity-50': mintAmount === 0,
            'cursor-pointer	': mintAmount >= 1,
          },
        ]"
        @click="minusOne"
      >
        <div>-</div>
      </div>
      <TextInput
        v-model="mintAmount"
        mint-bottles
        input-type="number"
        min="0"
        class="h-12 text-plametOfTheApes"
        autocomplete="off"
      />
      <div
        class="cursor-pointer py-1.5 px-4 ml-2.5 text-[22px] text-planetOfTheApes border border-planetOfTheApes rounded flex justify-center items-center"
        @click="addOne"
      >
        <div>+</div>
      </div>
    </div>
    <MainButton      
      class="py-2 w-full"
      label="mint bottle tokens"
      :disabled="mintAmount === 0"
      bg-color="red"
      text-color="white"
      @click="mintTokens"
    />
  </div>
</template>

<script setup lang="ts">
const mintAmount = ref<number>(0)

function mintTokens() {
  console.log("mintTokens clicked")
}
function addOne() {
    mintAmount.value ++
}
function minusOne() {
    if(mintAmount.value >= 1 ) {
    mintAmount.value --
  }
}

watch(() => mintAmount.value, () => {
  console.log(mintAmount.value);
});
</script>
