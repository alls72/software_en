<template>
  <div class="container login-container">
    <div class="flash_container">
      <flash-message transitionIn="animated swing" class="myCustomClass"></flash-message>
    </div>
    <div class="row align-items-center justify-content-center">
      <div class="col-md-6 login-form-1">
        <h3>Редактирование пароля</h3>
        <hr>
        <form @submit.prevent="changePassword">
          <div class="form-group">
            <input type="password" v-model="currentPassword"  class="form-control" placeholder="Текущий пароль" value="" required="required"/>
          </div>
          <div class="form-group">
            <input type="password" v-model="newPassword"  class="form-control" placeholder="Новый пароль" value="" required="required"/>
          </div>
          <div class="form-group">
            <input type="password" v-model="repeatPassword"  class="form-control" placeholder="Повторите пароль" value="" required="required"/>
          </div>
          <div class="form-group">
            <input type="submit" class="btn" value="Сохранить" />
          </div>
        </form>
        <div class="form-group" >
          <button v-on:click="cancel" class="ForgetPwd">Отмена</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import DataService from "@/services/DataService";

export default {
  name: "EditPassword",
  data() {
    return {
      user: Object,
      currentPassword: "",
      newPassword: "",
      repeatPassword: ""
    }
  },
  methods: {
    changePassword: function () {
        const { user, currentPassword, newPassword, repeatPassword } = this
        const data = {
          userId: user.id,
          currentPassword: currentPassword,
          newPassword: newPassword,
          repeatPassword: repeatPassword
        }

      if (data.repeatPassword !== data.newPassword) {
        this.flash("Passwords must match", 'error');
      } else {
        DataService
            .updatePassword(data)
            .then(response => {
              console.log(response.data)
              this.$router.push("/sign_in")
            })
            .catch(e => {
              console.log(e);
            })
      }
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