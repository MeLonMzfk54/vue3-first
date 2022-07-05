<template>
  <div v-if="posts.length">
    <h3>Список постов</h3>
    <transition-group name="post-list">
      <post-item
          v-for="post in posts"
          :post="post"
          :key="post.id"
          @remove="$emit('remove', post)"
      />
    </transition-group>
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
  .post-list {
    &-item {
      display: inline-block;
      margin-right: 10px;
    }
    &-enter-active,
    &-leave-active {
      transition: all 1s ease;
    }
    &-enter-from,
    &-leave-to {
      opacity: 0;
      transform: translateY(30px);
    }
    &-move {
      transition: transform 0.8s ease;
    }
  }
</style>