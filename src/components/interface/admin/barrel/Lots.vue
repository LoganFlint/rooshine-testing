<template>
  <table
    data-cy="admin-members-listings-table"
    class="cursor-default w-full border border-unicornSilver rounded"
  >
    <thead class="w-full bg-unicornSilver">
      <tr
        class="
            pr-4
            bg-opacity-30
            text-left
            font-source font-semibold
            text-xs
            h-10
          "
      >
        <th
          class="pl-4 cursor-pointer"
          @click="sortMemberListings"
        >
          <div class="flex items-center">
            <div class="pr-1">
              LOT ID
            </div>
            <img
              class="transition-all duration-300 w-1.5 h-1"
              :class="{
                '-rotate-180': state.sortBy !== 'ascending'
              }"
              src="../../../../assets/arrow_down_table.svg"
              alt="down arrow"
            >
          </div>
        </th>
        <th>NAME OF BARREL</th>
        <th>QTY</th>
        <th>STATUS</th>
        <!-- <th /> -->
      </tr>
    </thead>
    <tbody
      v-for="(lot, i) in modelValue"
      :key="i"
      class="border-b border-unicornSilver text-left hover:bg-speedOfLight"
    >
      <tr
        class="h-12 font-source text-sm pl-4"
      >
        <td class="pl-4">
          <div> 
            {{ parseInt(lot.lotId) }}
          </div>
        </td>
        <td>{{ lot.productName }}</td>
        <td class="w-24">
          {{ lot.qty }}
        </td>
        <td class="text-[11px] font-semibold">
          <div
            :class="[
              'text-center mr-5 py-0.5 whitespace-nowrap rounded-full ',
              {
                'border border-wildPrimrose w-20': lot.type == 'REQUESTED',
                'bg-coralBisque w-14': lot.type == 'PENDING',
                'bg-purpleIllusion w-14': lot.type == 'LISTED',
              },
            ]"
          >
            {{ lot.type }}
          </div>
        </td>
        <!-- <td>
          <div class="mr-4">
            <img
              class="cursor-pointer"
              src="../../../../assets/bid_arrow_right.svg"
              alt="menu button"
            >
          </div>
        </td> -->
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">

import type { PropType } from "vue";
import type { AdminLot } from "../../../../api/lot";

const props = defineProps({
  modelValue: { type: Array as PropType<Array<AdminLot>>, required: true },
});

const state = reactive({
  sortBy: "ascending" || "descending" || "clear",
  memberListings: props.modelValue,
})

const emit = defineEmits(['sorted'])

function sortMemberListings() {
   switch (state.sortBy) {
    case "ascending":
      state.memberListings = state.memberListings.sort((current, next) => (current.lotId > next.lotId) ? 1 : ((next.lotId > current.lotId) ? -1 : 0));
      state.sortBy = "descending"
      emit("sorted", state.memberListings);
      break;
    case "descending":
      state.memberListings = state.memberListings.sort((current, next) => (current.lotId < next.lotId) ? 1 : ((next.lotId < current.lotId) ? -1 : 0));
      state.sortBy = "clear";
      emit("sorted", state.memberListings);
      break;
    case "clear":
      state.memberListings = props.modelValue;
      state.sortBy = "ascending";
      emit("sorted", state.memberListings);
      break;
    default:
      throw new Error("There is an issue in sortMembersList");
  }
}
</script>
