<template>
  <input
      class="inp"
      type="text"
      :value="value"
      @input="updateInput"
  >
</template>

<script>
export default {
  name: 'MyInput',
  props: {
    value: [String, Number]
  },
  methods: {
    updateInput(event) {
      this.$emit('update:value', event.target.value)
    }
  }
}
</script>

<style scoped>
.inp {
  width: 100%;
  border: 1px solid teal;
  padding: 10px 15px;
}
</style>