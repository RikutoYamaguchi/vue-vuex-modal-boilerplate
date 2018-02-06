<template>
  <div id="app">
    <Home/>
    <Modal />
  </div>
</template>

<script>
import Home from './components/Home'
import Modal from './components/Modal'

export default {
  name: 'App',
  components: {
    Home,
    Modal
  }
}
</script>

