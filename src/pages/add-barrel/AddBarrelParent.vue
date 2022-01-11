<template>
  <div class="max-w-5xl h-auto border mx-auto pt-14 border-unicornSilver mb-5 pb-28 rounded">
    <div class="pl-12">
      <div class="font-serif font-bold text-4xl">
        Request Valuation
      </div>
      <div
        class="font-source text-lg pt-3"
      >
        All whisky products must be reviewed by RooShine before it goes to auction.
      </div>
    </div>
    <div class="pl-12 pt-10 flex">
      <div class="mr-5 flex">
        <AddBarrelTabs
          :steps="steps"
          :current-index="state.currentIndex"
        />
        <router-view
          :images="state.images"
          :image-urls="state.imageURLs"
          :barrel-patch="state.barrelPatch"
          :reserve-price="state.reservePrice"
          @update-reserve-price="updateReservePrice"
          @update-barrel-info="updateBarrel"
          @update-images="updateImages"
          @continue="continueNext"
          @return-to-form="returnToForm"
        />
      </div>
    </div>
  </div>
  <Modal
    blur
    :is-open="state.showRegistrationIncompleteModal"
    @close="router.push({ name: 'register' })"
  >
    <div class="bg-white p-8 justify-center">
      <div class="font-serif text-xl font-bold m-auto mb-4 text-center">
        Registration Incomplete!
      </div>
      <div class="text-center">
        You need to finish your registration before you can submit a barrel request!
      </div>
      <MainButton
        class="m-auto mt-6"
        label="FINISH REGISTRATION"
        @click="router.push({ name: 'register' })"
      />
    </div>
  </Modal>
</template>

<script setup lang="ts">

import { onBeforeRouteUpdate } from "vue-router";
import { useStore } from "../../store";
import router from "../../router";

import type { Barrel, BarrelPatch } from "../../api/barrel";

export interface BarrelImages {
	front: Media,
	back: Media,
	additional?: Media[] | null,
}

interface Media {
	file?: File | null,
	mediaId?: string | null
}

export interface BarrelDetails {
	barrelPatch: BarrelPatch,
	barrelId: string,
	images: BarrelImages,
	imageURLs: string[]
}

const store = useStore();

/** update currentIndex on forward/back navigation */
onBeforeRouteUpdate(to => {
	if (to.name && state.currentIndex !== routes.indexOf(to.name.toString())) state.currentIndex = routes.indexOf(to.name.toString());
});

/** correct currentIndex from a reload */
onMounted(async () => {
	const onboardingStep = (await store.getCurrentUser()).onboardingStep;
	if (onboardingStep && onboardingStep !== "account") state.showRegistrationIncompleteModal = true;
	if (router.currentRoute.value.name != null && router.currentRoute.value.name !== routes[state.currentIndex]) state.currentIndex = routes.indexOf(router.currentRoute.value.name.toString());
});

const state = reactive({
	reservePrice: 0,
	currentIndex: 0,
	barrel: undefined as Barrel | undefined,
	images: {
		front: null as File | null,
		back: null as File | null,
		additional: [] as File[]
	} as BarrelImages,
	barrelPatch: undefined as BarrelPatch | undefined,
	imageURLs: [] as string [],
	showRegistrationIncompleteModal: false
});

const steps = ["Barrel Information", "Upload Documents", "Upload Photos", "Reserve Price", "Review & Send"];
const routes = ["create-barrel.info", "create-barrel.documents", "create-barrel.photos", "create-barrel.reserve", "create-barrel.send"];

async function continueNext(barrelId: string, fromRoute: string) {
	const fromIndex = routes.indexOf(fromRoute);
	await router.push({
		name: routes[fromIndex + 1],
		params: { 
			barrelId, 
			reservePrice: state.reservePrice, 
			title: state.barrel?.title,
			description: state.barrel?.description,
			distillery: state.barrel?.distilleryName,
			location: state.barrel?.distilleryLocation,
			type: state.barrel?.type,
			age: state.barrel?.age,
			size: state.barrel?.sizeMl,
			strength: state.barrel?.strength,
		},
	});
}

function updateReservePrice(price: number): void {
	state.reservePrice = isNaN(Number(price.toLocaleString().replaceAll(",", "")))? 0 : Number(price.toLocaleString().replaceAll(",", ""));
}

function updateBarrel(barrel: Barrel): void {
	state.barrel = barrel;
}

function updateImages(images: BarrelImages): void {
	state.images = images;
}

async function returnToForm(barrelDetails: BarrelDetails): Promise<void> {
	state.currentIndex = 0;
	state.barrelPatch = barrelDetails.barrelPatch;
	state.images = barrelDetails.images;
	state.imageURLs = barrelDetails.imageURLs;
	await router.push({ name: "create-barrel.info", params: { revising: "true", barrelId: barrelDetails.barrelId } });
}

</script>
