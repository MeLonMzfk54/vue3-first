<template>
  <div class="app">
    <div>
      <form @submit.prevent>
        <h4>Создание поста</h4>
        <input
            class="inp"
            type="text"
            placeholder="Название"
            v-model="title"
        >
        <input
            class="inp"
            type="text"
            placeholder="Описание"
            v-model="body"
        >
        <button class="btn" @click="createPost">Создать</button>
      </form>
    </div>
    <div
        class="post"
        v-for="post in posts"
        :key="post.id"
    >
      <div><strong>Название:</strong> {{ post.title }}</div>
      <div><strong>Описание:</strong> {{ post.body ? post.body : 'Нет описания' }}</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      posts: [
        {id: 1, title: 'title1', body: 'description of post 1'},
        {id: 2, title: 'title2', body: 'description of post 2'},
        {id: 3, title: 'title3', body: 'description of post 3'},
      ],
      title: '',
      body: '',
    }
  },
  methods: {
    createPost() {
      if (this.title !== '') {
        const newPost = {
          id: Date.now(),
          title: this.title,
          body: this.body
        };
        this.posts.push(newPost);
        this.title = '';
        this.body = ''
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

 .post {
   padding: 15px;
   border: 2px solid teal;
   margin-top: 15px;
 }
</style>