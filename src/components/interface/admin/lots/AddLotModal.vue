<template>
  <SignBaseModal
    blur
    :is-open="true"
    @close="closeModal"
  >
    <div data-cy="create-auction-modal" class="max-h-screen overflow-auto px-10 pb-10 bg-speedOfLight">
      <div data-cy="admin-create-auction-title" class="pt-5 pr-40 font-serif font-bold text-5xl">
        Create/Edit Auction
      </div>
      <div class="pt-10 pr-10">
        <div class="pb-3 font-source text-lg">
          Name
        </div>
        <TextInput
          v-model="auctionName"
          class="bg-white w-full"
          placeholder="Name of Auction"
          input-type="text"
        />
        {{ auctionName }}
      </div>
      <div class="pt-8 pb-3 font-source text-lg">
        Start-End
      </div>
      <div class="overflow-y-auto pb-10 mb-8 border border-black bg-white">
        <div class="flex">
          <div class="mt-10 px-10 border-r border-unicornSilver">
            <div class="font-source font-semibold text-xs uppercase">
              from
            </div>
            <div class="font-source font-semibold text-xl pb-1">
              <!-- will be range.start -->
              May 9, 2021
            </div>
            <div class="relative items-center h-14 flex">
              <TextInput
                input-type="time"
                class="bg-white w-48"
              />
              <SearchButton calendar />
            </div>

            <div class="pt-8 font-source font-semibold text-xs uppercase">
              to
            </div>
            <div class="font-source font-semibold text-xl pb-1">
              <!-- will be range.end -->
              May 18, 2021
            </div>
            <div class="relative items-center h-14 flex">
              <TextInput
                input-type="time"
                class="bg-white w-48"
              />
              <SearchButton calendar />
            </div>
          </div>
          <div class="pt-10 px-10">
            <Calendar />
          </div>
        </div>
      </div>
      <MainButton
        class="py-3 mx-auto px-44"
        label="continue"
        bg-color="red"
        text-color="white"
        @click="submitAuction"
      />
    </div>
  </SignBaseModal>
</template>

<script setup lang="ts">

   const emit = defineEmits(["close"])
    const auctionName = ref<string>("");

      function closeModal() {
        emit("close");
      }

      function submitAuction() {
        console.log("submitAuction clicked");
        closeModal();
      }

</script>
