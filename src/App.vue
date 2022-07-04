<template>
  <div class="app">
    <PostForm
        @create="createPost"
    />
    <PostList
        :posts="posts"
    />
  </div>
</template>

<script>
import PostList from "@/components/posts/PostList";
import PostForm from "@/components/posts/PostForm";

export default {
  components: {
    PostForm, PostList
  },
  data() {
    return {
      posts: [
        {id: 1, title: 'title1', body: 'description of post 1'},
        {id: 2, title: 'title2', body: 'description of post 2'},
        {id: 3, title: 'title3', body: 'description of post 3'},
      ],
    }
  },
  methods: {
    createPost(post, ...args){
      console.log('post - ', post);
      console.log('args - ', args);
      this.posts.push(post);
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