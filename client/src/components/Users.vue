<template>
  <div class="container container-lrl">
    <h3>Пользователи</h3>
    <hr>
    <table class="table table-bordered">
      <thead>
      <tr>
        <th>Имя</th>
        <th>Мероприятие</th>
        <th>Роль</th>
        <th v-if="isAdmin">Мероприятие</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="user in users" :key="user.id">
        <td>{{user.firstName}} {{user.lastName}}</td>
        <td v-if="user.event">{{user.event.name}}</td>
        <td v-else></td>
        <td>{{user.role.name !== 'No role' ? user.role.name : ''}}</td>
        <th v-if="isAdmin && user.event">
          <button class="remove" v-on:click="removeUserFromEvent(user, user.event._id)">
            Удалить
          </button>
        </th>
        <td v-else-if="isAdmin">
          <button class="assign" data-toggle="modal" data-target="#exampleModalCenter" v-on:click="setUser(user)">
            Назначить
          </button>
        </td>
      </tr>
      </tbody>
    </table>

    <!-- Modal -->
    <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalCenterTitle">Select event</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="container-fluid">
              <label>Мероприятие</label>
              <select class="form-control form-control-sm" v-model="selectedEvent">
                <option disabled value="">Выберите мероприятие</option>
                <option v-for="option in events" :key="option.id" :value="option.id">
                  {{ option.name }}
                </option>
              </select><br>
              <label>Роль</label>
              <select class="form-control form-control-sm" v-model="selectedRole" >
                <option v-for="option in roles" :key="option.id" :value="option.id">
                  {{ option.name }}
                </option>
              </select>
            </div>

          </div>
          <div class="modal-footer">
            <button class="assign" data-dismiss="modal" style="width: auto;" v-on:click="addUserToEvent">Сохранить</button>
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
  name: "Users",
  data() {
    return {
      users: [],
      events: [],
      roles: [],
      selectedEvent: "",
      selectedRole: "",
      selectedUser: Object,
      isAdmin: Boolean
    };
  },
  methods: {
    retrieveUsers() {
      DataService.getAllUsers()
          .then(response => {
            const users = response.data
            this.users = users
                .sort( (a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .sort( (a, b) => (b.event===null)-(a.event===null))
                .filter(user => user.role.name !== "Admin");
          })
          .catch(e => {
            console.log(e);
          });
    },
    fetchRoles() {
      DataService
          .getAllRoles()
          .then(response => {
            this.roles = response.data.filter(role => role.name !== "Admin");
          })
          .catch(e => {
            console.log(e);
          });
    },
    fetchEvents() {
      DataService
          .getAllEvent()
          .then(response => {
            this.events = response.data
          })
          .catch(e => {
            console.log(e);
          });
    },
    removeUserFromEvent(user, eventId) {
      const data = {
        user: user
      }
      console.log(user)
      DataService
          .removeUser(eventId, data)
          .then(response => {
            console.log(response)
            this.refreshList()
          })
          .catch(e => {
            console.log(e)
          })
    },
    setUser(user) {
      this.selectedUser = user
    },
    addUserToEvent() {
      const eventId = this.selectedEvent
      const roleId = this.selectedRole
      console.log(roleId)
      const data = {
        user: this.selectedUser,
        role: roleId
      }
      DataService
          .addUser(eventId, data)
          .then(response => {
            console.log(response)
            this.refreshList()
          })
          .catch(e => {
            console.log(e)
          })
    },
    refreshList() {
      this.retrieveUsers();
    }
  },
  mounted() {
    this.retrieveUsers();
    this.fetchEvents();
    this.fetchRoles();
    const authUser = JSON.parse(localStorage.getItem("user"));
    this.isAdmin = authUser.role.name === "Admin"
  }
}
</script>