<template>
  <div class="container container-lrl" style="display: flex ;flex-direction: row">
    <div class="notice notice-lg" style="width: 300px">
      <strong>Пользователи</strong>
      <hr>
      <router-link to="/users" class="nav-link">Список</router-link>
      <router-link to="/sign_up" class="nav-link">Создать</router-link>
    </div>
    <div class="notice notice-lg" style="width: 300px">
      <strong>Мероприятия</strong>
      <hr>
      <router-link to="/events" class="nav-link">Список</router-link>
      <router-link v-if="isAdmin" to="/events/add" class="nav-link">Создать новое</router-link>
    </div>
    <div class="notice notice-lg" style="width: 300px">
      <strong>Документы</strong>
      <hr>
      <router-link to="/documents" class="nav-link">Список</router-link>
      <router-link v-if="isAdmin" to="/documents/add" class="nav-link">Создать</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      isAdmin: Boolean
    }
  },
  mounted() {
    const authUser = JSON.parse(localStorage.getItem("user"));
    this.isAdmin = authUser.role.name === "Admin"
  }
}
</script>

<style scoped>

</style>