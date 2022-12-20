<template>
  <div
    class="w-full flex flex-col flex-grow container self-center items-center pb-60"
    ref="carouselScrollComponent"
  >
    <AnimeCarouselTabless
      v-for="animeData in animesData"
      :animes="animeData.animes"
      :title="animeData.title"
    />
  </div>
</template>

<script setup lang="ts">
import AnimeCarouselTabless from "@/components/anime/carousel/AnimeCarouselTabless.vue";
import { AnimeMediaType } from "@/graphql/gen/generated";
import animeQueries, {
  type AnimeQueryResponse,
} from "@/graphql/queries/animeQueries";
import { emitterKey } from "@/providers/emitterProvider";
import { useUserListStore, type UserAnimeList } from "@/stores/userList";
import { genresTranslator } from "@/translate/anime";
import { chunk, concat } from "lodash";
import { inject, onMounted, onUnmounted, ref } from "vue";

const emitter = inject(emitterKey)!;

const forMeQueries: Pick<typeof animeQueries, "yourNextAnimeQuery"> = {
  yourNextAnimeQuery: animeQueries.yourNextAnimeQuery,
};
const animesData = ref<AnimeQueryResponse[]>([]);

const paginatedAnimeQueries = ref<(() => Promise<AnimeQueryResponse>)[][]>([]);

const userListStore = useUserListStore();

const carouselScrollComponent = ref<HTMLElement | null>(null);

const loadingNextPage = ref(false);

function handleScroll() {
  if (!carouselScrollComponent.value) {
    return;
  }
  if (
    carouselScrollComponent.value?.getBoundingClientRect().bottom - 200 <
      window.innerHeight &&
    !loadingNextPage.value
  ) {
    loadNextPage();
  }
}

async function loadNextPage() {
  try {
    loadingNextPage.value = true;
    emitter.emit("loading-modal", true);

    const pageTasks = paginatedAnimeQueries.value!.shift();
    if (!pageTasks) {
      return;
    }

    for (const task of pageTasks) {
      animesData.value!.push(await task());
    }
  } catch (error) {
    console.error(error);
  } finally {
    loadingNextPage.value = false;
    emitter.emit("loading-modal", false);
  }
}

onMounted(async () => {
  try {
    emitter.emit("loading-modal", true);

    const userTop5Genres = userListStore.getTop5Genres()!;
    const userTop5Studios = userListStore.getTop5Studios()!;
    const userSeenAnime = userListStore.userAnimeList!.map(
      (rating) => rating.anime.id
    );

    const userTop10Animes = userListStore.getTopAnime({ amount: 10 })!;

    const userTopAnimes = {
      all: userListStore.getTopAnime({
        amount: 20,
      })!,
      movie: concat(
        userTop10Animes,
        userListStore.getTopAnime({
          amount: 10,
          mediaTypes: [AnimeMediaType.Movie],
        })!
      ),
      original: concat(
        userTop10Animes,
        userListStore.getTopAnime({
          amount: 10,
          original: true,
        })!
      ),
      genres: userTop5Genres.reduce(
        (acc, { genre }) => ({
          ...acc,
          [genre]: concat(
            userTop10Animes,
            userListStore.getTopAnime({
              amount: 10,
              genres: [genre],
            })!
          ),
        }),
        {} as Record<string, UserAnimeList[]>
      ),
      studios: userTop5Studios.reduce(
        (acc, { studio }) => ({
          ...acc,
          [studio]: concat(
            userTop10Animes,
            userListStore.getTopAnime({
              amount: 10,
              studios: [studio],
            })!
          ),
        }),
        {} as Record<string, UserAnimeList[]>
      ),
    };

    const tasks = [
      () =>
        forMeQueries.yourNextAnimeQuery({
          title: "Seu próximo Anime",
          animeIds: userTopAnimes.all.map((rating) => rating.anime.id),
          amount: 15,
          excludedAnimeIds: userSeenAnime,
          mediaTypes: [AnimeMediaType.Tv],
        }),
      () =>
        forMeQueries.yourNextAnimeQuery({
          title: "Seu próximo Filme",
          animeIds: userTopAnimes.movie.map((rating) => rating.anime.id),
          amount: 15,
          excludedAnimeIds: userSeenAnime,
          mediaTypes: [AnimeMediaType.Movie],
        }),
      ...userTop5Genres.map(
        ({ genre }) =>
          async () =>
            forMeQueries.yourNextAnimeQuery({
              title: `Seu próximo anime de ${await genresTranslator(genre)}`,
              animeIds: userTopAnimes.genres[genre].map(
                (rating) => rating.anime.id
              ),
              excludedAnimeIds: userSeenAnime,
              genres: [genre],
              amount: 15,
            })
      ),
      ...userTop5Studios.map(
        ({ studio }) =>
          async () =>
            forMeQueries.yourNextAnimeQuery({
              title: `Seu próximo anime de ${studio}`,
              animeIds: userTopAnimes.studios[studio].map(
                (rating) => rating.anime.id
              ),
              excludedAnimeIds: userSeenAnime,
              studios: [studio],
              amount: 15,
            })
      ),
    ];
    paginatedAnimeQueries.value = chunk(tasks, 3);

    await loadNextPage();
  } catch (err) {
    console.error(err);
  } finally {
    emitter.emit("loading-modal", false);
  }

  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style scoped></style>
