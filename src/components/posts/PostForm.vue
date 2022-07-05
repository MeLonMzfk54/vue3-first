<template>
  <form class="form" @submit.prevent>
    <h4>Создание поста</h4>
    <my-input
        class="form__inp"
        placeholder="Название"
        v-model:value="post.title"
    />
    <my-input
        class="form__inp"
        placeholder="Описание"
        v-model:value="post.body"
    />
    <my-button
        style="align-self: flex-end; margin-top: 10px;"
        class="post__create"
        @click="createPost"
    >Создать</my-button>
  </form>
</template>

<script>
import MyInput from "@/components/UI/MyInput";
export default {
  components: {MyInput},
  data() {
    return {
      post: {
        title: '',
        body: '',
      }
    }
  },
  methods: {
    createPost() {
      if (this.post.title !== '') {
        this.post.id = Date.now();
        this.$emit('create', this.post, 'asfasfasf', 'asfasfasf')
        this.post = {
          title: '',
          body: '',
        }
      }
    }
  },
  // watch: {
  //   post: {
  //     handler(newValue) {
  //       console.log(newValue);
  //     },
  //     deep: true,
  //   }
  // }
}
</script>

<style lang="scss" scoped>
.form {
  display: flex;
  flex-direction: column;
  &__inp {
    margin-top: 10px;
  }
}
</style>