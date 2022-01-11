<template>
  <div class="relative">
    <input
      :type="inputType"
      :placeholder="placeholder"
      :value="modelValue"
      maxlength="7"
      :class="[
        'h-11 w-full  font-source rounded bg-speedOfLight',
        'border border-unicornSilver focus:border-black focus:outline-none placeholder-lunarRock',
        {
          'pl-10': email,
          'bg-white px-5 ': inputType === 'number',
        },
      ]"
      v-bind="$attrs"
      @input="updateValue"
    >
    <img
      v-if="email"
      src="../../assets/envelope.svg"
      class="absolute h-3.5 left-4 top-4"
      alt="email"
    >
  </div>
</template>

<script setup lang="ts">
	defineProps({
		modelValue: { type: [String, Number], default: null },
		placeholder: { type: String, default: null },
		email: Boolean,
		inputType: { type: String, default: "text" },
	});

 const emit = defineEmits(["update:modelValue"]);

	function updateValue(event: Event) {
    let date = (event.target as HTMLInputElement).value;
    if(date.length === 2) date += "/";
		emit("update:modelValue", date);
	}

</script>
