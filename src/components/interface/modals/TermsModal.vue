<template>
  <Modal
    :is-open="isOpen"
    @close="$emit('close')"
  >
    <div class="flex flex-col items-start justify-start max-w-xl">
      <div class="text-white font-bold text-6xl">
        Refund policy
      </div>
      <div class="text-white text-lg">
        We have a 30-day return policy, which means you have 30 days after
        receiving your item to request a return.
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
