<template>
  <div class="pt-10 px-14">
    <div class="flex justify-between items-center">
      <h1
        data-cy="welcome-username"
        class="font-serif font-bold text-5xl pb-3"
      >
        Hello{{ store.user.displayName ? ` ${store.user.displayName}, ` : "," }}
      </h1>
      <div
        data-cy="profile-admin-buttons"
        class="flex"
      >
        <router-link :to="{ name: 'admin.home' }">
          <MainButton
            v-if="isAdmin == true"
            data-cy="admin-button"
            class="py-2 px-5 mr-5"
            label="admin"
            bg-color="red"
            text-color="white"
          />
        </router-link>
        <MainButton
          data-cy="sign-out"
          class="py-2 px-5"
          label="sign out"
          bg-color="outline"
          text-color="red"
          :disabled="state.logoutProcessing"
          :loading="state.logoutProcessing"
          @click="logout"
        />
      </div>
    </div>

    <div class="pt-3 flex justify-between">
      <div class="flex flex-col">
        <FinalizeAddressCard
          v-model="store.user"
          profile
          @change-password="changePasswordModal"
        />

        <PaymentMethods
          @add-payment="openPaymentModal"
        />
        <Notifications />
      </div>

      <div>
        <MyAuctionsParent />
        <GetStarted class="mt-6" />
      </div>

      <div class="flex flex-col">
        <div class="py-7 px-7 max-w-xs border border-unicornSilver rounded">
          <div class="flex justify-between">
            <div class="font-serif font-bold text-2xl">
              Inventory
            </div>
            <MainButton
              data-cy="create-barrel"
              class="py-1.5"
              label="request"
              bg-color="outline"
              text-color="red"
              @click="goToBarrel"
            />
          </div>
          <InventoryCard
            @add-lot="openAddLotModal"
            @add-barrel="goToBarrel"
          />
        </div>
      </div>
    </div>
    <ProfileModalManager
      :data-obj="dataObj"
      :open-trigger="openTrigger"
    />
  </div>
</template>

<script setup lang="ts">

import type { Lot } from "../../api/lot"
import type { Barrel } from "../../api/barrel"
import router from "../../router"
import { useStore } from "../../store"
import type { User } from "../../api/user"

export interface RouteNameData {
	routeName: string
	data?: {
		barrel: Barrel
		lot: Lot
	}
}

defineProps({ userName: { type: String, default: "Brandon" } });

const userId = ref("");
const isAdmin = ref(false)

const store = useStore()
const state = reactive({
  logoutProcessing: false,
})


onMounted(async () => {
	await store.getCurrentUser().then((user: User) => {
		userId.value = user.userId;
		isAdmin.value = user.isAdmin
	});
});

store.getCurrentUser().catch(async () => {
	await router.push({ name: "marketing" })
})
const openTrigger = ref(false)
const dataObj = reactive<RouteNameData>({
	routeName: "",
})

async function goToBarrel() {
	await router.push({ name: "create-barrel.info" })
}

function openAddLotModal(barrel: Barrel) {
	dataObj.routeName = "addLotModal"
	const lot: Lot = {
		name: "",
		lotNumber: 0,
		startDate: new Date().toISOString(),
		endDate: new Date().toISOString(),
		images: [],
		highestBid: {
			date: new Date().toISOString(),
			userName: "",
			amount: 0,
			purchased: 0,
			userId: "",
		},
		barrel: {
			barrelId: "",
			userId: "",
			title: "",
			description: "",
			distilleryName: "",
			distilleryLocation: "",
			type: "",
			age: "",
			sizeMl: 0,
			strength: "",
			media: [],
			createdAt: new Date().toISOString(),
			approved: false,
			status: "denied",
			images: {
				front: "",
				back: "",
				additional: [],
			},
			lots: [],
			bottleCount: 0,
			bottlesRemaining: 0,
			reviews: [],
			bottles: {},
		},
		bids: [],
		userId: "",
		sold: false,
		minPrice: 0,
		startPrice: 0,
		bottles: {},
	}
	dataObj.data = { barrel, lot }
	openTrigger.value = !openTrigger.value
}

function openPaymentModal() {
	delete dataObj.data
	dataObj.routeName = "add.payment"
	openTrigger.value = !openTrigger.value
}

async function logout() {
	state.logoutProcessing = true
	await store.logout().then(async () => {
		state.logoutProcessing = false
		await router.push({ name: "marketing" })
	})
		.catch(error => {
			console.log("error", error)
		})
}

function changePasswordModal() {
	delete dataObj.data
	dataObj.routeName = "changePasswordModal"
	openTrigger.value = !openTrigger.value
}

</script>
