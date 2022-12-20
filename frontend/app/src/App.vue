<script setup lang="ts">
import BaseLayoutVue from "./layouts/BaseLayout.vue";

import { localize, setLocale } from "@vee-validate/i18n";
import { min, required } from "@vee-validate/rules";
import { configure, defineRule } from "vee-validate";
import { inject, onMounted } from "vue";
import LoadingModal from "./components/modal/LoadingModal.vue";
import ToastModal from "./components/modal/ToastModal.vue";
import { emitterKey } from "./providers/emitterProvider";
import { useInitStore } from "./stores/init";
import { useUserStore } from "./stores/user";

defineRule("required", required);
defineRule("min", min);

configure({
  generateMessage: localize("pt_BR", {
    messages: {
      required: "Esse campo é obrigatório",
      min: "Esse campo deve ter no mínimo 0:{min} caracteres",
    },
  }),
});

setLocale("pt_BR");

const emitter = inject(emitterKey)!;

onMounted(async () => {
  const initStore = useInitStore();
  const userStore = useUserStore();

  if (!initStore.initialized && !!userStore.user) {
    await initStore.initialize(emitter);
  }
});
</script>

<template>
  <main class="bg-white text-ani-black font-poppins z-0">
    <BaseLayoutVue />
    <LoadingModal class="z-10" />
    <ToastModal class="z-20" />
  </main>
</template>

<style scoped></style>
