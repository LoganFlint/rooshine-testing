<template>
  <PageHeader
    members
    title="Members"
  />
  <div class="px-10">
    <div class="pt-6 max-w-6xl flex justify-between items-center">
      <div class="flex items-center h-16 relative">
        <TextInput
          class="w-[780px] bg-white"
          placeholder="Search"
        />
        <SearchButton />
      </div>
    </div>

    <AdminMembersList v-model="state.allUsers" />
  </div>
</template>

<script setup lang="ts">
import api from "../../api/api";
import type { User } from "../../api/user";

  onMounted(async () => {
    state.allUsers = await api.getAllUsers();
  });

  const state = reactive({
    allUsers: [] as User[]
  });

</script>

