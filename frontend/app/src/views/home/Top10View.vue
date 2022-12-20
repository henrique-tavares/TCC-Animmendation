<template>
  <div
    class="w-full flex flex-col flex-grow container self-center items-center pb-72"
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
import { inject, onMounted, ref } from "vue";
import { AnimeMediaType, TopAnimeMethod } from "@/graphql/gen/generated";
import HomeTabs from "@/components/home/HomeTabs.vue";
import { genresTranslator, sourcesTranslator } from "@/translate/anime";
import { translatorApi } from "@/translate/api";
import { lowerCase } from "lodash";

const emitter = inject(emitterKey)!;

const chosenTab = ref<"popularity" | "score">("popularity");

const forMeQueries: Pick<
  typeof animeQueries,
  "topAnimeQuery" | "getAnimeData"
> = {
  topAnimeQuery: animeQueries.topAnimeQuery,
  getAnimeData: animeQueries.getAnimeData,
};

const animesDataPopularity = ref<AnimeQueryResponse[]>([]);
const animesDataScore = ref<AnimeQueryResponse[]>([]);

const animesData = ref<ComposedAnimeQueryResponse[]>([]);

onMounted(async () => {
  try {
    emitter.emit("loading-modal", true);

    const getTopAnimeQuery = async () => ({
      popularity: await forMeQueries.topAnimeQuery({
        title: "Top 10 Animes mais populares",
        method: TopAnimeMethod.Popularity,
        mediaTypes: [AnimeMediaType.Tv],
        amount: 10,
      }),
      score: await forMeQueries.topAnimeQuery({
        title: "Top 10 Animes mais bem avaliados",
        method: TopAnimeMethod.Score,
        mediaTypes: [AnimeMediaType.Tv],
        amount: 10,
      }),
    });

    const getTopMovieQuery = async () => ({
      popularity: await forMeQueries.topAnimeQuery({
        title: "Top 10 Filmes mais populares",
        method: TopAnimeMethod.Popularity,
        mediaTypes: [AnimeMediaType.Movie],
        amount: 10,
      }),
      score: await forMeQueries.topAnimeQuery({
        title: "Top 10 Filmes mais bem avaliados",
        method: TopAnimeMethod.Score,
        mediaTypes: [AnimeMediaType.Movie],
        amount: 10,
      }),
    });

    const getTopONAQuery = async () => ({
      popularity: await forMeQueries.topAnimeQuery({
        title: "Top 10 animes mais populares lançados para a internet (ONA)",
        method: TopAnimeMethod.Popularity,
        mediaTypes: [AnimeMediaType.Ona],
        amount: 10,
      }),
      score: await forMeQueries.topAnimeQuery({
        title:
          "Top 10 animes mais bem avaliados lançados para a internet (ONA)",
        method: TopAnimeMethod.Score,
        mediaTypes: [AnimeMediaType.Ona],
        amount: 10,
      }),
    });

    const topGenres = await forMeQueries.getAnimeData("genre", 5);

    const getTopGenresAnimeQuery = () =>
      topGenres.map(async (genre) => ({
        popularity: await forMeQueries.topAnimeQuery({
          title: `Top 10 animes mais populares de ${await genresTranslator(
            genre
          )}`,
          method: TopAnimeMethod.Popularity,
          genres: [genre],
          amount: 10,
        }),
        score: await forMeQueries.topAnimeQuery({
          title: `Top 10 animes mais bem avaliados de ${await genresTranslator(
            genre
          )}`,
          method: TopAnimeMethod.Score,
          genres: [genre],
          amount: 10,
        }),
      }));

    const topStudios = await forMeQueries.getAnimeData("studio", 3);

    const getTopStudioAnimeQuery = () =>
      topStudios.map(async (studio) => ({
        popularity: await forMeQueries.topAnimeQuery({
          title: `Top 10 animes mais populares do estúdio: ${studio}`,
          method: TopAnimeMethod.Popularity,
          studios: [studio],
          amount: 10,
        }),
        score: await forMeQueries.topAnimeQuery({
          title: `Top 10 animes mais bem avaliados do estúdio: ${studio}`,
          method: TopAnimeMethod.Popularity,
          studios: [studio],
          amount: 10,
        }),
      }));

    const topSources = await forMeQueries.getAnimeData("source", 3);

    const getTopSourceAnimeQuery = () =>
      topSources.map(async (source) => ({
        popularity: await forMeQueries.topAnimeQuery({
          title: `Top 10 animes mais populares ${
            source == "original"
              ? "originais"
              : `adaptados de ${sourcesTranslator(source)}`
          }`,
          method: TopAnimeMethod.Popularity,
          sources: [source],
          amount: 10,
        }),
        score: await forMeQueries.topAnimeQuery({
          title: `Top 10 animes mais bem avaliados ${
            source == "original"
              ? "originais"
              : `adaptados de ${sourcesTranslator(source)}`
          }`,
          method: TopAnimeMethod.Score,
          sources: [source],
          amount: 10,
        }),
      }));

    animesData.value = await Promise.all([
      getTopAnimeQuery(),
      getTopMovieQuery(),
      ...getTopGenresAnimeQuery(),
      getTopONAQuery(),
      ...getTopStudioAnimeQuery(),
      ...getTopSourceAnimeQuery(),
    ]);

    // [
    //   getTopAnimeQuery(),
    //   getTopMovieQuery(),
    //   ...getTopGenresAnimeQuery(),
    //   getTopONAQuery(),
    //   ...getTopStudioAnimeQuery(),
    //   ...getTopSourceAnimeQuery(),
    // ].forEach(async (promise) => animesData.value.push(await promise));
  } catch (error) {
    console.error(error);
  } finally {
    emitter.emit("loading-modal", false);
  }
});
</script>

<style scoped></style>
