<template>
  <div class="mb-28">
    <PageHeader
      title="Auctions"
      auctions
      button
    />
    <div class="px-10">
      <div class="pt-10 flex items-center justify-between">
        <div>
          <div class="font-serif font-bold text-2xl pb-3">
            Auction Name
          </div>
          <div class="font-source text-xl">
            {{ beginDate.toDateString().substr(4, 3) }}
            {{ beginDate.getDate() }}
            {{ beginDate.getFullYear() }} -

            {{ endDate.toDateString().substr(4, 3) }}
            {{ endDate.getDate() }}
            {{ endDate.getFullYear() }}
          </div>
        </div>
        <div class="flex">
          <MainButton     
            class="py-1 w-28 mr-2"
            label="delete"
            bg-color="outline"
            text-color="red"
            custom-px
            @click="deleteAuction"
          />
          <MainButton     
            class="py-1 w-28"
            label="edit"
            bg-color="outline"
            text-color="red"
            custom-px

            @click="editAuction"
          />
        </div>
      </div>

      <div
        data-cy="admin-live-auction-tiles"
        class="pt-9 flex justify-between items-center"
      >
        <AdminLiveAuctionTile
          lot
          :lot-count="126"
          class=""
        />
        <AdminLiveAuctionTile
          participant
          :participants="251"
          class=""
        />
        <AdminLiveAuctionTile
          total-revenue
          :revenue="240620"
        />
      </div>

      <LotStatus />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  beginDate: {type: Date, default: new Date},
  endDate: {type: Date, default: new Date}
})

function editAuction() {
  console.log("clicked edit auction")
}

function deleteAuction() {
  console.log("clicked edit auction")
}
</script>
