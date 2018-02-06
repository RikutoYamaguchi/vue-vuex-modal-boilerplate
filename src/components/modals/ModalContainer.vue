<template>
  <div class="modal-container">
    <div class="modal-box">
      <slot />
      <button @click="close">close</button>
      <button @click="reject({ message: 'reject message' })">reject</button>
      <button @click="go(-2)">go(-2)</button>
      <button @click="go(-1)">go(-1)</button>
      <button @click="go(1)">go(1)</button>
      <button @click="go(2)">go(2)</button>
      <button @click="back">back</button>
      <button @click="forward">forward</button>
      <button @click="resolve({ message: 'resolve data' })">resolve</button>
    </div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex';

  export default {
    name: 'ModalContainer',
    methods: {
      ...mapActions('modal', ['close', 'go', 'forward', 'back', 'reject', 'resolve'])
    },
  }
</script>

<style scoped>
  .modal-container {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
  .modal-box {
    width: 600px;
    padding: 40px;
    position: absolute;
    top: 50%;
    left: 50%;
    background: #fff;
    box-sizing: border-box;
    transform: translate(-50%, -50%);
    box-shadow: 0 3px 10px 1px rgba(0, 0, 0, .2);
  }
</style>