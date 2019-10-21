<template>
  <div class="map-view">
    <l-map :zoom="zoom" :center="center" :options="{ zoomControl: false }" @click="clickMap" :style="mapStyle">
      <l-control-zoom position="bottomright" />
      <l-tile-layer :url="url" />
      <l-marker :lat-lng="markerLatLng" />
    </l-map>
    <map-search class="map-search" @change-coordinates="changeCoordinates" />
    <el-button-group class="map-actions">
      <el-button :class="{ active: itemAddingActive }" @click="clickItemAddingButton" icon="el-icon-plus" circle />
    </el-button-group>
    <new-map-point-menu :active.sync="newMapPointMenuActive" :lat-lng="newMapPointMenuLatLng" @add-point="addPoint" />
  </div>
</template>

<script>
import LMap from './leaflet/LMap';
import LTileLayer from './leaflet/LTileLayer';
import LMarker from './leaflet/LMarker';
import LControlZoom from './leaflet/LControlZoom';
import MapSearch from './ui/MapSearch';
import NewMapPointMenu from './ui/NewMapPointMenu';

export default {
  name: 'MapView',
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LControlZoom,
    MapSearch,
    NewMapPointMenu,
  },
  data: () => ({
    url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
    zoom: 11,
    center: [55.755814, 37.617635],
    markerLatLng: [55.755814, 37.617635],
    newMapPointMenuActive: false,
    newMapPointMenuLatLng: null,
    itemAddingActive: false,
  }),
  computed: {
    mapStyle() {
      return {
        cursor: this.itemAddingActive ? 'crosshair' : 'grab',
      };
    },
  },
  methods: {
    changeCoordinates(coordinates) {
      this.center = coordinates;
      this.markerLatLng = coordinates;
      this.zoom = 14;
    },
    clickMap(e) {
      // console.log(e);

      if (this.itemAddingActive) {
        this.newMapPointMenuLatLng = [e.latlng.lat, e.latlng.lng];
        this.newMapPointMenuActive = true;
        this.itemAddingActive = false;
      }
    },
    clickItemAddingButton() {
      this.itemAddingActive = !this.itemAddingActive;
    },
    addPoint(data, cb) {
      console.log(data);
      setTimeout(cb, 3000);
    },
  },
};
</script>

<style scoped lang="postcss">
.map-view {
  width: 100%;
  height: 100%;
}

.map-search {
  position: fixed;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 500;
  width: 400px;
  border-radius: 4px;
  box-shadow: 0px 3px 6px 0px #0000004f;
}

.map-actions {
  position: fixed;
  right: 10px;
  top: 10px;
  z-index: 500;

  .el-button {
    box-shadow: 0px 3px 6px 0px #0000004f;
  }
}
</style>
