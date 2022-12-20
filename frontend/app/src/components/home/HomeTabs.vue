<template>
  <div
    class="w-full max-w-[600px] flex bg-ani-light-blue/20 rounded-b-2xl shadow-md"
  >
    <button
      type="button"
      class="bg-transparent text-blue-900/20 font-semibold text-lg w-full rounded-b-2xl h-full px-4 pb-2 pt-4 hover:text-blue-900 transition-all"
      :class="{
        '!bg-ani-light-blue !text-blue-900': modelValue == 'popularity',
      }"
      @click="$emit('update:modelValue', 'popularity')"
    >
      Popularidade
    </button>
    <button
      type="button"
      class="bg-transparent text-blue-900/20 font-semibold text-lg w-full rounded-b-2xl h-full px-4 pb-2 pt-4 hover:text-blue-900 transition-all"
      :class="{
        '!bg-ani-light-blue !text-blue-900': modelValue == 'score',
      }"
      @click="$emit('update:modelValue', 'score')"
    >
      Nota
    </button>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: "popularity" | "score";
}>();
const emits = defineEmits<{
  (e: "update:modelValue", value: typeof props.modelValue): void;
}>();
</script>

<style scoped></style>
