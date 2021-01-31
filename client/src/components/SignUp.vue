<template>
  <div class="signup-form">
    <div class="flash_container">
      <flash-message transitionIn="animated swing" class="myCustomClass"></flash-message>
    </div>
    <form @submit.prevent="register">
      <h3>Регистрация</h3>
      <div class="form-group">
        <label>Имя</label>
        <input v-model = "user.firstName" type="text" class="form-control" required="required">
      </div>
      <div class="form-group">
        <label>Фамилия</label>
        <input v-model = "user.lastName" type="text" class="form-control" required="required">
      </div>
      <div class="form-group">
        <label>Страна</label>
        <input v-model = "user.country" type="text" class="form-control" required="required">
      </div>
      <div class="form-group">
        <label>Email</label>
        <input v-model = "user.email" type="email" class="form-control" required="required">
      </div>
      <div class="form-group">
        <label>Пароль</label>
        <input v-model = "user.password" type="password" class="form-control" required="required">
      </div>
      <div class="form-group">
        <label>Подтверждение пароля</label>
        <input v-model = "user.repeatPassword" type="password" class="form-control" required="required">
      </div>
      <div class="form-group" style="text-align: center">
        <input type="submit" class="btn" value="Зарегистрироваться" />
      </div>
    </form>
  </div>
</template>

<script>

import DataService from "@/services/DataService";

export default {
  name: "SignUp",
  data() {
    return {
      user: {
        email: '',
        password: '',
        repeatPassword: '',
        firstName: '',
        lastName: '',
        country: '',
        avatar: ''
      }
    }
  },
  methods: {
    register: function () {
      const data =
          {
            email: this.user.email,
            password: this.user.password,
            firstName: this.user.firstName,
            lastName: this.user.lastName,
            country: this.user.country,
            avatar: this.user.avatar
          }
      const repeatPassword = this.user.repeatPassword
      if (repeatPassword !== data.password) {
        this.flash("Passwords must match", 'error');
      } else {
        DataService
            .register(data)
            .then(response => {
              console.log(response.data)
              this.$router.push("/sign_in")
            })
            .catch(e => {
              this.flash(e, 'error');
              console.log(e);
            })
      }
    },
    uploadImage(event) {
      const image = event.target.files[0];
      if (image) {
        const formData = new FormData();
        formData.append('file', image);
        DataService
            .upload(formData)
            .then(res => {
              this.user.avatar = res.data
            })
            .catch(e => {
              console.log(e)
            })
      }
    }
  }
}
</script>

<style scoped>
.btn {
  color: #fff;
  background-color: gray;
  width: 50%;
}

</style>