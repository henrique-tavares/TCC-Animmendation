<template>
  <section
    class="bg-login-pattern min-h-screen w-full flex flex-col items-center justify-center"
  >
    <div
      class="flex flex-col h-[80vh] md:h-full min-h-[600px] w-full md:w-[650px] items-center py-10 px-5 md:px-10 bg-white rounded-xl border-y-8 border-x-0 md:border-x-8 border-ani-blue justify-center shadow-none md:shadow-lg md:shadow-ani-blue/50"
    >
      <slot></slot>
    </div>
  </section>
</template>

<script setup lang="ts"></script>

<style scoped></style>
