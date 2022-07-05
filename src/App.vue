<template>
  <div class="app">
    <h1>Страница с постами</h1>
    <my-button style="margin: 15px 0" @click="dialogVisible = true">Создать пост</my-button>
    <my-dialog v-model:show="dialogVisible">
      <PostForm
          @create="createPost"
      />
    </my-dialog>
    <PostList
        @remove="removePost"
        :posts="posts"
        v-if="!loading"
    />
    <div v-else>Идет загрузка...</div>
  </div>
</template>

<script>
import PostList from "@/components/posts/PostList";
import PostForm from "@/components/posts/PostForm";
import MyDialog from "@/components/UI/MyDialog";
import axios from 'axios'

export default {
  components: {
    MyDialog,
    PostForm, PostList
  },
  data() {
    return {
      posts: [],
      dialogVisible: false,
      loading: false,
    }
  },
  mounted() {
    this.fetchPosts();
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
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=10');
        this.posts = response.data
      } catch (e) {
        console.log('error while fetching posts - ', e);
      } finally {
        this.loading = false;
      }
    }
  }
}
</script>

<style lang="scss">
 * {
   margin: 0;
   padding: 0;
   box-sizing: border-box;
 }

 .app {
   padding: 20px;
 }
</style>