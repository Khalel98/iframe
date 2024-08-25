import { createStore } from "vuex";
export default createStore({
  state: {
    accessToken: null,
    product: null,
  },
  mutations: {
    setToken(state, token) {
      state.accessToken = token;
    },
    setProduct(state, product) {
      state.product = product;
    },
  },

  getters: {
    productInfo(state) {
      return state.product;
    },
    isAuthenticated(state) {
      return state.accessToken !== null;
    },
    getAccessToken(state) {
      return state.accessToken;
    },
  },
});
