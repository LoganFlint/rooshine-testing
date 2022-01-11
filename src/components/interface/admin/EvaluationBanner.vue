<template>
  <div class="">
    <div class="bg-speedOfLight py-5 pl-7 border-l-4 border-planetOfTheApes">
      <div class="flex justify-between">
        <div>
          <div class="font-serif font-bold pb-1">
            Evaluation Requests
          </div>
          <div class="font-source">
            21 new requests require attention
          </div>
        </div>
        <MainButton
          class="py-1 px-12 mr-6"
          label="view"
          bg-color="red"
          text-color="white"
          @click="gotToLots"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang = "ts">

import router from "../../../router"

function gotToLots() {
  void router.push({ name: 'admin.barrels' })
}

</script>

