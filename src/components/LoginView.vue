<template>
  <div class="login-view">
    <el-card v-if="!signupMode" class="login-card">
      <div slot="header" class="clearfix">
        <span>Войдите в систему</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="signupMode = true">Регистрация</el-button>
      </div>
      <el-form @submit.native.prevent>
        <el-form-item label="Имя пользователя">
          <el-input v-model="loginFormUsername" placeholder="Введите имя пользователя" />
        </el-form-item>
        <el-form-item label="Пароль">
          <el-input v-model="loginFormPassword" placeholder="Введите пароль" show-password />
        </el-form-item>
        <div class="login-button-wrapper">
          <el-button class="login-button" type="primary" @click="doSignIn" :loading="buttonLoading">
            Вход
          </el-button>
        </div>
      </el-form>
    </el-card>
    <el-card v-else class="login-card">
      <div slot="header" class="clearfix">
        <span>Зарегистрируйтесь</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="signupMode = false">
          Уже зарегистрирован
        </el-button>
      </div>
      <el-form @submit.native.prevent>
        <el-form-item label="Имя пользователя">
          <el-input v-model="loginFormUsername" placeholder="Введите имя пользователя" />
        </el-form-item>
        <el-form-item label="Пароль">
          <el-input v-model="loginFormPassword" placeholder="Введите пароль" show-password />
        </el-form-item>
        <div class="login-button-wrapper">
          <el-button class="login-button" type="primary" @click="doSignUp" :loading="buttonLoading">
            Зарегистрироваться
          </el-button>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import authStoreMixin from '../mixins/store/authStoreMixin';

export default {
  name: 'LoginView',
  mixins: [authStoreMixin],
  data: () => ({
    buttonLoading: false,
    signupMode: false,
    loginFormUsername: '',
    loginFormPassword: '',
  }),
  methods: {
    async doSignUp() {
      if (!this.validateCredentials()) return;

      this.buttonLoading = true;
      const result = await this.signUp({
        username: this.loginFormUsername,
        password: this.loginFormPassword,
      });
      this.buttonLoading = false;

      if (!result.success) {
        this.$notify.error({
          title: 'Ошибка!',
          message: result.error,
        });
        return;
      }

      this.signupMode = false;
      this.$notify.success({
        title: 'Успешно!',
        message: 'Вы успешно зарегистрированы',
      });
    },
    async doSignIn() {
      if (!this.validateCredentials()) return;

      this.buttonLoading = true;
      const result = await this.signIn({
        username: this.loginFormUsername,
        password: this.loginFormPassword,
      });
      this.buttonLoading = false;

      if (!result.success) {
        this.$notify.error({
          title: 'Ошибка!',
          message: result.error,
        });
      }
    },
    validateCredentials() {
      if (!this.loginFormUsername.length || !this.loginFormPassword.length) {
        this.$notify.warning({
          title: this.signupMode ? 'Регистрация' : 'Вход в систему',
          message: 'Введите логин и пароль!',
        });
        return false;
      }

      return true;
    },
  },
};
</script>

<style scoped lang="postcss">
.login-view {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(#adadad, #3c3c3c);

  .login-card {
    width: 500px;

    .login-button-wrapper {
      padding: 8px 0;
    }

    .login-button {
      width: 100%;
    }
  }
}
</style>
