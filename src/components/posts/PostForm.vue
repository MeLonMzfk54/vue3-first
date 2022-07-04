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
    <button class="btn" @click="createPost">Создать</button>
  </form>
</template>

<script>
export default {
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

.btn {
  cursor: pointer;
  margin-top: 10px;
  align-self: flex-end;
  padding: 10px 15px;
  background: none;
  color: teal;
  border: 1px solid teal;
}
</style>