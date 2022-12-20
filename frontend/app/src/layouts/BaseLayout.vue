<template>
  <component :is="layout">
    <RouterView v-slot="{ Component, route }">
      <Transition name="fade" mode="out-in">
        <component :is="Component" :key="route.path" />
      </Transition>
    </RouterView>
  </component>
</template>

<script setup lang="ts">
import DefaultLayoutVue from "./DefaultLayout.vue";
import { markRaw, ref, watch } from "vue";
import { RouterView, useRoute } from "vue-router";

const layout = ref();
const route = useRoute();

watch(
  () => route.meta?.layout as string | undefined,
  async (metaLayout) => {
    try {
      const component = await import(`../layouts/${metaLayout}.vue`);
      layout.value = markRaw(component?.default || DefaultLayoutVue);
    } catch (e) {
      layout.value = markRaw(DefaultLayoutVue);
    }
  },
  { immediate: true }
);
</script>

<style scoped></style>
