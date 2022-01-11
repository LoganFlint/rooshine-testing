<template>
  <PageHeader
    member-info
    member-name="Brandon Salindo"
    member-status="BUYER"
  />
  <div class="px-10 py-10">
    <div class="relative items-center h-14 flex">
      <TextInput
        input-type="text"
        class="bg-white w-[700px]"
      />
      <SearchButton />
    </div>
    <AccountActivityCard />
  </div>
</template>
