import { defineStore } from "pinia";
import { StorageSerializers, useStorage } from "@vueuse/core";
import type {
  AnimeAgeClassification,
  AnimeSeason,
  UserRatingStatus,
} from "@/graphql/gen/generated";

export type User = {
  malUrl: string;
  username: string;
  imageUrl?: string;
};

export type Token = {
  accessToken: string;
  refreshToken: string;
};

export const useUserStore = defineStore("user", {
  state: () => ({
    user: useStorage<User | null>("user", null, undefined, {
      serializer: StorageSerializers.object,
    }),

    token: useStorage<Token | null>("token", null, undefined, {
      serializer: StorageSerializers.object,
    }),
    guest: useStorage("guest", false),
  }),
});
