<template>
  <Modal
    :is-open="isOpen"
    @close="$emit('close')"
  >
    <div class="flex flex-col items-start justify-start max-w-xl">
      <div class="text-white font-bold text-6xl">
        Privacy policy
      </div>
      <div class="text-white text-lg">
        This Privacy Policy describes how rooshine.myshopify.com (the “Site” or
        “we”) collects, uses, and discloses your Personal Information when you
        visit or make a purchase from the Site.
      </div>
      <div class="pt-5 text-white text-lg">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ornare arcu odio ut
        sem nulla pharetra. Proin libero nunc consequat interdum varius. A cras
        semper auctor neque vitae tempus. Parturient montes nascetur ridiculus
        mus mauris vitae ultricies leo integer. Donec enim diam vulputate ut
        pharetra. Mauris a diam maecenas sed enim ut sem viverra. Molestie a
        iaculis at erat pellentesque adipiscing commodo. Fringilla phasellus
        faucibus scelerisque eleifend donec. Mollis nunc sed id semper risus in.
        Et netus et malesuada fames ac. Tristique senectus et netus et
        malesuada. Dui sapien eget mi proin sed libero enim. Pharetra convallis
        posuere morbi leo urna. Arcu bibendum at varius vel pharetra vel.
      </div>
    </div>
  </Modal>
</template>

<script setup lang="ts">

  defineProps({ isOpen: { type: Boolean, default: false } });
  defineEmits(["close"]);

</script>
