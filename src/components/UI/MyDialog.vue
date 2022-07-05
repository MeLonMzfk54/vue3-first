<template>
  <div class="dialog" v-if="show" @click="hideDialog">
    <div @click.stop class="dialog__content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import toggleMixin from "@/mixins/toggleMixin";

export default {
  name: 'myDialog',
  mixins: [toggleMixin],
}
</script>

<style lang="scss" scoped>
  .dialog{
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background: rgba(0,0,0, .5);
    position: fixed;
    display: flex;
    &__content{
      margin: auto;
      background: #fff;
      border-radius: 10px;
      min-height: 50px;
      min-width: 300px;
      padding: 20px;
    }
  }
</style>