import Vue from "vue";
import VueRouter from "vue-router";
import Favorites from "../components/Favorites.vue";
import Players from "../components/Players.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Players",
    component: Players
  },
  {
    path: "/favorites",
    name: "Favorites",
    component: Favorites
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
