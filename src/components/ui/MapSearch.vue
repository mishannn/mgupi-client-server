<template>
  <el-autocomplete
    v-model="address"
    :fetch-suggestions="searchAddress"
    placeholder="Введите адрес"
    :trigger-on-focus="false"
    @select="selectAddress"
    :disabled="!ymapsReady"
    select-when-unmatched
    hide-loading
    clearable
  >
    <i slot="prefix" class="el-input__icon el-icon-search" />
  </el-autocomplete>
</template>

<script>
/* global ymaps */

export default {
  name: 'MapSearch',
  data: () => ({
    address: '',
    ymapsReady: false,
    autocompleteLoading: false,
  }),
  methods: {
    async searchAddress(query, cb) {
      this.autocompleteLoading = true;
      const items = await ymaps.suggest(query);
      const autocompleteItems = items.map(item => ({
        value: item.displayName,
        address: item.value,
      }));

      cb(autocompleteItems);
      this.autocompleteLoading = false;
    },
    async selectAddress(address) {
      if (!this.address.length) return;

      this.address = address.address || address.value;
      this.processGeocode();
    },
    async processGeocode() {
      const res = await ymaps.geocode(this.address);
      const coordinates = res.geoObjects.get(0).geometry._coordinates;
      this.$emit('changeCoordinates', coordinates);
    },
  },
  created() {
    ymaps.ready(() => {
      this.ymapsReady = true;
    });
  },
};
</script>

<style></style>
