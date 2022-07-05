<template>
  <div class="post">
    <h1>Страница с постами</h1>
    <my-input
        v-model:value="searchQuery"
        placeholder="Поиск"
    />
    <div class="post__buttons">
      <my-button @click="dialogVisible = true">Создать пост</my-button>
      <my-select
          v-model="selectedSort"
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
    <div ref="observer" class="posts-observer"></div>
    <!--    <my-pagination-->
    <!--      :page-count="totalPages"-->
    <!--      :page="page"-->
    <!--      @changePage="page = $event"-->
    <!--    />-->
  </div>
</template>

<script>
import PostList from "@/components/posts/PostList";
import PostForm from "@/components/posts/PostForm";
import MyDialog from "@/components/UI/MyDialog";
import axios from 'axios'
import MySelect from "@/components/UI/MySelect";
// import MyPagination from "@/components/UI/MyPagination";

export default {
  components: {
    // MyPagination,
    MySelect,
    MyDialog,
    PostForm, PostList
  },
  data() {
    return {
      posts: [],
      dialogVisible: false,
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
    }
  },
  mounted() {
    this.fetchPosts();
    const options = {
      rootMargin: '0px',
      threshold: 1.0
    }
    const callback = (entries, observer) => {
      if (entries[0].isIntersecting && this.page < this.totalPages) {
        this.loadMorePosts()
      }
    };
    const observer = new IntersectionObserver(callback, options);
    observer.observe(this.$refs.observer)
  },
  methods: {
    createPost(post, ...args){
      this.posts.push(post);
      this.dialogVisible = false;
    },
    removePost(post) {
      this.posts = this.posts.filter(p => p.id !== post.id);
    },
    async fetchPosts() {
      this.loading = true;
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _page: this.page,
            _limit: this.limit
          }
        });
        this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
        this.posts = response.data
      } catch (e) {
        console.log('error while fetching posts - ', e);
      } finally {
        this.loading = false;
      }
    },
    async loadMorePosts() {
      try {
        this.page += 1;
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _page: this.page,
            _limit: this.limit
          }
        });
        this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
        this.posts = [...this.posts, ...response.data]
      } catch (e) {
        console.log('error while fetching posts - ', e);
      }
    },
  },
  computed: {
    sortedPosts() {
      return [...this.posts].sort((post1, post2) => post1[this.selectedSort]?.localeCompare(post2[this.selectedSort]))
    },
    sortedAndSearchedPosts() {
      return this.sortedPosts.filter(post => post.title.toLowerCase().includes(this.searchQuery.toLowerCase()));
    }
  },
  // watch: {
  //   page(newValue) {
  //     this.fetchPosts()
  //   }
  // }
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