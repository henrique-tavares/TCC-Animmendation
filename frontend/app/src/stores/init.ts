import type { Events } from "@/providers/emitterProvider";
import fetchUserList from "@/utils/fetchUserList";
import { isApolloError } from "@apollo/client/errors";
import { logErrorMessages } from "@vue/apollo-util";
import type { Emitter } from "mitt";
import { defineStore } from "pinia";
import { useUserListStore } from "./userList";

export const useInitStore = defineStore("init", {
  state: () => ({
    initialized: false,
  }),
  actions: {
    async initialize(emitter: Emitter<Events>) {
      const userListStore = useUserListStore();
      try {
        emitter.emit("loading-modal", true);
        const res = await fetchUserList();
        if (res) {
          userListStore.userAnimeList = res.userAnimeList;
          userListStore.genreCount = res.genreCount;

          emitter.emit("add-toast", {
            type: "success",
            message: "Lista de animes atualizada com sucesso",
          });
        }
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
        this.initialized = true;
      }
    },
  },
});
