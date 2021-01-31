<template>
  <div class="container container-lrl">
    <div class="notice  notice-lg">
      <strong>Информация о документе</strong>
      <img v-if="isAdmin" data-toggle="modal" data-target="#exampleModalCenter" src="https://img.icons8.com/android/344/pencil.png" style="height: 20px; width: 20px"/>
      <hr>
      <label>Название:</label>&nbsp;
      <label class="label label-default">{{ doc.name }}</label><br>
      <label>Дата:</label>&nbsp;
      <label class="label label-default">{{ doc.date }}</label><br>
      <label>Содержимое: </label>&nbsp;
      <label class="label label-default">{{ doc.desc }}</label><br>
      <label>Для роли:</label>&nbsp;
      <label class="label label-default">{{ doc.role.name }}</label>
    </div>
    <div v-if="isAdmin" class="form-group" style="text-align: center">
      <button v-on:click="deleteDoc"  class="ForgetPwd">Удалить</button>
    </div>
    <div class="form-group" style="text-align: center">
      <button v-on:click="back"  class="ForgetPwd">Назад</button>
    </div>

    <!-- Modal Event title -->
    <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalCenterTitle">Изменение</h5>
          </div>
          <div class="modal-body">
            <div class="container-fluid">
              <div class="form-group">
                <label>Название</label>
                <input v-model = "doc.name" type="text" class="form-control" required="required">
              </div>
              <div class="form-group">
                <label>Дата: </label>
                <input v-model = "doc.date" type="date" class="form-control" required="required">
              </div>
              <div class="form-group">
                <label> Содержимое</label>
                <textarea  v-model="doc.desc" class="form-control" rows="4" cols="50" required="required"></textarea>
              </div>
              <div class="form-group">
                <label>Для роли:</label>
                <select class="form-control form-control-sm" v-model="doc.role" required="required">
                  <option disabled value="">Выберите роль</option>
                  <option value="5fc37fc7f2a8280450a4176d">Эксперт</option>
                  <option value="5fc37fd8f2a8280450a4176e">Конкурент</option>
                </select>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button class="assign" data-dismiss="modal" style="width: auto;" v-on:click="update">Сохранить</button>
            <button class="btn btn-secondary" style="width: auto" data-dismiss="modal">Отменить</button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import DataService from "@/services/DataService";
export default {
  name: "Document",
  data() {
    return {
      doc: Object,
      isAdmin: Boolean
    }
  },
  methods: {
    fetchDoc() {
      const id = this.$route.params.id
      DataService
          .getDocument(id)
          .then(res => {
            console.log(res.data)
            this.doc = res.data
          })
          .catch(e => {
            console.log(e)
          })
    },
    back() {
      this.$router.back()
    },
    update() {
      const id = this.$route.params.id
      DataService
          .updateDocument(id, this.doc)
          .then(res => {
            console.log(res)
            this.fetchDoc()
          })
          .catch(e => {
            console.log(e)
          })
    },
    deleteDoc() {
      const id = this.$route.params.id
      DataService
          .deleteDocument(id)
          .then(res => {
            console.log(res)
            this.$router.back()
          })
          .catch(e => {
            console.log(e)
          })
    }
  },
  mounted() {
    this.fetchDoc()
    const authUser = JSON.parse(localStorage.getItem("user"));
    this.isAdmin = authUser.role.name === "Admin"
  }
}
</script>
