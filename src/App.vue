<template>
  <div id="app">
    <map-view />
    <div class="small-screen-banner">
      <div class="small-screen-banner__alert">
        Экран устройства слишком мал для отображения приложения!
      </div>
    </div>
  </div>
</template>

<script>
import MapView from './components/MapView';

export default {
  name: 'App',
  components: {
    MapView,
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
