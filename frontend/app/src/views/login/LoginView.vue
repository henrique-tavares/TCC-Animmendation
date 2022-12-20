<template>
  <div
    class="flex flex-col items-center justify-around flex-grow w-full h-full"
  >
    <div class="flex flex-col gap-10 items-center">
      <span class="text-2xl font-medium text-ani tracking-wider">
        Bem vindo ao
      </span>
      <img
        :src="AniLogo"
        alt=""
        class="select-none min-w-[300px]"
        width="500"
      />
    </div>
    <div class="flex flex-col gap-5 items-center w-full">
      <button
        class="btn btn-secondary btn-lg btn-block font-poppins normal-case"
        @click="guestLogin"
      >
        Continuar como Visitante
      </button>
      <button
        class="btn btn-primary flex flex-row flex-nowrap btn-lg btn-block font-poppins p-0 border-0 normal-case"
        @click="login"
      >
        <div
          class="rounded-md rounded-r-none bg-primary-content p-2 flex flex-row items-center h-full flex-shrink-0"
        >
          <img :src="MalLogo" alt="" />
        </div>
        <div
          class="flex gap-5 items-center px-3 flex-grow justify-center break-words"
        >
          <span> Entrar com o MyAnimeList </span>
        </div>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import AniLogo from "@/assets/img/animmendation.svg";
import MalLogo from "@/assets/img/mal_logo.png";
import { GetUserDocument } from "@/graphql/gen/generated";
import { apolloClient } from "@/providers/apolloClientProvider";
import { emitterKey } from "@/providers/emitterProvider";
import { useUserStore, type Token } from "@/stores/user";
import { promissifyQueryResult } from "@/utils/apolloQueryWrapper";
import type { ApolloError } from "@apollo/client/errors";
import { provideApolloClient, useLazyQuery } from "@vue/apollo-composable";
import { logErrorMessages } from "@vue/apollo-util";
import axios from "axios";
import { inject } from "vue";
import { useRouter } from "vue-router";

const emitter = inject(emitterKey)!;
const router = useRouter();
const userStore = useUserStore();

function guestLogin() {
  userStore.guest = true;
  router.push({
    name: "home",
  });
}

async function fetchUser() {
  try {
    emitter.emit("loading-modal", true);
    const res = await promissifyQueryResult(
      useLazyQuery(GetUserDocument, {}, {})
    );
    return res.getUser;
  } catch (error) {
    logErrorMessages(error as ApolloError);
  } finally {
    emitter.emit("loading-modal", false);
  }
}

async function login() {
  provideApolloClient(apolloClient);
  const sessionId = Math.random().toString().split(".")[1];
  const url = new URL(`http://localhost:4000/login/mal?sessionId=${sessionId}`);
  const loginTab = window.open(url, "_blank");

  if (!loginTab) {
    emitter.emit("add-toast", {
      type: "error",
      message: "Erro ao autenticar",
    });
    return;
  }

  try {
    emitter.emit("loading-modal", true);
    const token = await getAccessToken(sessionId);
    console.log(token);
    userStore.token = token;
    userStore.guest = false;
  } catch (error) {
    userStore.token = null;
    emitter.emit("add-toast", {
      type: "error",
      message: "Acesso negado",
    });
    return;
  } finally {
    loginTab.close();
    emitter.emit("loading-modal", false);
  }

  const user = await fetchUser();
  if (!user) {
    userStore.token = null;
    emitter.emit("add-toast", {
      type: "error",
      message: "Erro ao fazer login",
    });
    return;
  }

  userStore.user = {
    username: user.username,
    malUrl: `https://myanimelist.net/profile/${user.username}`,
    imageUrl: user.imageURL ?? undefined,
  };
  emitter.emit("add-toast", {
    type: "success",
    message: "Login sucedido",
  });
  router.push({
    name: "home",
  });
}

async function getAccessToken(sessionId: string) {
  return new Promise<Token>((resolve, reject) => {
    let failedCount = 0;
    const intervaler = setInterval(() => {
      axios
        .get<{
          credentials: {
            accessToken: string;
            refreshToken: string;
          } | null;
        }>(`${import.meta.env.VITE_API_URL}/login/credentials/${sessionId}`)
        .then(({ data }) => {
          failedCount = 0;
          console.log("data", data);
          if (data.credentials) {
            clearInterval(intervaler);
            resolve(data.credentials);
          }
        })
        .catch((err) => {
          failedCount++;

          if (failedCount > 10) {
            clearInterval(intervaler);
            reject();
          }
        });
    }, 1000);
  });
}
</script>

<style scoped></style>
