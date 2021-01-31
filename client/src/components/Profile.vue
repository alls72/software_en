<template>
  <div class="container container-lrl">
    <div class="notice notice-lg">
      <strong>Данные авторизации</strong>
      <img  v-on:click="editPassword" src="https://img.icons8.com/android/344/pencil.png" style="height: 20px; width: 20px"/>
      <hr>
      <label>Email:</label>&nbsp;<label class="label label-default">{{ user.email }}</label><br>
      <label>Роль:</label>&nbsp;<label class="label label-default">{{ user.role.name }}</label>
    </div>
    <div class="notice  notice-lg">
      <strong>Данные профиля</strong>
      <img v-on:click="editProfile" src="https://img.icons8.com/android/344/pencil.png" style="height: 20px; width: 20px"/>
      <hr>
      <label>Имя:</label>&nbsp;
      <label class="label label-default">{{ user.firstName }}</label><br>
      <label>Фамилия:</label>&nbsp;
      <label class="label label-default">{{ user.lastName }}</label><br>
      <label>Страна:</label>&nbsp;
      <label class="label label-default">{{ user.country }}</label><br>
      <label>О себе:</label>&nbsp;
      <label class="label label-default">{{ user.about }}</label>
    </div>
    <div class="notice notice-lg">
      <strong>PIN</strong>
      <img v-on:click="editPin" src="https://img.icons8.com/android/344/pencil.png" style="height: 20px; width: 20px"/>
      <hr>
      <label v-if="user.pin" >PIN: ••••</label>
      <label v-else v-on:click="editPin" class="pin-setting">Установить PIN</label>
    </div>
  </div>
</template>

<script>

import DataService from "@/services/DataService";

export default {
  name: "Profile",
  data() {
    return {
      user: Object
    }
  },
  methods: {
    editPassword: function () {
        const user = this.user
        this.$router.push(`/profile/edit_password/${user.id}`)
    },
    editProfile: function () {
        const user = this.user
        this.$router.push(`/profile/edit_profile/${user.id}`)
    },
    editPin: function () {
      const user = this.user
      this.$router.push(`/profile/edit_pin/${user.id}`)
    },
    update() {
      const id = this.$route.params.id
      DataService
          .update(id, this.user)
          .then(res => {
            console.log(res.data)
          })
        .catch(e => {
          console.log(e)
        })
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
              this.update()
            })
            .catch(e => {
              console.log(e)
            })
      }
    }
  },
  mounted() {
    const id = this.$route.params.id
    DataService
        .getProfile(id)
        .then(response => {
          this.user = response.data
          const user = JSON.stringify(response.data)
          localStorage.setItem("user", user)
        })
        .catch(e => {
          console.log(e);
        })
  }
}
</script>
<style scoped>
.pin-setting {
  cursor: pointer;
  background-color: #7f7f84;
  padding: 1.5%;
  width: 150px;
  color: #fff;
  text-align: center;
  margin-left: 24%;
  border-radius: 1rem;
}

</style>