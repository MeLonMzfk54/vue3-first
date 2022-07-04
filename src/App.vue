<template>
  <div class="app">
    <h1>Страница с постами</h1>
    <my-button @click="dialogVisible = true">Создать пост</my-button>
    <my-dialog v-model:show="dialogVisible">
      <PostForm
          @create="createPost"
      />
    </my-dialog>
    <PostList
        @remove="removePost"
        :posts="posts"
    />
  </div>
</template>

<script>
import PostList from "@/components/posts/PostList";
import PostForm from "@/components/posts/PostForm";
import MyDialog from "@/components/UI/MyDialog";

export default {
  components: {
    MyDialog,
    PostForm, PostList
  },
  data() {
    return {
      posts: [
        {id: 1, title: 'title1', body: 'description of post 1'},
        {id: 2, title: 'title2', body: 'description of post 2'},
        {id: 3, title: 'title3', body: 'description of post 3'},
      ],
      dialogVisible: false,
    }
  },
  methods: {
    createPost(post, ...args){
      this.posts.push(post);
      this.dialogVisible = false;
    },
    removePost(post) {
      this.posts = this.posts.filter(p => p.id !== post.id);
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