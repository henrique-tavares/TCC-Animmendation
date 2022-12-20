<template>
  <RouterLink
    class="h-12 select-none text-lg flex font-semibold items-center px-2 relative after:absolute after:top-[calc(100%-4px)] after:bg-ani-blue after:left-0 after:right-0 after:mx-auto after:h-2 after:rounded-full hover:text-ani-blue transition"
    :class="
      $route.name == props.routeName
        ? 'text-ani-blue  after:shadow-md enter after:w-full'
        : 'text-ani-faded-blue leave after:w-0'
    "
    :to="{ name: props.routeName }"
  >
    <slot></slot>
  </RouterLink>
</template>

<script setup lang="ts">
const props = defineProps<{
  routeName: string;
}>();
</script>

<style scoped>
@keyframes enter {
  0% {
    width: 0;
  }
  100% {
    width: 100%;
  }
}
@keyframes leave {
  0% {
    width: 100%;
  }
  100% {
    width: 0;
  }
}

.enter::after {
  animation: enter 0.2s ease-in;
}
.leave::after {
  animation: leave 0.2s ease-in;
}
</style>
