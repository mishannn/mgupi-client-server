<template>
  <div id="app">
    <login-view v-if="!jwtToken" />
    <map-view v-else />
    <div class="small-screen-banner">
      <div class="small-screen-banner__alert">
        Экран устройства слишком мал для отображения приложения!
      </div>
    </div>
  </div>
</template>

<script>
import MapView from './components/MapView';
import LoginView from './components/LoginView';
import authStoreMixin from './mixins/store/authStoreMixin';

export default {
  name: 'App',
  mixins: [authStoreMixin],
  components: {
    MapView,
    LoginView,
  },
  created() {
    this.restoreSession();
  },
};
</script>

<style scoped lang="postcss">
#app {
  width: 100%;
  height: 100%;
}

.small-screen-banner {
  z-index: 10000;
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #f5f5f5;

  @media (max-width: 419px) {
    display: block;
  }

  &__alert {
    margin: 20px;
    padding: 10px;
    border: 1px solid #b17b29;
    border-radius: 4px;
    background-color: #e6a23c;
    color: white;
    font-size: 13px;
  }
}
</style>
