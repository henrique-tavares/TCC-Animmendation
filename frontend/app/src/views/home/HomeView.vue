<template>
  <div
    class="w-full flex flex-col flex-grow container self-center items-center pb-60"
  >
    <AnimeCarousel v-for="animeData in animesData" :data="animeData" />
  </div>
</template>

<script setup lang="ts">
import AnimeCarousel from "@/components/anime/carousel/AnimeCarousel.vue";
import { emitterKey } from "@/providers/emitterProvider";
import animeQueries, {
  type AnimeQueryResponse,
  type ComposedAnimeQueryResponse,
} from "@/graphql/queries/animeQueries";
import { computed, inject, onMounted, ref } from "vue";
import {
  AnimeMediaType,
  AnimeSeason,
  DateMethod,
  TopAnimeMethod,
} from "@/graphql/gen/generated";
import { getBeginningOfSeason, getCurrentSeason } from "@/utils/seasonHandler";

const emitter = inject(emitterKey)!;

const homeQueries: Pick<
  typeof animeQueries,
  "bySeasonQuery" | "topAnimeQuery"
> = {
  bySeasonQuery: animeQueries.bySeasonQuery,
  topAnimeQuery: animeQueries.topAnimeQuery,
};

const animesData = ref<ComposedAnimeQueryResponse[]>([]);

onMounted(async () => {
  try {
    emitter.emit("loading-modal", true);

    const getCurrentSeasonQuery = async () => ({
      popularity: await homeQueries.bySeasonQuery({
        season: "current",
        method: TopAnimeMethod.Popularity,
        amount: 10,
        mediaTypes: [AnimeMediaType.Tv],
      }),
      score: await homeQueries.bySeasonQuery({
        season: "current",
        method: TopAnimeMethod.Score,
        amount: 10,
        mediaTypes: [AnimeMediaType.Tv],
      }),
    });

    const getPastSeasonQuery = async () => ({
      popularity: await homeQueries.bySeasonQuery({
        season: "past",
        method: TopAnimeMethod.Popularity,
        amount: 10,
        mediaTypes: [AnimeMediaType.Tv],
      }),
      score: await homeQueries.bySeasonQuery({
        season: "past",
        method: TopAnimeMethod.Score,
        amount: 10,
        mediaTypes: [AnimeMediaType.Tv],
      }),
    });

    const currentSeason = getCurrentSeason();

    const getTopContinuingAnime = async () => ({
      popularity: await homeQueries.topAnimeQuery({
        title: "Os animes em continuação mais populares",
        method: TopAnimeMethod.Popularity,
        startDate: getBeginningOfSeason(
          currentSeason.season,
          currentSeason.year
        ),
        startDateMethod: DateMethod.LessThan,
        nullEndDate: true,
        mediaTypes: [AnimeMediaType.Tv],
      }),
      score: await homeQueries.topAnimeQuery({
        title: "Os melhores animes em continuação",
        method: TopAnimeMethod.Score,
        startDate: getBeginningOfSeason(
          currentSeason.season,
          currentSeason.year
        ),
        startDateMethod: DateMethod.LessThan,
        nullEndDate: true,
        mediaTypes: [AnimeMediaType.Tv],
      }),
    });

    const getTopLatestMovies = async () => ({
      popularity: await homeQueries.topAnimeQuery({
        title: "Os filmes mais populares no último ano",
        method: TopAnimeMethod.Popularity,
        startDate: getBeginningOfSeason(
          currentSeason.season,
          currentSeason.year - 1
        ),
        startDateMethod: DateMethod.GreaterThanOrEqual,
        mediaTypes: [AnimeMediaType.Movie],
      }),
      score: await homeQueries.topAnimeQuery({
        title: "Os filmes mais bem avaliados no último ano",
        method: TopAnimeMethod.Score,
        startDate: getBeginningOfSeason(
          currentSeason.season,
          currentSeason.year - 1
        ),
        startDateMethod: DateMethod.GreaterThanOrEqual,
        mediaTypes: [AnimeMediaType.Movie],
      }),
    });

    animesData.value = await Promise.all([
      getCurrentSeasonQuery(),
      getPastSeasonQuery(),
      getTopContinuingAnime(),
      getTopLatestMovies(),
    ]);
  } catch (error) {
    console.error(error);
  } finally {
    emitter.emit("loading-modal", false);
  }
});
</script>

<style scoped></style>
