<template>
  <div
    data-cy="admin-lot-list-table"
    class="py-6"
  >
    <table class="cursor-default w-full border border-unicornSilver rounded">
      <thead class="w-full bg-unicornSilver">
        <tr
          class="pr-4 bg-opacity-30 text-left font-source font-semibold text-xs h-10"
        >
          <th
            class="pl-4 cursor-pointer"
            @click="sortBarrels"
          >
            <div class="flex items-center">
              <div class="pr-1 cursor-pointer">
                BARREL ID
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
          <th>NAME OF BARREL</th>
          <th>SELLER</th>
          <th>DATE SUBMITTED</th>
          <th />
          <th />
        </tr>
      </thead>
      <tbody
        v-for="(barrel, i) in paginated"
        :key="i"
        class="border-b border-unicornSilver text-left hover:bg-speedOfLight"
      >
        <tr
          class="h-12 font-source text-sm pl-4"
          @click="handleRedirect(barrel.barrelId)"
        >
          <td class="pl-4">
            {{ barrel.barrelId }}
          </td>
          <td>{{ barrel.title }}</td>
          <td>{{ barrel.userFullName }}</td>
          <td>
            {{ new Date(barrel.createdAt).toDateString() }}
          </td>
          <td class="text-[11px] font-semibold">
            <div
              :class="[
                'text-center mr-5 py-0.5 whitespace-nowrap rounded-full ml-auto',
                {
                  'bg-wildPrimrose w-20': barrel.status == 'submitted',
                  'bg-loveSpell w-14': barrel.status == 'denied',
                  'bg-purpleIllusion w-14': barrel.status == 'listed',
                  'bg-mountainMint w-20': barrel.status == 'approved',
                  'bg-coralBisque w-24': barrel.status == 'under review',
                  'bg-superSilver w-12': barrel.status == 'sold',
                },
              ]"
            >
              {{ barrel.status }}
            </div>
          </td>
          <td>
            <div class="mr-4">
              <img
                class="cursor-pointer"
                src="../../../../assets/menu_list_button.svg"
                alt="menu button"
              >
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <div
      class="pt-6 pb-10 font-source font-light text-sm flex justify-between items-center"
    >
      <div>{{ calculateItem }} of {{ state.barrels.length }}</div>
      <div class="flex items-center">
        <div
          class="items-center flex transition-all duration-300"
          :class="{
            'opacity-100': state.current !== 0,
            'opacity-50': state.current == 0
          }"
        >
          <img
            class="w-3 h-3 mr-2 cursor-pointer"
            src="../../../../assets/double_left.svg"
            alt="double-left chevron"
            @click="first"
          >
          <img
            class="mr-2"
            src="../../../../assets/arrow_left.svg"
            alt="arrow right"
            @click="previous"
          >
        </div>
        <div
          v-for="i in state.pageNumber"
          :key="i"
        >
          <div
            class="transition-all duration-300 mr-4 cursor-pointer"
            :class="{
              'text-planetOfTheApes font-semibold border border-planetOfTheApes px-2 py-1': state.current + 1 == i
            }"
            @click="selectPageNumbers(i)"
          >
            {{ i }}
          </div>
        </div>
        <div
          class="items-center flex transition-all duration-300"
          :class="{
            'opacity-100': state.current !== state.last,
            'opacity-50': state.current == state.last
          }"
        >
          <img
            class="rotate-180 mr-2"
            src="../../../../assets/arrow_left.svg"
            alt="arrow right"
            @click="next"
          >
          <img
            class="w-3 h-3 cursor-pointer"
            src="../../../../assets/double_right.svg"
            alt="double-right chevron"
            @click="last"
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import router from "../../../../router";
  import type { PropType } from "vue";
  import type { CurrentBarrel } from "../../../../api/barrel";
  import { useStore } from "../../../../store";
  const store = useStore();

  const emit = defineEmits(["sorted", "barrelData"]);

  onMounted(async () => {
    state.barrels = await store.getBarrels();
    pageNumbers();
  });

  defineProps({
    modelValue: {
      type: Array as PropType<Array<CurrentBarrel>>,
      required: true,
    },
  });

  let state = reactive({
    sortBy: "ascending" || "descending" || "clear",
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
    pageSize: 10,
    current: 0,
    previous: -1,
    next: 1,
    first: 0,
    last: 0,
    pageNumber: [] as number[],
    /** possibly be of use when back end has their pagination going for us  */
    // startIndex: 0,
    // endIndex: 0,
  });

function pageNumbers() {
  state.pageNumber = Array.from(
    { length: Math.ceil(state.barrels.length / 10) },
    (_, i) => i + 1
  );
  state.last = state.pageNumber.length - 1;
}

function selectPageNumbers(index: number) {
  state.current = index -= 1
  state.next = index += 1
  state.previous = index -= 1
}

const paginated = computed(() => {
  return state.barrels.slice(
    state.current * state.pageSize,
    state.current * state.pageSize + state.pageSize
  ) as CurrentBarrel[];
});

  const calculateItem = computed(() => {
    const startIndex = (state.current * state.pageSize) + 1;
    return `${startIndex} - ${startIndex + (paginated.value.length - 1)}`;
  })

  function previous(): void {
    if (state.current == 0) return;
    else if (state.previous == 0) {
      state.current -= 1;
      state.previous = -1;
      state.next -= 1;
    } else {
      state.current -= 1;
      state.previous -= 1;
      state.next -= 1;
    }
  }

  function next(): void {
    if (state.current == state.last) return;
    if (state.next == state.last) {
      state.current += 1;
      state.previous += 1;
      state.next = state.last;
    } else {
      state.current += 1;
      state.previous += 1;
      state.next += 1;
    }
  }

  function first(): void {
    state.current = 0;
    state.previous = -1;
    state.next = 1;
  }

  function last(): void {
    state.current = state.last;
    state.previous = state.current - 1;
    state.next = state.last;
  }

  function sortBarrels(): void {
    switch (state.sortBy) {
      case "ascending":
        state.barrels = state.barrels.sort((current, next) =>
          current.barrelId > next.barrelId
            ? 1
            : next.barrelId > current.barrelId
            ? -1
            : 0
        );
        state.sortBy = "descending";
        emit("sorted", state.barrels);
        break;
      case "descending":
        state.barrels = state.barrels.sort((current, next) =>
          current.barrelId < next.barrelId
            ? 1
            : next.barrelId < current.barrelId
            ? -1
            : 0
        );
        state.sortBy = "clear";
        emit("sorted", state.barrels);
        break;
      case "clear":
        state.barrels = [
          {
            barrelId: "",
            userId: "",
            userFullName: "",
            title: "",
            status: "",
            createdAt: "",
            updatedAt: "",
          },
        ] as CurrentBarrel[];
        state.sortBy = "ascending";
        emit("sorted", state.barrels);
        break;
      default:
        throw new Error("There is an issue in sortMembersList");
    }
  }

  async function handleRedirect(barrelId: string ) {
    await router.push({
      name: "admin.barrel-info",
      params: { barrelId: barrelId },
    });
  }

</script>
