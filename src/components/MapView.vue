<template>
  <div class="map-view">
    <l-map :zoom="zoom" :center="center">
      <l-tile-layer :url="url" />
      <l-marker :lat-lng="markerLatLng" />
    </l-map>
  </div>
</template>

<script>
import LMap from './leaflet/LMap';
import LTileLayer from './leaflet/LTileLayer';
import LMarker from './leaflet/LMarker';

export default {
  name: 'MapView',
  components: {
    LMap,
    LTileLayer,
    LMarker,
  },
  data: () => ({
    url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
    zoom: 11,
    center: [55.755814, 37.617635],
    markerLatLng: [55.755814, 37.617635],
  }),
};
</script>

<style>
.map-view {
  width: 100%;
  height: 100%;
}
</style>
