<template>
  <div class="signup-form">
    <form @submit.prevent="addDocument">
      <h3>Новый документ</h3>
      <hr>
      <div class="form-group">
        <label>Название</label>
        <input v-model = "document.name" type="text" class="form-control" required="required">
      </div>
      <div class="form-group">
        <label>Дата</label>
        <input v-model = "document.date" type="date" class="form-control" required="required">
      </div>
      <div class="form-group">
        <label>Содержание</label>
        <textarea  v-model="document.desc" class="form-control" rows="4" cols="50" required="required"></textarea>
      </div>
      <div class="form-group">
        <label>Мероприятие</label>
        <select class="form-control form-control-sm" v-model="document.event">
          <option disabled value="">Выберите мероприятие</option>
          <option v-for="option in events" :key="option.id" :value="option.id">
            {{ option.name }}
          </option>
        </select>
      </div>
      <div class="form-group">
        <label>Для роли:</label>
        <select class="form-control form-control-sm" v-model="document.role" required="required">
          <option disabled value="">Выберите роль</option>
          <option value="5fc37fc7f2a8280450a4176d">Эксперт</option>
          <option value="5fc37fd8f2a8280450a4176e">Конкурент</option>
        </select>
      </div>
      <div class="form-group" style="text-align: center">
        <input type="submit" class="btn" value="Создать" />
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
  name: "NewDocument",
  data() {
    return {
      document: {
        name: "",
        date: "",
        desc: "",
        event: "",
        role: ""
      },
      events: []
    }
  },
  methods: {
    fetchEvents() {
      DataService
          .getAllEvent()
          .then(res => {
            this.events = res.data
          })
          .catch(e => {
            console.log(e)
          })
    },
    addDocument() {
      DataService
          .addDocument(this.document)
          .then(res => {
            console.log(res)
            this.$router.back()
          })
          .catch(e => {
            console.log(e)
          })
    },
    cancel() {
      this.$router.back()
    }
  },
  mounted() {
    this.fetchEvents()
  }
}
</script>