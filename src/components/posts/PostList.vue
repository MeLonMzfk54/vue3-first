<template>
  <div>
    <h3>Список пользователей</h3>
    <post-item v-for="post in posts" :post="post" :key="post.id"/>
  </div>
</template>

<script>
import PostItem from "@/components/posts/PostItem";
export default {
  components: {PostItem},
  props: {
    posts: {
      type: Array,
      default: [],
      required: true,
    }
  }
}
</script>

<style lang="scss" scoped>
.post {
  padding: 15px;
  border: 2px solid teal;
  margin-top: 15px;
}
</style>