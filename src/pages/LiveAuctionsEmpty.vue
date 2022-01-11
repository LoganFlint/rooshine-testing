<template>
  <div
    data-cy="live-auction-empty"
    class="bg-subscribeBanner pt-36 mx-auto flex flex-col items-center justify-center"
  >
    <div class="font-serif font-bold text-5xl pb-9">
      Upcoming Auctions
    </div>
    <UpcomingAuctions
      :date="convertDay(dateOne)"
      :time="timeOne"
    />
    <UpcomingAuctions
      :date="convertDay(dateTwo)"
      :time="timeTwo"
    />
    <UpcomingAuctions
      :date="convertDay(dateThree)"
      :time="timeOne"
    />
    <UpcomingAuctions
      :date="convertDay(dateFour)"
      :time="timeOne"
    />
  </div>
</template>

<script setup lang="ts">

let o = new Intl.DateTimeFormat("en", {
  timeStyle: "short",
});
let timeOne = o.format(new Date("Aug 04, 2021, 20:00:00")).toString();
let timeTwo = o.format(new Date("Sep 24, 2021, 20:00:00")).toString();

let dateOne = new Date("Aug 04, 2021");
let dateTwo = new Date("Sep 24, 2021");
let dateThree = new Date("Nov 06, 2021");
let dateFour = new Date("Dec 10, 2021");

function convertDay(day: Date) {
  const noDay = day.toDateString().split(" ").splice(1).join(" ");
  return noDay;
}

</script>
