<template>
  <div class="container login-container">
    <div class="flash_container">
      <flash-message transitionIn="animated swing" class="myCustomClass"></flash-message>
    </div>
    <div class="row align-items-center justify-content-center">
      <div class="col-md-6 login-form-1">
        <h3>Авторизация</h3>
        <form @submit.prevent="login">
          <div class="form-group">
            <input type="text" v-model="email" class="form-control" placeholder="Email" value="" required="required"/>
          </div>
          <div class="form-group">
            <input type="password" v-model="password"  class="form-control" placeholder="Пароль" value="" required="required"/>
          </div>
          <div class="form-group">
            <input type="submit" class="btn" value="Войти" />
          </div>
          <div class="form-group" >
            <button v-on:click="openRegistration" class="ForgetPwd">Регистрация</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>

import DataService from "@/services/DataService";

export default {
  name: "SignIn",
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login: function () {
      const { email, password } = this
      DataService
          .login(email, password)
          .then(response => {
            console.log(response.data)
            this.$router.push(`/profile/${response.data.id}`)
          })
          .catch(e => {
            this.flash("Wrong email or password", 'error');
            console.log(e)
          })
    },
    openRegistration: function () {
      this.$router.push("/sign_up")
    }
  }
}
</script>

<style scoped>
</style>