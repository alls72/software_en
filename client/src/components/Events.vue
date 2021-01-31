<template>
  <div class="container container-lrl">
    <h3>Мероприятия</h3>
    <hr>
    <table class="table table-bordered">
      <thead>
      <tr>
        <th>Название</th>
        <th>Запланированная дата</th>
        <th>Кол-во участников</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="event in events" :key="event.id" v-on:click="openDetail(event.id)">
        <td>{{event.name}}</td>
        <td>{{event.start}} - {{event.finish}}</td>
        <td>{{event.users.length}}</td>
      </tr>
      </tbody>
    </table>
    <div style="text-align: center; margin-top: 30px" v-if="isAdmin">
      <button v-on:click="addEvent">Новое мероприятие</button>
    </div>
  </div>
</template>

<script>
import DataService from "@/services/DataService";

export default {
  name: "Events",
  data() {
    return {
      events: [],
      isAdmin: Boolean
    };
  },
  methods: {
    openDetail(eventId) {
      this.$router.push(`/events/${eventId}`)
    },
    fetchEvents() {
      DataService.getAllEvent()
          .then(response => {
            const events = response.data
            this.events = events
                .sort( (a, b) => new Date(b.start) - new Date(a.start))
          })
          .catch( e => {
            console.log(e)
          })
    },
    refreshList() {
      this.fetchEvents();
    },
    addEvent() {
      this.$router.push("/events/add")
    }
  },
  mounted() {
    this.fetchEvents();
    const authUser = JSON.parse(localStorage.getItem("user"));
    this.isAdmin = authUser.role.name === "Admin"
  }
}
</script>
