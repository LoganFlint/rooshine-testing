<template>
  <router-view
    name="AdminBarrelInfo"
  />
  <div>
    <PageHeader
      :barrel-id="barrelId"
      barrel-info
    />

    <div class="pt-10 px-10 mb-10 flex">
      <div class="mr-10 max-w-lg">
        <BarrelBottleDetails />
        <SellerDetails />
      </div>
      <div> 
        <BarrelImageDetail />
        <BarrelTokenDetails />
        <CreateBarrelToken />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
const route = useRoute();  
const barrelId = route.params.barrelId.toString()
</script>
