<template>
  <div class="navbar">
    <div @click="$router.push('/')">Vue 3 first</div>
    <div class="navbar__btns">
      <my-button @click="$router.push('/posts')">Пользователи</my-button>
      <my-button @click="$router.push('/about')">О сайте</my-button>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
  .navbar {
    height: 50px;
    background: #ccc;
    box-shadow: 2px 2px 4px gray;
    display: flex;
    align-items: center;
    padding: 0 15px;
    &__btns {
      display: flex;
      gap: 10px;
      margin-left: auto;
    }
  }
</style>