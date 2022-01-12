
<template>
  <div
    data-cy="barrel-status-dropdown"
    :class="[
      'rounded-full flex items-center py-2 px-4 cursor-pointer w-24',
      {
        'border border-wildPrimrose': selectedBarrelStatus === 'requested',
        'bg-wildPrimrose ': selectedBarrelStatus === 'approved',
        'bg-coralBisque ': selectedBarrelStatus === 'denied',
        'bg-mountainMint': selectedBarrelStatus === 'delivered',
      },
    ]"
    @click="openEditBarrelMenu"
  >
    <div class="text-xs font-source font-semibold pr-2.5">
      {{ `${selectedBarrelStatus.charAt(0).toUpperCase() + selectedBarrelStatus.slice(1)}` }}
    </div>
    <img
      src="../../../../assets/down_pointer.svg"
      alt="down chevron"
    >
  </div>
  <EditBarrelStatus
    v-model="selectedBarrelStatus"
    :is-open="showEditBarrel"
    :options="adminBarrelStatusOptions"
    @select-item="editMenuSelected"
    @close="handleOutside"
  />
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import api from "../../../../api/api";
const route = useRoute();
let barrelId = route.params.barrelId.toString();

const props = defineProps({
  barrelId: { type: String, default: "" }
});

onMounted(async () => {
    state.barrel = await api.getBarrelById(barrelId);
    selectedBarrelStatus.value = state.barrel.status
  })

 const state = reactive({
     barrel: {
      status: ""
    },
  })


const showEditBarrel = ref(false);
const selectedBarrelStatus = ref("");

const adminBarrelStatusOptions = {
  denied: "denied",
  requested: "requested",
  approved: "approved",
  delivered: "delivered",
};

const editDialogOpen = {
  denied: ref("denied"),
  requested: ref("requested"),
  approved: ref("approved"),
  delivered: ref("delivered"),
};

async function editMenuSelected( type: "denied" | "requested" | "approved" | "delivered" ) {
  showEditBarrel.value = false;
  selectedBarrelStatus.value = editDialogOpen[type].value;
  if (selectedBarrelStatus.value == "approved") {
    await api.approveBarrel(props.barrelId)
    state.barrel.status = selectedBarrelStatus.value
  } else {
    state.barrel.status = selectedBarrelStatus.value
    return 
  }
}

function openEditBarrelMenu() {
  showEditBarrel.value = true;
}
function handleOutside() {
  showEditBarrel.value = false;
}

</script>
