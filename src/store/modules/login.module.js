import { getItem, setItem } from "@/utils/storage";

const USER_KEY = "user";

const state = {
  user: getItem(USER_KEY),
};
const getters = {};
const actions = {};
const mutations = {
  setUser(state, data) {
    state.user = data;
    setItem(USER_KEY, state.user);
  },
};

export const login = {
  state,
  mutations,
  getters,
  actions,
};
