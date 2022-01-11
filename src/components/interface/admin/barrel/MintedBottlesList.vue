<template>
  <table class="mt-5 cursor-default w-full border border-unicornSilver rounded">
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
        <th class="pl-4">
          <div class="flex items-center">
            <div
              class="pr-1 cursor-pointer"
              @click="sortMembersList"
            >
              PRICE
            </div>
            <img
              :class="[
                'w-1.5 h-1',
                {
                  'rotate-180': state.sortBy == 'descending',
                },
              ]"
              src="../../../../assets/arrow_down_table.svg"
              alt="down arrow"
            >
          </div>
        </th>
        <th>STATUS</th>
        <th>BUYER</th>
        <th>DATE</th>
        <th class="text-right pr-7">
          BOTTLE NUMBER
        </th>
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
          {{ lot.price }}
        </td>
        <td>{{ lot.type }}</td>
        <td>{{ lot.buyerName }}</td>
        <td>
          {{ lot.dateSubmitted?.toDateString().substr(4, 3) }}
          {{ lot.dateSubmitted?.getDate() }}
          {{ lot.dateSubmitted?.getFullYear() }}
        </td>
        <td class="text-right pr-7">
          {{ lot.bottleNumber }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import type { PropType } from "vue";
import type { AdminLot } from "../../../../api/lot";

const props =  defineProps({
  modelValue: { type: Array as PropType<Array<AdminLot>>, required: true },
});

const state = reactive({
  sortBy: "ascending" || "descending" || "clear",
  bottles: props.modelValue,
})

const emit = defineEmits(["sorted"])

function sortMembersList(): void {
  switch (state.sortBy) {
    case "ascending":
      state.bottles = state.bottles.sort((current, next) => (current.price > next.price) ? 1 : ((next.price > current.price) ? -1 : 0));
      state.sortBy = "descending"
      emit("sorted", state.bottles);
      break;
    case "descending":
      state.bottles = state.bottles.sort((current, next) => (current.price < next.price) ? 1 : ((next.price < current.price) ? -1 : 0));
      state.sortBy = "clear";
      emit("sorted", state.bottles);
      break;
    case "clear":
      state.bottles = props.modelValue;
      state.sortBy = "ascending";
      emit("sorted", state.bottles);
      break;
    default:
      throw new Error("There is an issue in sortMembersList");
  }
}

</script>
