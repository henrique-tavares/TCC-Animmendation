<template>
  <section class="min-h-screen w-full flex flex-col">
    <Header
      :back-button="false"
      @logout="logout"
      @login="login"
      class="shadow-lg"
    />
    <HomeNavBar />

    <slot></slot>
  </section>
</template>

<script setup lang="ts">
import Header from "@/components/home/Header.vue";
import type HomeNavBar from "@/components/home/nav/HomeNavBar.vue";
import { emitterKey } from "@/providers/emitterProvider";
import { useUserStore } from "@/stores/user";
import { useUserListStore } from "@/stores/userList";
import fetchUserList from "@/utils/fetchUserList";
import { storeToRefs } from "pinia";
import { inject, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useCookies } from "vue3-cookies";

const { user, token, guest } = storeToRefs(useUserStore());
const { userAnimeList } = storeToRefs(useUserListStore());
const router = useRouter();
const emitter = inject(emitterKey)!;

function login() {
  guest.value = false;
  router.push({
    name: "login",
  });
}

function logout() {
  user.value = null;
  userAnimeList.value = null;
  token.value = null;

  router.push({
    name: "login",
  });
}

// onMounted(async () => {
//   try {
//     emitter.emit("loading-modal", true);
//     if (!userAnimeList.value) {
//       await fetchUserList();
//     }
//   } catch (error) {
//     console.error(error);
//   } finally {
//     emitter.emit("loading-modal", false);
//   }
// });
</script>

<style scoped></style>
