<template>
  <router-link :to="to">
    <div
      v-if="user"
      class=" cursor-pointer whitespace-nowrap transition-all duration-100 hover:border-b-4 pb-2 border-planetOfTheApes"
      :class="{
        'hover:border-b-4 border-b-4 border-planetOfTheApes ': isActive === true
      }"
    >
      {{ text }}
    </div>

    <a
      v-if="link"
      target="_blank"
      class=" cursor-pointer whitespace-nowrap transition-all duration-100 hover:border-b-4 pb-2 border-planetOfTheApes"
      :class="{
        'hover:border-b-4 border-b-4 border-planetOfTheApes ': isActive === true
      }"
      @click="$emit('emitLink')"
    >
      {{ text }}
    </a>

    <div
      v-if="admin"
      class=" cursor-pointer whitespace-nowrap transition-all duration-100 pr-24 pl-3 py-3 font-source text-lg rounded mb-3 flex items-center"
      :class="{
        'bg-pamperedPrincess text-planetOfTheApes pr-[1px] font-semibold': isActive === true,
      }"
    >
      {{ text }}
      <div
        v-if="notification"
        class="py-1 px-2 ml-3 bg-planetOfTheApes text-center text-white rounded-2xl font-source text-xs"
        :class="{
          'py-1 px-2 ml-3 bg-planetOfTheApes text-center text-white rounded-2xl font-source text-xs': isActive === false,
        }"
      >
        {{ notification }}
      </div>
    </div>
  </router-link>
</template>

<script setup lang="ts">

import type { PropType } from "vue"
import router from "../../router"

interface LinkType {
	name: string
}

defineEmits(['emitLink'])

const props = defineProps({
	text: { type: String, default: null },
	to: {
		type: Object as PropType<LinkType>,
		default: { name: "" } as LinkType,
	},
	alternateTo: {
		type: Object as PropType<LinkType>,
		default: { name: "" } as LinkType,
	},
	/** allows you to override the auto-route stuff */
	active: { type: Boolean, default: false },
	user: Boolean,
	admin: Boolean,
  link: Boolean,
  href: {type: String, default: ""},
	notification: { type: String, default: null },
});

const isActive = computed(() => {
	const currentRoute = router.currentRoute.value.name
	return props.active || (props.to && currentRoute == props.to.name) || (props.alternateTo && currentRoute == props.alternateTo.name)
});

</script>
