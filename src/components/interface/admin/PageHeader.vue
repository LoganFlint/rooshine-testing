<template>
  <div
    :class="[
      'max-w-7xl py-6 pr-12 flex items-center',
      {
        'justify-between': profile || button || title,
        'border-b border-unicornSilver': !barrels && !members && !barrelInfo && !auctions && !memberInfo,
        'flex justify-start': memberInfo
      },
    ]"
  >
    <div
      v-if="name"
      data-cy="admin-welcome-name"
      class="pl-10 font-serif font-bold text-[32px]"
    >
      Welcome Back, {{ name }}
    </div>

    <div
      v-if="title"
      class="font-serif font-bold text-3xl pl-10 pr-5"
      data-cy="title"
    >
      {{ title }}
    </div>

    <div
      v-if="barrelInfo"
      class="pt-6 pl-10"
    >
      <router-link :to="{ name: 'admin.barrels' }">
        <div class="flex items-center">
          <img
            src="../../../assets/link_arrow_left.svg"
            alt="chevron right"
          >
          <div class="pl-2 pb-0.5 font-source font-semibold text-planetOfTheApes">
            Back
          </div>
        </div>
      </router-link>
      <div class="flex items-center h-12 mt-5">
        <div class="font-serif font-bold text-[32px] pr-4">
          ID #{{ barrelId }}
        </div>
        <BarrelStatusDropdown :barrel-id="barrelId" />
      </div>
    </div>

    <div class="flex items-center">
      <router-link
        v-if="profile"
        data-cy="profile-button"
        :to="{ name: 'profile' }"
      >
        <img
          class="mr-5"
          src="../../../assets/user.svg"
          alt="user image"
        >
      </router-link>

      <MainButton
        v-if="button"
        data-cy="create-auction"
        class="mr-10"
        label="create auction"
        bg-color="outline"
        text-color="black"
        @click="$emit('createAuction')"
      />
    </div>

    <div
      v-if="memberInfo"
      class="pt-6 pl-10"
    >
      <router-link :to="{ name: 'admin.members' }">
        <div data-cy="member-info-back" class="flex items-center">
          <img
            src="../../../assets/link_arrow_left.svg"
            alt="chevron right"
          >
          <div class="pl-2 pb-0.5 font-source font-semibold text-planetOfTheApes">
            Back
          </div>
        </div>
      </router-link>
      <div class="flex items-center h-12 mt-5">
        <div data-cy="member-name" class="font-serif font-bold text-[32px] pr-4">
          {{ memberName }}
        </div>
        <div
          data-cy="member-type"
          :class="[
            'rounded-full  font-source font-semibold text-xs py-1.5 px-3',
            {
              'bg-wildPrimrose': memberStatus === 'BUYER',
              'bg-mountainMint': memberStatus === 'BUYER & SELLER',
              'bg-purpleIllusion': memberStatus === 'SELLER',
            },
          ]"
        >
          {{ memberStatus }}
        </div>
      </div>
    </div>
  </div>

  <div
    v-if="auctions"
    class="pl-10 flex border-b border-unicornSilver"
  >
    <NavLink
      user
      :to="{ name: 'admin.auctions.live' }"
      text="Live"
      class="pr-9"
    />
    <NavLink
      user
      data-cy="upcoming-auctions"
      :to="{ name: 'admin.auctions.upcoming' }"
      text="Upcoming"
      class="pr-9"
    />
    <NavLink
      user
      data-cy="past-auctions"
      :to="{ name: 'admin.auctions.past' }"
      text="Past"
      class="pr-9"
    />
  </div>

  <!-- these links need to turn into sorting buttons for members currently placeholder -->
  <div
    v-if="barrels"
    class="pl-10 flex border-b border-unicornSilver"
  >
    <NavLink
      user
      :to="{ name: 'admin.barrels' }"
      text="All Lots"
      class="pr-9"
    />
    <NavLink
      user
      :to="{ name: 'admin.barrel-info' }"
      text="Submitted"
      class="pr-9"
    />
    <NavLink
      user
      :to="{ name: 'admin.barrel-info' }"
      text="Approved"
      class="pr-9"
    />
    <NavLink
      user
      :to="{ name: 'admin.barrel-info' }"
      text="Listed"
      class="pr-9"
    />
    <NavLink
      user
      :to="{ name: 'admin.barrel-info' }"
      text="Sold"
      class="pr-9"
    />
    <NavLink
      user
      :to="{ name: 'admin.barrel-info' }"
      text="Denied/Archived"
    />
  </div>

  <div
    v-if="barrelInfo"
    class="pl-10 flex border-b border-unicornSilver"
  >
    <NavLink
      user
      :to="{ name: 'admin.barrel-info' }"
      text="Barrel"
      class="pr-9"
    />
    <NavLink
      user
      :to="{ name: 'admin.barrel-bottles' }"
      text="Bottles"
      class="pr-9"
    />
    <NavLink
      user
      :to="{ name: 'admin.barrel-lots' }"
      text="Lots"
      class="pr-9"
    />
  </div>

  <!-- these links need to turn into sorting buttons for members currently placeholder -->
  <div
    v-else-if="members"
    class="pl-10 flex border-b border-unicornSilver"
  >
    <NavLink
      user
      :to="{ name: 'admin.members' }"
      text="All"
      class="pr-9"
    />
    <NavLink
      user
      :to="{ name: 'admin.member.info' }"
      text="Buyers"
      class="pr-9"
    />
    <NavLink
      user
      :to="{ name: 'admin.member.info' }"
      text="Sellers"
      class="pr-9"
    />
    <NavLink
      user
      :to="{ name: 'admin.member.info' }"
      text="Buyers & Sellers"
      class="pr-9"
    />
    <NavLink
      user
      :to="{ name: 'admin.member.info' }"
      text="Deactivated"
      class="pr-9"
    />
    <NavLink
      user
      :to="{ name: 'admin.member.info' }"
      text="Frozen"
    />
  </div>

  <div
    v-if="memberInfo"
    class="pl-10 flex border-b border-unicornSilver"
  >
    <NavLink
      user
      :to="{ name: 'admin.member.info' }"
      text="Member Info"
      class="pr-9"
    />
    <NavLink
      user
      data-cy="member-tokens"
      :to="{ name: 'admin.member.tokens' }"
      text="Tokens"
      class="pr-9"
    />
    <NavLink
      user
      :to="{ name: 'admin.member.activity' }"
      text="Activity/History"
      class="pr-9"
    />
    <NavLink
      user
      :to="{ name: 'admin.member.listings' }"
      text="Listings"
      class="pr-9"
    />
  </div>
</template>

<script setup lang="ts">

defineProps({
  name: { type: String, default: "" },
  memberName: { type: String, default: "" },
  memberStatus: { type: String, default: "" },
  title: { type: String, default: "" },
  barrelId: { type: String, default: "" },
  button: Boolean,
  profile: Boolean,
  lots: Boolean,
  members: Boolean,
  memberInfo: Boolean,
  barrels: Boolean,
  barrelInfo: Boolean,
  auctions: Boolean
});

defineEmits(["createAuction"]);

</script>
