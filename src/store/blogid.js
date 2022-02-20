export default {
  namespaced: true,
  state: {
    id: 0,
    blogitem: null,
  },
  mutations: {
    setId: (state, id) => {
      state.id = id;
    },
    setBlogitem: (state, blogitem) => {
      state.blogitem = blogitem;
    },
  },
  actions: {
    setId: ({ commit }, id) => {
      commit("setId", id);
    },
    setBlogitem: ({ commit }, blogitem) => {
      commit("setBlogitem", blogitem);
    },
  },
  getters: {
    id: (state) => state.id,
    blogitem: (state) => state.blogitem,
  },
};
