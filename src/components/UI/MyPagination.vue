<template>
  <div class="pages">
    <div
        v-for="pageNumber in pageCount"
        :key="pageNumber"
        class="pages__item"
        :class="{
            'current-page': page === pageNumber
          }"
        @click="changePage(pageNumber)"
    >
      {{ pageNumber }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'myPagination',
  props: {
    pageCount: {
      type: Number,
      required: true,
    },
    page: {
      type: Number,
      required: true,
    }
  },
  methods: {
    changePage(pageNumber) {
      this.$emit('changePage', pageNumber)
    }
  }
}
</script>

<style lang="scss" scoped>
  .pages {
    display: flex;
    gap: 5px;
    &__item {
      border: 1px solid black;
      padding: 10px;
      cursor: pointer;
    }
  }
  .current-page {
    border: 2px solid teal;
  }
</style>