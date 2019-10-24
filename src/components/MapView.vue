<template>
  <div class="map-view">
    <l-map :zoom="zoom" :center="center" :options="{ zoomControl: false }" @click="clickMap" :style="mapStyle">
      <l-control-zoom position="bottomright" />
      <l-tile-layer :url="url" />
      <l-marker :lat-lng="markerLatLng" :icon="centerIcon" />
      <l-marker v-for="point in points" :key="point.id" :lat-lng="point.latLng" :icon="pointIcon">
        <l-popup>
          <span style="font-weight: bold; text-transform: capitalize; font-size: 14px;">{{ point.name }}</span>
          <br />
          <span style="white-space: pre;">{{ point.desc }}</span>
          <br />
          <a href="#" @click.prevent="deletePointEvent(point)">Удалить</a>
        </l-popup>
      </l-marker>
    </l-map>
    <map-search class="map-search" @change-coordinates="changeCoordinates" />
    <el-button-group class="map-actions">
      <el-button :class="{ active: itemAddingActive }" @click="clickItemAddingButton" icon="el-icon-plus" circle />
    </el-button-group>
    <new-map-point-menu
      :active.sync="newMapPointMenuActive"
      :lat-lng="newMapPointMenuLatLng"
      @add-point="addPointEvent"
    />
  </div>
</template>

<script>
import LMap from './leaflet/LMap';
import LTileLayer from './leaflet/LTileLayer';
import LMarker from './leaflet/LMarker';
import LControlZoom from './leaflet/LControlZoom';
import LPopup from './leaflet/LPopup';
import MapSearch from './ui/MapSearch';
import NewMapPointMenu from './ui/NewMapPointMenu';
import mapStoreMixin from '../mixins/store/mapStoreMixin';
import { icon } from 'leaflet';
import '../plugins/Leaflet.Icon.Glyph';

export default {
  name: 'MapView',
  mixins: [mapStoreMixin],
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LControlZoom,
    MapSearch,
    NewMapPointMenu,
    LPopup,
  },
  data: () => ({
    url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
    zoom: 11,
    center: [55.755814, 37.617635],
    centerIcon: icon.glyph({
      prefix: 'mdi',
      glyph: 'crosshairs-gps',
      glyphPos: [1.5, 4.5],
    }),
    pointIcon: icon.glyph({
      prefix: 'mdi',
      glyph: 'map',
    }),
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
    async addPointEvent(data, cb) {
      await this.addPoint({ point: data });
      cb();
    },
    async deletePointEvent(point) {
      await this.deletePoint({ id: point.id });
    },
  },
  created() {
    this.loadPoints();
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
