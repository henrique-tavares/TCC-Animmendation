<template>
  <nav
    class="flex flex-row justify-center gap-8 px-5 bg-ani-cold-white shadow-md"
  >
    <NavItem routeName="home"> Início </NavItem>
    <NavItem routeName="top-10"> Top 10 </NavItem>
    <NavItem routeName="for-me" v-if="!!user"> Para mim </NavItem>
    <NavItem routeName="search"> Buscar </NavItem>
  </nav>
</template>

<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import NavItem from "./HomeNavItem.vue";

const { user } = storeToRefs(useUserStore());
</script>

<style scoped></style>
