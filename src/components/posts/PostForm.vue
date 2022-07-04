<template>
  <form @submit.prevent>
    <h4>Создание поста</h4>
    <input
        class="inp"
        type="text"
        placeholder="Название"
        v-model="post.title"
    >
    <input
        class="inp"
        type="text"
        placeholder="Описание"
        v-model="post.body"
    >
    <my-button
        style="align-self: flex-end"
        class="post__create"
        @click="createPost"
    >Создать</my-button>
  </form>
</template>

<script>
import MyButton from "@/components/UI/MyButton";
export default {
  components: {
    MyButton
  },
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
  }
}
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
}

.inp {
  width: 100%;
  border: 1px solid teal;
  padding: 10px 15px;
  margin-top: 10px;
}
</style>