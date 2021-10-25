import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import { login } from "./modules/login.module";

export default new Vuex.Store({
  modules: { login },
});
