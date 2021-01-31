<template>
  <div class="container login-container">
    <div class="row align-items-center justify-content-center">
      <div class="col-md-6 login-form-1">
        <h3>Смена PIN</h3>
        <hr>
        <form @submit.prevent="changePin">
          <div class="form-group" style="display: flex; flex-direction: row">
            <input v-model="first"  min="1" max="9" class="form-control" value="" required="required"
                   oninput="if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
                   type = "number"
                   maxlength = "1"/>
            <input v-model="second" min="1" max="9" class="form-control" value="" required="required"
                   oninput="if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
                   type = "number"
                   maxlength = "1"/>
            <input v-model="third"  min="1" max="9" class="form-control" value="" required="required"
                   oninput="if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
                   type = "number"
                   maxlength = "1"/>
            <input v-model="fourth"  min="1" max="9" class="form-control" value="" required="required"
                   oninput="if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
                   type = "number"
                   maxlength = "1"/>
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
  name: "EditPin",
  data() {
    return {
      first: "",
      second: "",
      third: "",
      fourth: ""
    }
  },
  methods: {
    changePin: function () {
      const { first , second, third, fourth } = this
      const data = {
        id: this.$route.params.id,
        pin: `${first}${second}${third}${fourth}`
      }
      DataService
          .updatePin(data)
          .then(response => {
            console.log(response.data)
            this.$router.push(`/profile/${this.$route.params.id}`)
          })
          .catch(e => {
            console.log(e);
          })
    },
    cancel: function () {
      this.$router.back()
    }
  }
}
</script>

<style scoped>
.btn {
  color: #fff;
  background-color: gray;
}

</style>