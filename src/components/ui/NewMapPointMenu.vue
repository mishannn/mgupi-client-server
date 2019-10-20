<template>
  <el-drawer title="Новая точка" :visible="active" @update:visible="$emit('update:active', $event)" direction="rtl">
    <span>{{ latLng }}</span>
  </el-drawer>
</template>

<script>
export default {
  name: 'NewMapPointMenu',
  props: {
    active: {
      type: Boolean,
      required: true,
    },
    latLng: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style></style>
