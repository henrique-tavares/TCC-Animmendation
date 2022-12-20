<template>
  <div
    class="container w-full flex flex-col self-center items-center gap-10 py-10"
  >
    <div class="max-w-[1000px] flex flex-col items-center w-full gap-6">
      <div class="relative w-full select-none">
        <button class="absolute right-0 inset-y-0 pr-2" @click="fetchWithTitle">
          <div
            class="p-2 bg-transparent active:bg-black/10 transition rounded-full"
          >
            <IconTablerSearch class="w-6 h-6 text-blue-900" />
          </div>
        </button>
        <input
          type="text"
          placeholder="Começe a digitar o Título"
          v-model="titleInput"
          @keypress.enter="fetchWithTitle"
          class="w-full py-4 px-6 text-blue-900 placeholder:text-ani-faded-blue bg-ani-cold-white rounded-xl focus:ring-4 text-lg shadow-md focus:shadow-lg ring-ani-blue outline-none transition pr-12"
        />
      </div>
      <div class="flex flex-col bg-ani-cold-white w-full rounded-xl shadow-md">
        <button
          class="btn btn-secondary gap-2 flex items-center no-animation"
          :class="{ 'shadow-md': filtersShow }"
          @click="filtersShow = !filtersShow"
        >
          Filtros
          <IconTablerChevronDown
            class="transition w-5 h-5"
            :class="{ 'rotate-180': filtersShow }"
          />
        </button>
        <Collapse
          :when="filtersShow"
          class="custom-collapse flex flex-col md:grid grid-cols-2 gap-4 w-full max-w-[700px] md:max-w-none !p-4"
        >
          <div class="flex flex-col items-start w-full">
            <span class="text-ani-faded-blue font-medium">Gêneros</span>
            <Multiselect
              mode="tags"
              :searchable="true"
              :close-on-select="false"
              v-model="genres"
              :options="fetchGenres"
              class="w-full custom-multiselect"
            ></Multiselect>
          </div>
          <div class="flex flex-col items-start w-full">
            <span class="text-ani-faded-blue font-medium">Mídia</span>
            <Multiselect
              mode="tags"
              :searchable="true"
              :close-on-select="false"
              v-model="mediaTypes"
              :options="mediaTypesOptions"
              class="w-full custom-multiselect"
            ></Multiselect>
          </div>
          <div class="flex flex-col items-start w-full">
            <span class="text-ani-faded-blue font-medium">Fonte</span>
            <Multiselect
              mode="tags"
              :searchable="true"
              :close-on-select="false"
              v-model="sources"
              :options="fetchSources"
              class="w-full custom-multiselect"
            ></Multiselect>
          </div>
          <div class="flex flex-col items-start w-full">
            <span class="text-ani-faded-blue font-medium">Estúdios</span>
            <Multiselect
              mode="tags"
              :searchable="true"
              :close-on-select="false"
              v-model="studios"
              :options="fetchStudios"
              class="w-full custom-multiselect"
            ></Multiselect>
          </div>
        </Collapse>
      </div>
    </div>
    <div
      class="grid grid-cols-[repeat(auto-fill,_256px)] gap-6 justify-center justify-items-center items-center w-full pb-72"
    >
      <AnimeItem v-for="(anime, i) in animesData" :anime="anime" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, inject, onMounted, ref, watch } from "vue";
import Multiselect from "@vueform/multiselect";
import { Collapse } from "vue-collapsed";
import { useUserListStore } from "@/stores/userList";
import { promissifyQueryResult } from "@/utils/apolloQueryWrapper";
import { useLazyQuery } from "@vue/apollo-composable";
import {
  AnimeMediaType,
  GetAnimeGenresDocument,
  GetAnimeSourcesDocument,
  GetAnimeStudioDocument,
  GetTopAnimeDocument,
  TopAnimeMethod,
} from "@/graphql/gen/generated";
import { capitalize } from "lodash";
import { emitterKey } from "@/providers/emitterProvider";
import type { QueryAnime } from "@/graphql/queries/animeQueries";
import AnimeItem from "@/components/anime/AnimeItem.vue";

const emitter = inject(emitterKey)!;

const animesData = ref<QueryAnime[]>([]);

const filtersShow = ref(false);

const genres = ref<string[]>([]);
const mediaTypes = ref<AnimeMediaType[]>([]);
const sources = ref<string[]>([]);
const studios = ref<string[]>([]);

const filters = computed(() => ({
  genres: genres.value,
  mediaTypes: mediaTypes.value,
  sources: sources.value,
  studios: studios.value,
}));

const titleInput = ref("");

const generalOffset = ref<number | null>();
const userOffset = ref<number>(0);

const mediaTypesOptions: Record<AnimeMediaType, string> = {
  TV: "TV",
  MOVIE: "Filme",
  OVA: "OVA",
  ONA: "ONA",
  SPECIAL: "Especial",
};

async function fetchGenres() {
  const { getAnimeGenres: genres } = await promissifyQueryResult(
    useLazyQuery(GetAnimeGenresDocument)
  );

  return genres.map(({ genre }) => genre);
}

async function fetchSources() {
  const { getAnimeSources: sources } = await promissifyQueryResult(
    useLazyQuery(GetAnimeSourcesDocument)
  );

  return sources.reduce(
    (acc, { source }) => ({
      ...acc,
      [source]: capitalize(source.replaceAll("_", " ")),
    }),
    {} as Record<string, string>
  );
}

async function fetchStudios() {
  const { getAnimeStudios: studios } = await promissifyQueryResult(
    useLazyQuery(GetAnimeStudioDocument)
  );

  return studios.map(({ studio }) => studio);
}

watch(
  () => filters.value,
  async () => {
    await fetchInitialAnimes();
  }
);

async function fetchWithTitle() {
  if (!titleInput.value) {
    await fetchInitialAnimes(titleInput.value);
  }

  if (titleInput.value.length < 3) {
    return;
  }

  await fetchInitialAnimes(titleInput.value);
}

async function fetchInitialAnimes(title?: string) {
  try {
    emitter.emit("loading-modal", true);
    generalOffset.value = null;
    const { getTopAnime: animes } = await promissifyQueryResult(
      useLazyQuery(GetTopAnimeDocument, {
        method: TopAnimeMethod.Popularity,
        amount: 50,
        genres: filters.value.genres.length ? filters.value.genres : undefined,
        mediaTypes: filters.value.mediaTypes.length
          ? filters.value.mediaTypes
          : undefined,
        sources: filters.value.sources.length
          ? filters.value.sources
          : undefined,
        studios: filters.value.studios.length
          ? filters.value.studios
          : undefined,
        title,
      })
    );

    animesData.value = animes.map((anime) => ({
      id: anime.id,
      alternativeTitles: anime.alternativeTitles,
      score: anime.score,
      title: anime.title,
      ageClassification: anime.ageClassification,
      genres: anime.genres,
      mediaType: anime.mediaType,
      picture: anime.picture,
      popularity: anime.popularity,
      rank: anime.rank,
    }));
  } catch (error) {
    console.error(error);
    return [];
  } finally {
    emitter.emit("loading-modal", false);
  }
}

async function loadAnime() {
  if (generalOffset.value == null) {
    generalOffset.value = 0;
  } else {
    generalOffset.value += 100;
  }

  const {} = await promissifyQueryResult(
    useLazyQuery(GetTopAnimeDocument, {
      method: TopAnimeMethod.Title,
      amount: 100,
      genres: genres.value,
      mediaTypes: mediaTypes.value,
      sources: sources.value,
      studios: studios.value,
      offset: generalOffset.value,
    })
  );
}

onMounted(async () => {
  await fetchInitialAnimes();
});
</script>

<style src="@vueform/multiselect/themes/default.css"></style>
<style src="vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css" />

<style scoped>
.custom-collapse {
  transition: height 300ms cubic-bezier(0.3, 0, 0.6, 1);
}
.custom-multiselect {
  --ms-border-color: #97a8d150;
  --ms-tag-bg: #1d4ed8;
  --ms-tag-color: #f5f5f5;
  --ms-ring-color: #38bdf850;
  --ms-radius: 0.75rem;
  --ms-py: 0.75rem;
  --ms-px: 1rem;
  --ms-dropdown-radius: 0.75rem;
  --ms-option-bg-pointed: #eff4ff;
  --ms-option-py: 0.75rem;
  --ms-option-px: 1rem;
}
</style>
