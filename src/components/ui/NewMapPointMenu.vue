<template>
  <el-drawer title="Новая точка" :visible="active" @update:visible="$emit('update:active', $event)" direction="rtl">
    <div class="el-drawer__body-container">
      <div class="el-drawer__body-content">
        <div class="lat-lng" v-if="latLng">
          <i class="el-icon el-icon-location-information" />
          <span>{{ `${latLng[0].toFixed(6)}, ${latLng[1].toFixed(6)}` }}</span>
        </div>
        <el-form ref="form" :rules="rules" :model="form" @submit.native.prevent="submitForm">
          <el-form-item label="Название точки" prop="name">
            <el-input class="el-input" v-model="form.name" placeholder="Введите название точки" />
          </el-form-item>
          <el-form-item label="Описание" prop="desc">
            <el-input class="el-input" type="textarea" v-model="form.desc" placeholder="Введите описание точки" />
          </el-form-item>
        </el-form>
      </div>
      <div class="el-drawer__footer">
        <el-button @click="$emit('update:active', false)">Отменить</el-button>
        <el-button type="primary" @click="submitForm" :loading="loading">Сохранить</el-button>
      </div>
    </div>
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
  data: () => ({
    form: {
      name: '',
      desc: '',
    },
    rules: {
      name: [{ required: true, message: 'Введите название точки!', trigger: 'blur' }],
      desc: [{ required: true, message: 'Введите описание!', trigger: 'blur' }],
    },
    loading: false,
  }),
  methods: {
    submitForm() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.loading = true;
          this.$emit(
            'add-point',
            {
              ...this.form,
              latLng: this.latLng,
            },
            () => {
              this.loading = false;
              this.$emit('update:active', false);
            },
          );
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<style lang="postcss" scoped>
.el-drawer {
  &__footer {
    display: flex;

    button {
      flex: 1;
    }
  }
}
</style>
