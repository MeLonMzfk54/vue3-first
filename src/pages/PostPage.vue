<template>
  <div class="post">
    <h1>Страница с постами</h1>
    <my-input
        :value="searchQuery"
        @update:value="setSearchQuery"
        placeholder="Поиск"
    />
    <div class="post__buttons">
      <my-button @click="dialogVisible = true">Создать пост</my-button>
      <my-select
          :model-value="selectedSort"
          @update:model-value="setSelectedSort"
          :options="sortOptions"
      ></my-select>
    </div>
    <my-dialog v-model:show="dialogVisible">
      <PostForm
          @create="createPost"
      />
    </my-dialog>
    <PostList
        @remove="removePost"
        :posts="sortedAndSearchedPosts"
        v-if="!loading"
    />
    <div v-else>Идет загрузка...</div>
    <div v-intersection="loadMorePosts" class="posts-observer"></div>
  </div>
</template>

<script>
import PostList from "@/components/posts/PostList";
import PostForm from "@/components/posts/PostForm";
import MyDialog from "@/components/UI/MyDialog";
import MySelect from "@/components/UI/MySelect";
import {mapState, mapGetters, mapActions, mapMutations} from 'vuex';
// import MyPagination from "@/components/UI/MyPagination";

export default {
  components: {
    MySelect,
    MyDialog,
    PostForm, PostList
  },
  data() {
    return {
      dialogVisible: false,
    }
  },
  mounted() {
    this.fetchPosts()
  },
  methods: {
    ...mapMutations({
      setPage: 'post/setPage',
      setSearchQuery: 'post/setSearchQuery',
      setSelectedSort: 'post/setSelectedSort'
    }),
    ...mapActions({
      loadMorePosts: 'post/loadMorePosts',
      fetchPosts: 'post/fetchPosts'
    }),
    createPost(post, ...args){
      this.posts.push(post);
      this.dialogVisible = false;
    },
    removePost(post) {
      this.posts = this.posts.filter(p => p.id !== post.id);
    },
  },
  computed: {
    ...mapState({
      posts: state => state.post.posts,
      loading: state => state.post.loading,
      selectedSort: state => state.post.selectedSort,
      sortOptions: state => state.post.sortOptions,
      searchQuery: state => state.post.searchQuery,
      page: state => state.post.page,
      limit: state => state.post.limit,
      totalPages: state => state.post.totalPages,
    }),
    ...mapGetters({
      sortedPosts: 'post/sortedPosts',
      sortedAndSearchedPosts: 'post/sortedAndSearchedPosts'
    })
  }
}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.post {
  &__buttons {
    margin: 15px 0;
    display: flex;
    justify-content: space-between;
  }
}

.posts-observer {
  height: 30px;
}
</style>