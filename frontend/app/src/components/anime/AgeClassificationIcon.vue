<template>
  <div
    class="py-1 px-2 rounded-xl tooltip tooltip-bottom flex items-center justify-center cursor-help tooltip-info aspect-square w-8"
    :data-tip="ageClassificationDescription"
    :class="[
      props.class,
      {
        'bg-green-600': ageClassification == 'G',
        'bg-yellow-500': ageClassification == 'PG',
        'bg-orange-500': ageClassification == 'PG_13',
        'bg-red-500': ageClassification == 'R' || ageClassification == 'R_PLUS',
        'bg-gray-900': ageClassification == 'RX',
      },
    ]"
  >
    <span class="text-white font-bold">{{ ageClassificationDisplay }}</span>
  </div>
</template>

<script setup lang="ts">
import type { AnimeAgeClassification } from "@/graphql/gen/generated";
import { computed } from "vue";

const props = defineProps<{
  ageClassification: AnimeAgeClassification;
  class?: string;
}>();

const ageClassificationDisplay = computed(() => {
  const mapper: Record<AnimeAgeClassification, string> = {
    G: "L",
    PG: "10",
    PG_13: "13",
    R: "16",
    R_PLUS: "16",
    RX: "18",
  };

  return mapper[props.ageClassification];
});

const ageClassificationDescription = computed(() => {
  const mapper: Record<AnimeAgeClassification, string> = {
    G: "Livre para todos",
    PG: "Não recomendado para menores de 10",
    PG_13: "Não recomendado para menores de 13 anos",
    R: "Não recomendado para menores de 16 anos",
    R_PLUS: "Não recomendado para menores de 16 anos",
    RX: "Não recomendado para menores de 18 anos",
  };

  return mapper[props.ageClassification];
});
</script>

<style scoped></style>
