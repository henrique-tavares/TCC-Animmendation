<template>
  <div class="w-full bg-ani-blue flex flex-row justify-center p-4">
    <div class="flex flex-row w-full container justify-between items-center">
      <div class="flex flex-row gap-4 items-center">
        <IconTablerArrowLeft
          v-if="props.backButton"
          @click="$router.back()"
          class="text-white"
        />
        <h1 class="text-5xl font-fredoka-one text-white">animmendation</h1>
      </div>
      <div class="flex flex-row gap-5 items-center">
        <a :href="user?.malUrl ?? '#'" class="group" target="_blank">
          <div
            class="flex flex-row items-center rounded-full bg-ani-light-blue gap-4 pl-4 hover:ring-4 hover:ring-ani-light-blue/50 transition"
          >
            <span
              class="text-lg text-secondary-content font-medium underline-offset-2"
            >
              {{ user?.username ?? "Visitante" }}
            </span>
            <UserIcon class="" :image-url="user?.imageUrl ?? null" />
          </div>
        </a>
        <button v-if="user" type="button" @click="emit('logout')">
          <IconTablerLogout class="text-white w-10 h-10" />
        </button>
        <button v-else type="button" @click="emit('login')">
          <IconTablerLogin class="text-white w-10 h-10" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";

import UserIcon from "@/components/home/UserIcon.vue";

const props = withDefaults(
  defineProps<{
    backButton: boolean;
  }>(),
  {
    backButton: false,
  }
);

const emit = defineEmits<{
  (e: "logout"): void;
  (e: "login"): void;
}>();

const userStore = useUserStore();
const { user } = storeToRefs(userStore);
</script>

<style scoped></style>
