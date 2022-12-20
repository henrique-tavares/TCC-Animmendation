<template>
  <div v-if="props.imageUrl" class="rounded-full aspect-square">
    <img
      :src="props.imageUrl"
      alt="Profile"
      class="w-12 h-12 rounded-full drop-shadow-md"
    />
  </div>
  <div v-else class="aspect-square rounded-full p-2 bg-white w-12 h-12">
    <IconTablerUser class="w-full h-full text-ani-light-blue" />
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    imageUrl: string | null;
  }>(),
  {
    imageUrl: null,
  }
);
</script>

<style scoped></style>
