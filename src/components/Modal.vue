<template>
  <div ref="modal">
    <transition name="fade">
      <div class="modal-bg" v-if="isShow"></div>
    </transition>
    <div class="modal">
      <transition :name="transitionName">
        <component :is="currentModalName" />
      </transition>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import ModalSample1 from './modals/ModalSample1'
  import ModalSample2 from './modals/ModalSample2'
  import ModalSample3 from './modals/ModalSample3'

  export default {
    name: 'Modal',
    components: {
      ModalSample1,
      ModalSample2,
      ModalSample3,
    },
    computed: {
      ...mapGetters('modal', ['currentModalName', 'isShow', 'transitionName'])
    },
    methods: {
      ...mapActions('modal', ['close'])
    },
    mounted () {
      const $modal = this.$refs.modal;
      /**
       * Outside click listener
       */
      $modal.addEventListener('click', (e) => {
        const paths = e.path;
        let outSideClick = true;
        _.each(paths, (path) => {
          if (path.className ? path.className.match('modal-box') : false) {
            outSideClick = false;
          }
        });
        if (outSideClick) {
          this.close();
        }
      });
    }
  }
</script>

<style scoped>
  .modal-bg {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .6);
  }

  /* fade transition for modal-bg */
  .fade-enter-active, .fade-leave-active {
    transition: opacity .2s;
  }
  .fade-enter, .fade-leave-to  {
    opacity: 0;
  }

  /* scale transition for modal-container */
  .scale-enter-active, .scale-leave-active {
    transition: opacity .2s, transform .2s;
  }
  .scale-enter, .scale-leave-to {
    transform: scale(.8);
    opacity: 0;
  }

  /* forward transition modal-container */
  .forward-enter-active, .forward-leave-active {
    transition: opacity .3s, transform .3s;
  }
  .forward-enter {
    opacity: 0;
    transform: translateX(200px);
  }
  .forward-leave-to {
    transform: translateX(-200px);
    opacity: 0;
  }

  /* backward transition modal-container */
  .backward-enter-active, .backward-leave-active {
    transition: opacity .3s, transform .3s;
  }
  .backward-enter {
    opacity: 0;
    transform: translateX(-200px);
  }
  .backward-leave-to {
    transform: translateX(200px);
    opacity: 0;
  }
</style>
