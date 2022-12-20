import { useInitStore } from "@/stores/init";
import { useUserStore } from "@/stores/user";
import fetchUserList from "@/utils/fetchUserList";
import { createRouter, createWebHistory } from "vue-router";

declare module "vue-router" {
  interface RouteMeta {
    layout?: string;
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@/views/home/HomeView.vue"),
      meta: { layout: "HomeLayout" },
    },
    {
      path: "/top-10",
      name: "top-10",
      component: () => import("@/views/home/Top10View.vue"),
      meta: { layout: "HomeLayout" },
    },
    {
      path: "/for-me",
      name: "for-me",
      component: () => import("@/views/home/ForMeView.vue"),
      meta: { layout: "HomeLayout" },
    },
    {
      path: "/search",
      name: "search",
      component: () => import("@/views/home/SearchView.vue"),
      meta: { layout: "HomeLayout" },
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/login/LoginView.vue"),
      meta: { layout: "LoginLayout" },
    },
  ],
});

router.beforeEach(async (to, from) => {
  const userStore = useUserStore();

  if (!userStore.user && to.name != "login") {
    return {
      name: "login",
    };
  }
});

export default router;
