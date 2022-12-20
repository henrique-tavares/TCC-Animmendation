<template>
  <div class="w-full container flex flex-col items-center gap-10 py-10">
    <div class="flex flex-col w-full max-w-5xl">
      <div
        class="w-full flex flex-grow text-xl font-medium items-center justify-center bg-ani-blue text-ani-cold-white shadow-md rounded-full px-8 py-3"
      >
        <Transition name="fade" mode="out-in">
          <span v-if="chosenTab == 'popularity'">
            {{ data.popularity.title }}
          </span>
          <span v-else-if="chosenTab == 'score'">
            {{ data.score.title }}
          </span>
        </Transition>
      </div>
      <div class="w-full px-8">
        <div class="w-full flex bg-ani-light-blue/20 rounded-b-2xl shadow-md">
          <Transition name="fade" mode="out-in">
            <button
              type="button"
              v-if="chosenTab == 'popularity'"
              class="bg-ani-light-blue text-blue-900 font-semibold text-lg w-full rounded-b-2xl h-full px-4 py-2"
            >
              Popularidade
            </button>
            <button
              type="button"
              v-else
              class="bg-transparent text-blue-900/30 font-semibold text-lg w-full rounded-b-2xl h-full px-4 py-2 hover:text-blue-900 transition-all"
              @click="chosenTab = 'popularity'"
            >
              Popularidade
            </button>
          </Transition>
          <Transition name="fade" mode="out-in">
            <button
              type="button"
              v-if="chosenTab == 'score'"
              class="bg-ani-light-blue text-blue-900 font-semibold text-lg w-full rounded-b-2xl h-full px-4 py-2"
            >
              Nota
            </button>
            <button
              type="button"
              v-else
              class="bg-transparent text-blue-900/30 font-semibold text-lg w-full rounded-b-2xl h-full px-4 py-2 hover:text-blue-900 transition-all"
              @click="chosenTab = 'score'"
            >
              Nota
            </button>
          </Transition>
        </div>
      </div>
    </div>
    <div class="flex items-center gap-6 justify-center w-full">
      <button
        :disabled="!hasPrev[chosenTab]"
        @click="goPrev(chosenTab)"
        class="disabled:opacity-40 group disabled:cursor-not-allowed"
      >
        <IconTablerChevronLeft
          class="w-12 h-12 text-ani-orange drop-shadow group-disabled:hover:translate-x-0 hover:-translate-x-1 transition flex-shrink-0"
        />
      </button>
      <div class="flex justify-center select-none w-full" ref="carouselBody">
        <Transition name="fade" mode="out-in">
          <div v-if="chosenTab == 'popularity'" class="flex gap-4">
            <AnimeItem
              v-for="(anime, i) in animeSlices.popularity"
              :key="`p_${i}`"
              :anime="anime"
            />
          </div>
          <div v-else-if="chosenTab == 'score'" class="flex gap-4">
            <AnimeItem
              v-for="(anime, j) in animeSlices.score"
              :key="`s_${j}`"
              :anime="anime"
            />
          </div>
        </Transition>
      </div>
      <button
        :disabled="!hasNext[chosenTab]"
        @click="goNext(chosenTab)"
        class="disabled:opacity-40 group disabled:cursor-not-allowed"
      >
        <IconTablerChevronRight
          class="w-12 h-12 text-ani-orange drop-shadow group-disabled:hover:translate-x-0 hover:translate-x-1 transition flex-shrink-0"
        />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { QueryAnime } from "@/graphql/queries/animeQueries";
import _ from "lodash";
import { computed, onMounted, onUnmounted, ref } from "vue";
import AnimeItem from "../AnimeItem.vue";

const props = defineProps<{
  data: {
    popularity: {
      title: string;
      animes: QueryAnime[];
    };
    score: {
      title: string;
      animes: QueryAnime[];
    };
  };
}>();

const chosenTab = ref<"popularity" | "score">("popularity");

const carouselBody = ref<HTMLElement | null>(null);
const itemsPerPage = ref<number>();
const startIndex = {
  popularity: ref<number>(),
  score: ref<number>(),
};
const endIndex = {
  popularity: ref<number>(),
  score: ref<number>(),
};
const totalAnime = {
  popularity: props.data.popularity.animes.length,
  score: props.data.score.animes.length,
};

const animeSlices = computed(() => ({
  popularity:
    _.isNil(startIndex.popularity.value) || _.isNil(endIndex.popularity.value)
      ? []
      : props.data.popularity.animes.slice(
          startIndex.popularity.value,
          endIndex.popularity.value + 1
        ),

  score:
    _.isNil(startIndex.score.value) || _.isNil(endIndex.score.value)
      ? []
      : props.data.score.animes.slice(
          startIndex.score.value,
          endIndex.score.value + 1
        ),
}));

type AnimeOrder = "popularity" | "score";

const hasPrev = computed(() => {
  return {
    popularity: startIndex.popularity.value
      ? startIndex.popularity.value < totalAnime.popularity - 1
      : false,
    score: startIndex.score.value
      ? startIndex.score.value < totalAnime.score - 1
      : false,
  };
});
const hasNext = computed(() => {
  return {
    popularity: endIndex.popularity.value
      ? endIndex.popularity.value < totalAnime.popularity - 1
      : false,
    score: endIndex.score.value
      ? endIndex.score.value < totalAnime.score - 1
      : false,
  };
});

function goPrev(order: AnimeOrder) {
  if (_.isNil(startIndex[order].value) || _.isNil(endIndex[order].value)) {
    return;
  }

  startIndex[order].value! -= 1;
  endIndex[order].value! -= 1;
}

function goNext(order: AnimeOrder) {
  if (_.isNil(startIndex[order].value) || _.isNil(endIndex[order].value)) {
    return;
  }

  startIndex[order].value! += 1;
  endIndex[order].value! += 1;
}

function calculateCarouselItems() {
  const animeItemWidth = 256;
  const carouselContainerSize = carouselBody.value!.clientWidth;
  const initialItemsFit = Math.floor(carouselContainerSize / animeItemWidth);
  const itemsWithGap =
    (initialItemsFit - 1) * 16 + initialItemsFit * animeItemWidth;
  const finalItemsFit =
    itemsWithGap > carouselContainerSize
      ? initialItemsFit - 1
      : initialItemsFit;

  itemsPerPage.value = finalItemsFit;
  startIndex.popularity.value = 0;
  startIndex.score.value = 0;
  endIndex.popularity.value = finalItemsFit - 1;
  endIndex.score.value = finalItemsFit - 1;
}

onMounted(() => {
  calculateCarouselItems();
  window.addEventListener("resize", calculateCarouselItems);
});
onUnmounted(() => {
  window.removeEventListener("resize", calculateCarouselItems);
});
</script>

<style scoped></style>
