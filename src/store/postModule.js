import axios from "axios";

export const postModule = {
  state: () => ({
    posts: [],
    loading: false,
    selectedSort: '',
    sortOptions: [
      {value: 'title', name: 'По названию'},
      {value: 'body', name: 'По описанию'},
    ],
    searchQuery: '',
    page: 1,
    limit: 10,
    totalPages: 1,
  }),
  getters: {
    sortedPosts(state) {
      return [...state.posts].sort((post1, post2) => post1[state.selectedSort]?.localeCompare(post2[state.selectedSort]))
    },
    sortedAndSearchedPosts(state, getters) {
      return getters.sortedPosts.filter(post => post.title.toLowerCase().includes(state.searchQuery.toLowerCase()));
    }
  },
  mutations: {
    setPosts(state, posts) {
      state.posts = posts
    },
    setLoading(state, loading) {
      state.loading = loading
    },
    setSelectedSort(state, selectedSort) {
      state.selectedSort = selectedSort
    },
    setPage(state, page) {
      state.page = page
    },
    setTotalPages(state, totalPages) {
      state.totalPages = totalPages
    },
    setSearchQuery(state, searchQuery) {
      state.searchQuery = searchQuery
    },
  },
  actions: {
    async fetchPosts({commit, state}) {
      commit('setLoading', true);
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _page: state.page,
            _limit: state.limit
          }
        });
        commit('setTotalPages', Math.ceil(response.headers['x-total-count'] / state.limit))
        commit('setPosts', response.data)
      } catch (e) {
        console.log('error while fetching posts - ', e);
      } finally {
        commit('setLoading', false);
      }
    },
    async loadMorePosts({commit, state}) {
      try {
        commit('setPage', state.page + 1)
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _page: state.page,
            _limit: state.limit
          }
        });
        commit('setTotalPages', Math.ceil(response.headers['x-total-count'] / state.limit))
        commit('setPosts', [...state.posts, ...response.data])
      } catch (e) {
        console.log('error while fetching posts - ', e);
      }
    },
  },
  namespaced: true,
}