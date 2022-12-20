import { AnimeSeason, GetUserAnimeListDocument } from "@/graphql/gen/generated";
import { apolloClient } from "@/providers/apolloClientProvider";
import {
  useUserListStore,
  type GenreCount,
  type UserAnimeList,
} from "@/stores/userList";
import { provideApolloClient, useLazyQuery } from "@vue/apollo-composable";
import { promissifyQueryResult } from "./apolloQueryWrapper";

export default async () => {
  provideApolloClient(apolloClient);
  const userListSore = useUserListStore();

  if (userListSore.userAnimeList) {
    return;
  }

  const { getUserAnimeList } = await promissifyQueryResult(
    useLazyQuery(GetUserAnimeListDocument)
  );

  const userAnimeList = getUserAnimeList.map(
    (rating): UserAnimeList => ({
      anime: {
        id: rating.anime.id,
        popularity: rating.anime.popularity ?? undefined,
        genres: rating.anime.genres ?? undefined,
        ageClassification: rating.anime.ageClassification ?? undefined,
        releasedSeason: rating.anime.releasedSeason
          ? {
              season: rating.anime.releasedSeason.split(", ")[0] as AnimeSeason,
              year: Number(rating.anime.releasedSeason.split(", ")[1]),
            }
          : undefined,
        mediaType: rating.anime.mediaType ?? undefined,
        source: rating.anime.source ?? undefined,
        studios: rating.anime.studios ?? undefined,
      },
      score: rating.score,
      status: rating.status ?? undefined,
    })
  );

  const genreCountMap = new Map<string, number>();
  userAnimeList.forEach((rating) => {
    rating.anime.genres?.forEach((genre) => {
      genreCountMap.set(genre, (genreCountMap.get(genre) ?? 0) + 1);
    });
  });

  const genreCount = [...genreCountMap.entries()].reduce(
    (acc, [genre, count]): GenreCount => ({
      ...acc,
      [genre]: count,
    }),
    {} as GenreCount
  );

  return {
    userAnimeList,
    genreCount,
  };
};
