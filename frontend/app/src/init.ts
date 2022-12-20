import { isApolloError } from "@apollo/client/core";
import { logErrorMessages } from "@vue/apollo-util";
import type { Emitter } from "mitt";
import type { Events } from "./providers/emitterProvider";
import { useUserListStore } from "./stores/userList";
import fetchUserList from "./utils/fetchUserList";

async function handleUserAnimeList() {
  const userListStore = useUserListStore();

  if (userListStore.userAnimeList) {
    return;
  }

  const res = await fetchUserList();
  if (!res) {
    return;
  }

  userListStore.userAnimeList = res.userAnimeList;
  userListStore.genreCount = res.genreCount;
}

export default async (emitter: Emitter<Events>) => {
  try {
    emitter.emit("loading-modal", true);
    await handleUserAnimeList();
  } catch (error: any) {
    if (isApolloError(error)) {
      logErrorMessages(error);
    } else {
      console.error(JSON.stringify(error));
    }
    emitter.emit("add-toast", {
      type: "error",
      message: "Erro ao pegar a lista de animes",
    });
  } finally {
    emitter.emit("loading-modal", false);
  }
};
