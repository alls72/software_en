<template>
  <div class="signup-form">
    <form @submit.prevent="addEvent">
      <h3>Новое мероприятие</h3>
      <hr>
      <div class="form-group">
        <label>Названиие</label>
        <input v-model="data.name" type="text" class="form-control" required="required">
      </div>
      <div class="form-group">
        <label>Дата начала</label>
        <input v-model="data.start" type="date" class="form-control" required="required">
      </div>
      <div class="form-group">
        <label>C1 Дата</label>
        <input v-model="data.CStart" type="date" class="form-control" required="required">
      </div>
      <div class="form-group">
        <label>C+1 Дата</label>
        <input v-model="data.CFinish" type="date" class="form-control" required="required">
      </div>
      <div class="form-group">
        <label>Дата окончания</label>
        <input v-model="data.finish" type="date" class="form-control" required="required">
      </div>
      <div class="form-group" style="text-align: center">
        <input type="submit" class="btn" value="Добавить" style="font-weight: 600;" />
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
  name: "NewEvent",
  data() {
    return {
      data: {
        name: '',
        start: '',
        CStart: '',
        CFinish: '',
        finish: '',
        image: ''
      }
    }
  },
  methods: {
    addEvent() {
      DataService
          .addEvent(this.data)
          .then(data => {
            console.log(data)
            this.$router.push("/events")
          })
          .catch(e => {
            console.log(e)
          })
    },
    cancel() {
      this.$router.back()
    }
  }
}
</script>

