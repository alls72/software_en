<template>
  <div id="app">
    <nav class="navbar navbar-expand navbar-dark bg-primary">
      <div class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link to="/home" class="nav-link">Главная</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/sign_in" class="nav-link">Авторизация</router-link>
        </li>
        <li v-if="isAuth">
          <router-link :to="{ name: 'profile', params: { id: user.id }}" class="nav-link">Профиль</router-link>
        </li>
      </div>
    </nav>

    <div class="container mt-3">
      <router-view />
    </div>
  </div>
</template>

<script>
require('vue-flash-message/dist/vue-flash-message.min.css');
export default {
  name: 'App',
  data() {
    return {
      isAuth: Boolean,
      user: {}
    }
  },
  mounted() {
    const authUser = JSON.parse(localStorage.getItem("user"));
    this.user = authUser
    this.isAuth = !!authUser
  }
}
</script>

<style>

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
