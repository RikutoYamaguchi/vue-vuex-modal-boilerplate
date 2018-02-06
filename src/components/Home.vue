<template>
  <div class="home">
    <button @click="onClickPush">push ModalSample1</button>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'

  export default {
    name: 'Home',
    methods: {
      ...mapActions('modal', ['push']),
      onClickPush () {
        const dfd = this.push({
          name: 'ModalSample1',
          params: {
            message: `This message was passed by 'params'.`
          },
          dfd: true, // If you need feedback from modal module.
          callback: (err, data) => {
            console.log('callback');
            console.log(data);
          }
        });

        // If you need feedback from modal module.
        dfd.then(data => {
          console.log('then');
          console.log(data);
        }).catch(err => {
          console.log('err');
          console.log(err);
        })
      }
    }
  }
</script>
