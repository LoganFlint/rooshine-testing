<template>
  <div class="rounded-xl bg-speedOfLight m-5">
    <div>
      <img
        class="mx-auto pt-9"
        src="../../../assets/gavel.svg"
        alt="gavel"
      >
      <div class="text-planetOfTheApes font-serif font-bold mx-auto text-center px-32 pt-5 pb-4">
        You haven’t participated in any auctions yet.
      </div>
      <div class="font-source text-sm text-center mx-auto px-28 pb-8">
        Once you start watching and bidding on listings, they will appear here.
      </div>
      <div class="mx-auto w-72">
        <router-link
          class="font-source underline text-xs font-semibold"
          :to="{ name: 'live.auction' }"
        >
          <MainButton
            data-cy="go-to-auctions"
            label="go to auctions"
            bg-color="outline"
            text-color="red"
            class="w-full mb-14 py-1.5"
          />
        </router-link>
      </div>
    </div>
  </div>
</template>
