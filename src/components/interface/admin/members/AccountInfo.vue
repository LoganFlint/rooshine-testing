<template>
  <div class="border border-unicornSilver rounded-sm pt-10 px-7 h-auto w-96">
    <div class="font-serif font-bold pb-7 text-xl">
      Account Info
    </div>
    <div class="border-b border-unicornSilver pb-4 flex items-center justify-between">
      <div class="font-source font-semibold">
        Member Since
      </div>
      <div class="w-1/2 text-right">
        2007
      </div>
    </div>

    <div class="border-b border-unicornSilver py-4 flex items-center justify-between">
      <div class="font-source font-semibold">
        Last Visit
      </div>
      <div class="w-1/2 text-right">
        {{ lastvisited.toDateString().substr(4, 3) }}
        {{ lastvisited.getDate() }}
        {{ lastvisited.getFullYear() }}
      </div>
    </div>

    <div class=" py-4 flex items-center justify-between">
      <div class="font-source font-semibold">
        Admin Permissions
      </div>
      <ToggleNotification
        v-model="isAdmin"
        data-cy="toggle-isAdmin"
      />
    </div>

    <MainButton    
      data-cy="send-password-reset"      
      class="py-1  my-6"
      label="send password reset"
      bg-color="outline"
      text-color="red"
      @click="sendPasswordReset"
    />
  </div>
</template>

<script setup lang="ts">
const isAdmin = ref(false)
const lastvisited = ref(new Date)

function sendPasswordReset() { 
  console.log("clicked sendPasswordReset")
}
</script>
