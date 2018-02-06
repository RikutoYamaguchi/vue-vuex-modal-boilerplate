<template>
  <ModalContainer>
    <div class="modal-confirm">
      ModalSample1<br>
      <p>{{ currentModalParams.message }}</p>
      <button @click="onClickPush">push ModalSample2</button>
    </div>
  </ModalContainer>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import ModalContainer from './ModalContainer'
  export default {
    name: 'ModalSample1',
    components: {
      ModalContainer
    },
    computed: {
      ...mapGetters('modal', ['currentModalParams'])
    },
    methods: {
      ...mapActions('modal', ['push']),
      onClickPush () {
        this.push({
          name: 'ModalSample2'
        });
      }
    }
  }
</script>
