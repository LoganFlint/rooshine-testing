<template>
  <PageHeader
    :name="state.user.fullName"
    profile
    button
    @createAuction="openAuction"
  />
  <AddLotModal :is-open="showAddAuction" @close="showAddAuction = false" />
  <div data-cy="admin-home-body" class="pl-10 pt-8 pb-20 max-w-7xl">
    <div class="pt-7">
      <AuctionCards />
    </div>
    <div class="w-full mr-14">
      <EvaluationBanner class="w-full" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import api from "../../api/api";
  import type { User } from "../../api/user";

  onMounted(async () => {
    state.user = await api.getCurrentUser();
  });

  const state = reactive({
    user: {} as User,
  });

  const showAddAuction = ref(false);

  function openAuction() {
    showAddAuction.value = true;
  }
</script>
