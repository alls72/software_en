<template>
  <div class="container container-lrl">

    <div class="notice notice-lg">
      <strong>Информация</strong>
      <img v-if="isAdmin" data-toggle="modal" data-target="#exampleModalCenter" src="https://img.icons8.com/android/344/pencil.png" style="height: 20px; width: 20px"/>
      <hr>
      <label>Название:</label>&nbsp;<label class="label label-default">{{ event.name }}</label>
    </div>
    <div class="notice  notice-lg">
      <strong>Даты</strong>
      <img v-if="isAdmin" data-toggle="modal" data-target="#exampleModalCenterDates" src="https://img.icons8.com/android/344/pencil.png" style="height: 20px; width: 20px" />
      <hr>
      <label>Дата начала:</label>&nbsp;
      <label class="label label-default">{{ event.start }}</label><br>
      <label>C1 Дата:</label>&nbsp;
      <label class="label label-default">{{ event.CStart }}</label><br>
      <label>C+1 Дата:</label>&nbsp;
      <label class="label label-default">{{ event.CFinish }}</label><br>
      <label>Дата окончания:</label>&nbsp;
      <label class="label label-default">{{ event.finish }}</label><br>
      <label>Кол-во участников:</label>&nbsp;<label>{{ event.users.length }}</label>
    </div>
    <div class="form-group" style="text-align: center">
      <button v-on:click="openDocs"  class="ForgetPwd">Документы</button>
    </div>
    <div class="form-group" style="text-align: center">
      <button v-on:click="back"  class="ForgetPwd">Назад</button>
    </div>

    <!-- Modal Event title -->
    <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalCenterTitle">Заголовок</h5>
          </div>
          <div class="modal-body">
            <div class="container-fluid">
              <label>Название:</label>
              <input type="text" v-model="event.name" class="form-control" value="" required="required"/>
            </div>
          </div>
          <div class="modal-footer">
            <button class="assign" data-dismiss="modal" style="width: auto;" v-on:click="update">Сохранить</button>
            <button class="btn btn-secondary" style="width: auto" data-dismiss="modal">Отмена</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Event Dates  -->
    <div class="modal fade" id="exampleModalCenterDates" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitleDates" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalCenterTitleDates">Сохранить</h5>
          </div>
          <div class="modal-body">
            <div class="container-fluid">
              <div class="form-group">
                <label>Дата начала</label>
                <input v-model="event.start" type="date" class="form-control" required="required">
              </div>
              <div class="form-group">
                <label>C1 Дата</label>
                <input v-model="event.CStart" type="date" class="form-control" required="required">
              </div>
              <div class="form-group">
                <label>C+1 Дата</label>
                <input v-model="event.CFinish" type="date" class="form-control" required="required">
              </div>
              <div class="form-group">
                <label>Дата окончания</label>
                <input v-model="event.finish" type="date" class="form-control" required="required">
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button class="assign" data-dismiss="modal" style="width: auto;" v-on:click="update">Сохранить</button>
            <button class="btn btn-secondary" style="width: auto" data-dismiss="modal">Отмена</button>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import DataService from "@/services/DataService";
export default {
  name: "Event",
  data() {
    return {
      event: Object,
      isAdmin: Boolean
    }
  },
  methods: {
    fetchEvent() {
      const id = this.$route.params.id
      DataService
          .getEvent(id)
          .then(res => {
            this.event = res.data
          })
        .catch(e => {
          console.log(e)
        })
    },
    update() {
      const id = this.$route.params.id
      const event = this.event
      DataService
          .updateEvent(id, event)
          .then(res => {
            console.log(res)
          })
          .catch(e => {
            console.log(e)
          })
    },
    back() {
      this.$router.back()
    },
    openDocs() {
      const id = this.$route.params.id
      this.$router.push(`/events/${id}/docs`)
    }
  },
  mounted() {
    this.fetchEvent()
    const authUser = JSON.parse(localStorage.getItem("user"));
    this.isAdmin = authUser.role.name === "Admin"
  }
}
</script>