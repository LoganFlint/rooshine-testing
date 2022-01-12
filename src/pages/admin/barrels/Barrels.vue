<template>
  <PageHeader
    barrels
    title="Barrels"
  />
  <div class="px-10">
    <div class="justify-between pt-6 flex items-center">
      <div class="flex items-center h-16 relative">
        <TextInput
          id="search-barrels"
          class="w-[780px] bg-white"
          placeholder="Search"
        />
        <SearchButton />
      </div>
    </div>

    <AdminLotsList v-model="state.barrels" />
  </div>
</template>

<script setup lang="ts">
  import type { CurrentBarrel } from "../../../api/barrel";
  import { useStore } from "../../../store";
  const store = useStore();

  onMounted(async () => {
    state.barrels = await store.getBarrels();
    for (let i = 0; i < state.barrels.length; i++) {
      state.barrels[i].createdAt = new Date(state.barrels[i].createdAt).toDateString().substr(4)
    }
  });

  const state = reactive({
    barrels: [
      {
        barrelId: "",
        userId: "",
        userFullName: "",
        title: "",
        status: "",
        createdAt: "",
        updatedAt: "",
      },
    ] as CurrentBarrel[],
  });
</script>
