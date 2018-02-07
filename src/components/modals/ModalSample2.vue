<template>
  <ModalContainer>
    <div class="modal-confirm">
      ModalSample2<br>
      <button @click="onClickPush">push ModalSample3</button>
      <button @click="onClickReplace">replace ModalSample3</button>
    </div>
  </ModalContainer>
</template>

<script>
  import { mapActions } from 'vuex'
  import ModalContainer from './ModalContainer'
  export default {
    name: 'ModalSample2',
    components: {
      ModalContainer
    },
    methods: {
      ...mapActions('modal', ['push', 'replace']),
      onClickPush () {
        this.push({
          name: 'ModalSample3'
        })
      },
      onClickReplace () {
        this.replace({
          name: 'ModalSample3'
        })
      }
    }
  }
</script>
