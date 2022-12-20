<template>
  <div class="w-full container flex flex-col items-center gap-10 py-10">
    <div class="flex flex-col w-full max-w-5xl">
      <div
        class="w-full flex flex-grow text-xl font-medium items-center justify-center bg-ani-blue text-ani-cold-white shadow-md rounded-full px-8 py-3"
      >
        {{ title }}
      </div>
    </div>
    <div class="flex items-center gap-6 justify-center w-full">
      <button
        :disabled="!hasPrev"
        @click="goPrev"
        class="disabled:opacity-40 group disabled:cursor-not-allowed"
      >
        <IconTablerChevronLeft
          class="w-12 h-12 text-ani-orange drop-shadow group-disabled:hover:translate-x-0 hover:-translate-x-1 transition flex-shrink-0"
        />
      </button>
      <div class="flex justify-center select-none w-full" ref="carouselBody">
        <AnimeItem
          v-for="(anime, i) in animeSlices"
          :key="`p_${i}`"
          :anime="anime"
        />
      </div>
      <button
        :disabled="!hasNext"
        @click="goNext"
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
  title: string;
  animes: QueryAnime[];
}>();

const carouselBody = ref<HTMLElement | null>(null);
const itemsPerPage = ref<number>();
const startIndex = ref<number>();
const endIndex = ref<number>();
const totalAnime = props.animes.length;

const animeSlices = computed(() => {
  return _.isNil(startIndex.value) || _.isNil(endIndex.value)
    ? []
    : props.animes.slice(startIndex.value, endIndex.value + 1);
});

const hasPrev = computed(() => {
  return startIndex.value ? startIndex.value < totalAnime - 1 : false;
});
const hasNext = computed(() => {
  return endIndex.value ? endIndex.value < totalAnime - 1 : false;
});

function goPrev() {
  if (_.isNil(startIndex.value) || _.isNil(endIndex.value)) {
    return;
  }

  startIndex.value! -= 1;
  endIndex.value! -= 1;
}

function goNext() {
  if (_.isNil(startIndex.value) || _.isNil(endIndex.value)) {
    return;
  }

  startIndex.value! += 1;
  endIndex.value! += 1;
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
  startIndex.value = 0;
  endIndex.value = finalItemsFit - 1;
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
