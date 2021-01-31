<template>
  <div class="signup-form">
    <form @submit.prevent="changeInfo">
      <h3>Редактирование профиля</h3>
      <hr>
      <div class="form-group">
        <label>Имя</label>
        <input v-model = "user.firstName" type="text" class="form-control">
      </div>
      <div class="form-group">
        <label>Фамилия</label>
        <input v-model = "user.lastName" type="text" class="form-control">
      </div>
      <div class="form-group">
        <label>Страна</label>
        <input v-model = "user.country" type="text" class="form-control">
      </div>
      <div class="form-group">
        <label>О себе</label>
        <textarea  v-model="user.about" class="form-control" rows="4" cols="50"></textarea>
      </div>
      <div class="form-group" style="text-align: center">
        <input type="submit" class="btn" value="Сохранить" />
      </div>
      <div class="form-group" style="text-align: center">
        <button v-on:click="cancel"  class="ForgetPwd">Отмена</button>
      </div>
    </form>
  </div>
</template>

<script>
import DataService from "@/services/DataService";

export default {
  name: "EditProfile",
  data() {
    return {
      user: Object
    }
  },
  methods: {
    changeInfo: function () {
      const { user } = this
      DataService
          .updateProfile(user)
          .then(response => {
            console.log(response.data)
            this.$router.push(`/profile/${response.data.id}`)
          })
          .catch(e => {
            console.log(e);
          })
    },
    cancel: function () {
      this.$router.back()
    }
  },
  mounted() {
    const id = this.$route.params.id
    DataService
        .getProfile(id)
        .then(response => {
          this.user = response.data
        })
        .catch(e => {
          console.log(e);
        })
  }
}
</script>

<style scoped>
.btn {
  font-weight: 600;
  color: #fff;
  background-color: gray;
}
</style>