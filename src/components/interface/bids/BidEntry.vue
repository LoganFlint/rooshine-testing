<template>
  <div>
    <div class="flex items-center mb-4">
      <img
        v-if="entry.type == 'bid' && entry.name != 'You'"
        src="../../../assets/megaphone.svg"
        class="w-11 p-2 rounded-full border border-white"
      >
      <img
        v-if="entry.name == 'You'"
        src="../../../assets/megaphone_brown.svg"
        class="w-11 p-2 rounded-full border border-pastelYellow bg-pastelYellow"
      >
      <img
        v-if="entry.type == 'time'"
        src="../../../assets/auction_extended.svg"
        class="w-11 p-2 rounded-full border border-white"
      >
      <!-- TODO fix the padding so it doesn't chop this icon ^ -->

      <div class="flex w-full justify-between">
        <div
          v-if="entry.type == 'bid'"
          class="ml-2"
          :class="{ 'text-pastelYellow': entry.name == 'You' }"
        >
          <div>{{ entry.name }}</div>
          <div class="text-xs">
            {{ entry.time }}
          </div>
        </div>
        <div
          v-if="entry.type == 'time'"
          class="ml-2"
        >
          <div>Time Extended</div>
          <div class="text-xs">
            {{ entry.added }} Added
          </div>
        </div>
      </div>
      <div :class="{ 'text-pastelYellow': entry.name == 'You' }">
        {{
          entry.amount.toLocaleString(undefined, {
            maximumFractionDigits: 2,
          })
        }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

defineProps({ entry: { type: Object, required: true } });

</script>
