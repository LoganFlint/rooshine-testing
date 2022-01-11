<template>
  <PageHeader
    member-info
    :member-name="state.user.fullName"
    member-status="BUYER"
  />
  <div class="pb-16">
    <div class="flex pt-10 pl-10">
      <div>
        <PersonalInfo class="mr-10" />
      </div>
      <div>
        <AccountInfo />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import api from '../../api/api';
import type { User } from '../../api/user';
const route = useRoute();  
const userId = route.params.userId.toString()

onMounted(async () => {
  state.user = await api.getUserById(userId)
})

const state = reactive({
  user: {} as User,
})
</script>
