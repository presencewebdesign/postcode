import Vue from "vue";
import Router from "vue-router";

//Components
import PostCodeSearch from "./components/PostCodeSearch";
import PostCodeLanding from "./components/PostCodeLanding";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "PostCodeSearch",
      component: PostCodeSearch,
    },
    {
      path: "/postcode/:postcode",
      name: "PostCodeLanding",
      component: PostCodeLanding,
    },
  ],
});
