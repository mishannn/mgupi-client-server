<template>
  <div id="app">
    <map-view />
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

<style>
#app {
  width: 100%;
  height: 100%;
}
</style>
