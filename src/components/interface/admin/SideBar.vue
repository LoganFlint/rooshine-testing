<template>
  <div>
    <nav class="w-64 fixed z-50 bg-white flex flex-col justify-between border-r border-unicornSilver min-h-screen overflow-y-hidden">
      <div class="w-full pl-12 pr-10 border-r border-unicornSilver">
        <router-link :to="{name: 'marketing'}">
          <img
            class="mb-6 mt-8 cursor-pointer"
            src="../../../assets/rooshine_logo.png"
            alt="logo"
          >
        </router-link>
        <NavLink
          data-cy="admin-home-tab"
          admin
          :to="{name: 'admin.home'}"
          text="Home"
        />
        <div>
          <NavLink
            admin
            notification="21"
            :to="{name: 'admin.barrels'}"
            text="Barrels"
            data-cy="admin-barrels-link"
          />
        </div>
        <NavLink
          data-cy="admin-auctions-tab"
          admin
          :to="{name: 'admin.auctions.live'}"
          text="Auctions"
        />
        <NavLink
          admin
          data-cy="admin-members-tab"
          :to="{name: 'admin.members'}"
          text="Members"
        />
      </div>
      <router-link
        class="py-4 px-10 text-center border-t border-unicornSilver text-planetOfTheApes cursor-pointer"
        :to="{name: 'marketing'}"
      >
        Sign Out
      </router-link>
    </nav>

    <div class="ml-64 max-w-7xl">
      <router-view name="adminSidebar" />
    </div>
  </div>
</template>
