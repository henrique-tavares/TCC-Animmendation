<template>
  <Teleport to="body">
    <div class="fixed bottom-0 right-0" :class="props.class">
      <TransitionGroup name="toast" tag="ul" class="p-3">
        <li v-for="toast in toasts" :key="toast.id" class="animate-none">
          <div
            :class="
              toast.type == 'custom'
                ? toast.customclass
                : typeStyles[toast.type]
            "
            class="alert flex-row items-center shadow-md"
          >
            <div>
              <span>{{ toast.message }}</span>
            </div>
            <div class="flex-none !m-0">
              <button type="button" @click="removeToast(toast.id)">
                <IconTablerX />
              </button>
            </div>
          </div>
        </li>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { emitterKey, type EventToast } from "@/providers/emitterProvider";
import { inject, ref } from "vue";

const props = defineProps<{
  class?: string;
}>();

const emitter = inject(emitterKey)!;
emitter.on("add-toast", (e) => {
  const id = String(Math.random()).split(".")[1];
  toasts.value.push({
    ...e,
    id,
  });

  setTimeout(() => {
    removeToast(id);
  }, 5000);
});

const typeStyles: Record<"error" | "success" | "info" | "warning", string> = {
  error: "alert-error text-md md:text-lg",
  success: "alert-success text-md md:text-lg",
  info: "alert-info text-md md:text-lg",
  warning: "alert-warning text-md md:text-lg",
};

const toasts = ref<(EventToast & { id: string })[]>([]);

function removeToast(id: string) {
  toasts.value = toasts.value.filter((toast) => toast.id != id);
}
</script>

<style scoped></style>
