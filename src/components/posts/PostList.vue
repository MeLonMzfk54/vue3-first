<template>
  <div v-if="posts.length">
    <h3>Список постов</h3>
    <post-item
        v-for="post in posts"
        :post="post"
        :key="post.id"
        @remove="$emit('remove', post)"
    />
  </div>
  <h2 v-else style="color: red">
    Список постов пуст
  </h2>
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
</style>