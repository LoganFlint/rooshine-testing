<template>
  <div>
    <div
      v-if="store.user.barrels == undefined"
      class="pt-4"
    >
      <div
        class="pr-7 font-source text-lg pb-6"
      >
        Interested in selling with RooShine? Request a barrel evaluation with us.
      </div>
      <MainButton
        v-if="store.user.barrels == undefined"
        class="py-1.5"
        label="request"
        bg-color="outline"
        text-color="red"
        @click="createBarrel"
      />
    </div>

    <div
      v-for="(barrel, i) in store.user.barrels"
      :key="i"
    >
      <div
        v-if="barrel.status === 'approved'"
        class="font-source text-lg pt-5"
      >
        Approved Barrels
      </div>
      <div
        v-else-if="barrel.status === 'denied'"
        class="font-source text-lg pt-5"
      >
        Denied Barrels
      </div>
      <div
        v-else
        class="font-source text-lg pt-5"
      >
        Pending Barrels
      </div>
      <div class="bg-speedOfLight mt-4 pt-4">
        <div class="pl-4 border-b border-unicornSilver pb-4 flex">
          <div class="relative">
            <img
              src="../../../assets/live_auction_img.png"
              alt="bottle for auction approval"
              class="w-14 h-14"
            >
            <img
              v-if="barrel.status === 'approved'"
              class="absolute bottom-11 left-10"
              src="../../../assets/approval.svg"
              alt="green check mark"
            >
            <img
              v-else-if="barrel.status === 'denied'"
              class="absolute bottom-11 left-10"
              src="../../../assets/denial.svg"
              alt="green check mark"
            >
          </div>

          <div class="pl-4">
            <div
              v-if="barrel.status != 'pending'"
              class="font-source text-xs pb-1.5"
            >
              {{ barrel.bottlesRemaining }} / {{ barrel.bottleCount }} Bottles
            </div>
            <div
              v-if="barrel.status === 'pending'"
              class="font-source text-xs pb-1.5"
            >
              Barrel Volume: {{ barrel.strength }}
            </div>
            <div
              v-if="barrel.status === 'approved' || 'pending'"
              class="font-serif font-bold text-xs"
            >
              {{ barrel.description }}
            </div>
          </div>
        </div>
        <div
          v-if="barrel.status === 'denied'"
          class="bg-white mx-4 mt-3.5 rounded px-4 pt-4"
        >
          <div
            v-for="(review, j) in barrel.reviews"
            :key="j"
            class="font-source font-semibold text-xs pb-2.5"
          >
            {{ review.reviewerName }}
            <div class="font-source text-xs pb-8 pr-3">
              {{ review.reviewerComment }}
            </div>
          </div>
        </div>
        <div class="mx-4">
          <MainButton
            v-if="barrel.status === 'pending'"
            class="my-4 w-full py-2"
            label="create listing"
            bg-color="outline"
            text-color="red"
            :disabled="barrel.status === 'pending'"
          />
          <MainButton
            v-if="barrel.status === 'approved'"
            data-cy="create-listing"
            class="my-4 w-full py-2"
            label="create listing"
            bg-color="outline"
            text-color="red"
            @click="createLot(i)"
          />

          <div>
            <MainButton
              v-if="barrel.status === 'denied'"
              class="mt-3.5 w-full py-2"
              label="re-evaluate"
              bg-color="outline"
              text-color="red"
            />
            <div class="pt-3 pb-6 text-center">
              <a
                data-cy="contact-rooshine"
                href="mailto:info@drinkrooshine.com"
                class="uppercase text-planetOfTheApes font-source font-semibold text-xs"
              >contact rooshine</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import { useStore } from "../../../store"

defineProps({
  approvedBottles: { type: Number, default: 0 },
  requestedBottles: { type: Number, default: 0 },
  bottleName: { type: String, default: "" },
});

const emit = defineEmits(["addLot", "addBarrel"]);
const store = useStore()

function createLot(barrelIndex: number) {
  emit("addLot", store.user.barrels?[barrelIndex] : 0)
}

function createBarrel() {
  emit("addBarrel")
}

</script>
