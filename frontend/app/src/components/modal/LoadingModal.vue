<template>
  <Teleport to="body">
    <Transition name="fade">
      <div
        v-if="open"
        class="fixed top-0 bottom-0 left-0 right-0 w-full h-screen flex items-center justify-center bg-ani-black/50 backdrop-blur-sm"
        :class="props.class"
      >
        <div
          class="bg-white p-2 shadow-[0_0_15px_0_rgb(255,255,255)] rounded-full select-none"
        >
          <Loading />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import Loading from "@/components/Loading.vue";
import { emitterKey } from "@/providers/emitterProvider";
import { inject, ref } from "vue";

const props = defineProps<{
  class?: string;
}>();

const open = ref(false);

const emitter = inject(emitterKey)!;
emitter.on("loading-modal", (e) => {
  open.value = e;
});
</script>

<style scoped></style>
