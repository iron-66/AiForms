<template>
<div id="app">
  <HeaderSidebar v-if="!isFullScreenForm" />
  <router-view/>
</div>
</template>

<script>
import HeaderSidebar from './components/HeaderSidebar.vue';

export default {
  name: 'App',
  components: {
    HeaderSidebar,
  },
  computed: {
    isFullScreenForm() {
      return this.$route.name === 'FullScreenForm';
    }
  }
}
</script>

<style>
#app {
  display: flex;
  z-index: 0;
}

@font-face {
  font-family: 'Comfortaa';
  font-weight: 300;
  src: url('./assets/fonts/Comfortaa-Light.woff2') format('woff2');
}

@font-face {
  font-family: 'Comfortaa';
  font-weight: 400;
  src: url('./assets/fonts/Comfortaa-Regular.woff2') format('woff2');
}

@font-face {
  font-family: 'Comfortaa';
  font-weight: 700;
  src: url('./assets/fonts/Comfortaa-Bold.woff2') format('woff2');
}

body {
  font-family: 'Comfortaa', sans-serif;
  background-color: #F5F6FF;
}

</style>
