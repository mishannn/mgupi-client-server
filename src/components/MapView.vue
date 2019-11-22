<template>
  <div class="map-view">
    <l-map :zoom="zoom" :center="center" :options="{ zoomControl: false }" @click="clickMap" :style="mapStyle">
      <l-control-zoom position="bottomright" />
      <l-tile-layer :url="url" :options="{ detectRetina: true }" />
      <l-marker :lat-lng="markerLatLng" :icon="centerIcon" />
      <l-marker v-for="point in points" :key="point.id" :lat-lng="point.latLng" :icon="pointIcon">
        <l-popup>
          <span style="font-weight: bold; text-transform: capitalize; font-size: 14px;">{{ point.name }}</span>
          <br />
          <span style="white-space: pre;">{{ point.desc }}</span>
          <template v-if="point.my">
            <br />
            <a href="#" @click.prevent="deletePointEvent(point)">Удалить</a>
          </template>
        </l-popup>
      </l-marker>
    </l-map>
    <map-search class="map-search" @change-coordinates="changeCoordinates" />
    <el-button-group class="map-actions">
      <el-button
        :class="{ active: itemAddingActive }"
        @click="clickItemAddingButton"
        icon="el-icon-plus"
        title="Добавить точку"
        circle
      />
      <el-button @click="refreshPoints" icon="el-icon-refresh" title="Обновить точки" circle />
      <el-button @click="signOut" icon="el-icon-close" title="Выйти из аккаунта" circle />
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
import authStoreMixin from '../mixins/store/authStoreMixin';

export default {
  name: 'MapView',
  mixins: [mapStoreMixin, authStoreMixin],
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
      const result = await this.addPoint({ point: data, token: this.jwtToken });

      if (result.success) {
        this.$notify.success({
          title: 'Добавление точки',
          message: 'Точка успешно добавлена',
        });
      } else {
        this.$notify.error({
          title: 'Добавление точки',
          message: result.error,
        });
      }

      cb();
    },
    async deletePointEvent(point) {
      const result = await this.deletePoint({ id: point.id, token: this.jwtToken });

      if (result.success) {
        this.$notify.success({
          title: 'Удаление точки',
          message: 'Точка успешно удалена',
        });
      } else {
        this.$notify.error({
          title: 'Удаление точки',
          message: result.error,
        });
      }
    },
    async refreshPoints() {
      const result = await this.loadPoints({ token: this.jwtToken });

      if (result.success) {
        this.$notify.success({
          title: 'Обновление точек',
          message: 'Точки успешно обновлены',
        });
      } else {
        this.$notify.error({
          title: 'Обновление точек',
          message: result.error,
        });
      }
    },
  },
  created() {
    this.refreshPoints();
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
  box-shadow: 0px 3px 6px 0px #0000004f;
  border-radius: 20px;

  /* .el-button {
    box-shadow: 0px 3px 6px 0px #0000004f;
  } */
}
</style>
