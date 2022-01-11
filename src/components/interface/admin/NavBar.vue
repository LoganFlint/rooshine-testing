<template>
  <div class="border-b pb-10 border-unicornSilver pt-10 max-w-6xl flex items-center justify-between pr-14 pl-10">
    <div>{{ title }}</div>
    <div class="flex items-center">
      <img
        class="pr-5"
        src="../../../assets/user.svg"
        alt="profile icon"
      >
      <MainButton
        label="create auction"
        class=""
        type="submit"
        bg-color="outline"
        text-color="black"
      />
      <!-- :loading="processing"
        :disabled="processing" -->
    </div>
  </div>
</template>

<script setup lang = "ts">

  defineProps({
    title: { type: String, required: true },
  });

</script>
