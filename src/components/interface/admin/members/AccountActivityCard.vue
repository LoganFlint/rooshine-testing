<template>
  <div
    data-cy="admin-members-account-activity-card"
    class=" pt-5"
  >
    <div class="pl-5 pt-5 pb-8 border border-unicornSilver mb-5">
      <div class="font-source font-semibold text-lg pb-4">
        {{ notificationDateOne.toDateString().substr(4, 3) }}
        {{ notificationDateOne.getDate() }},
        {{ notificationDateOne.getFullYear() }}
      </div>
      <AccountActivityNotification
        user-name="Brandon Salindo"
        lot-number=" 4758693"
        auction-name="2021 Fall Auction"
        :notification-time="notificationDateOne.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })"
      />
    </div>

    <div class="pl-5 pt-5 pb-8 border border-unicornSilver mb-5">
      <div class="font-source font-semibold text-lg pb-4">
        {{ notificationDateTwo.toDateString().substr(4, 3) }}
        {{ notificationDateTwo.getDate() }},
        {{ notificationDateTwo.getFullYear() }}
      </div>
      <AccountActivityNotification
        class="mr-5 border-b border-unicornSilver"
        user-name="Brandon Salindo"
        lot-number=" 4758693"
        auction-name="2021 Fall Auction"
        note="This could be a note that the admin added with additional info."
        :notification-time="notificationDateTwo.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })"
      />

      <AccountActivityNotification
        user-name="Brandon Salindo"
        lot-number=" 4758693"
        auction-name="2021 Fall Auction"
        :notification-time="notificationDateTwo.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })"
      />
    </div>

    <div class="pl-5 pt-5 pb-8 border border-unicornSilver mb-5">
      <div class="font-source font-semibold text-lg pb-4">
        {{ notificationDateThree.toDateString().substr(4, 3) }}
        {{ notificationDateThree.getDate() }},
        {{ notificationDateThree.getFullYear() }}
      </div>
      <AccountActivityNotification
        class="mr-5 border-b border-unicornSilver"
        user-name="Brandon Salindo"
        lot-number=" 4758693"
        auction-name="2021 Fall Auction"
        :notification-time="notificationDateThree.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })"
      />
      <AccountActivityNotification
        class="mr-5 border-b border-unicornSilver"
        user-name="Brandon Salindo"
        lot-number=" 4758693"
        auction-name="2021 Fall Auction"
        :notification-time="notificationDateThree.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })"
      />     
      <AccountActivityNotification
        user-name="Brandon Salindo"
        lot-number=" 4758693"
        auction-name="2021 Fall Auction"
        :notification-time="notificationDateThree.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })"
      />
    </div>
  </div>
</template>

  <script setup lang="ts">
  const notificationDateOne = ref(new Date('September 30, 2021'))

  const notificationDateTwo = ref(new Date('September 28, 2021'))

  const notificationDateThree = ref(new Date('September 27, 2021'))

  </script>
