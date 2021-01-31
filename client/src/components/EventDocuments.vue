<template>
  <div class="container container-lrl">
    <h3>{{ event.name }} Документы</h3>
    <hr>
    <table class="table table-bordered">
      <thead>
      <tr>
        <th>Дата</th>
        <th>Документ</th>
        <th>Состояние</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="doc in event.docs" :key="doc.id">
        <td>{{doc.date}}</td>
        <td>{{doc.name}}</td>
        <td v-if="doc.isSigned">Подписан</td>
        <td v-else><button class="assign" data-toggle="modal" data-target="#exampleModalCenter" v-on:click="setDoc(doc)">Подписать</button></td>
      </tr>
      </tbody>
    </table>


    <!-- Modal PIN -->
    <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalCenterTitle">Введите PIN</h5>
          </div>
          <div class="modal-body">
            <div class="container-fluid">
                <div style="display: flex; width: auto;">
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
            </div>
          </div>
          <div class="modal-footer">
            <button class="assign" data-dismiss="modal" style="width: auto;" v-on:click="confirmPin">OK</button>
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
  name: "EventDocuments",
  data() {
    return {
      event: Object,
      first: "",
      second: "",
      third: "",
      fourth: "",
      user: {},
      selectedDoc: {}
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
    setDoc(doc){
      this.selectedDoc = doc
    },
    confirmPin() {
      const { first , second, third, fourth } = this
      const input = `${first}${second}${third}${fourth}`
      const pin = this.user.pin
      if (pin === input) {
        const doc = this.selectedDoc
        doc.isSigned = true
        DataService
            .updateDocument(doc._id, doc)
            .then(res => {
              console.log(res)
            })
            .catch(e => {
              console.log(e)
            })
      }
    }
  },
  mounted() {
    this.fetchEvent()
    const authUser = JSON.parse(localStorage.getItem("user"));
    this.user = authUser
    this.isAdmin = authUser.role.name === "Admin"
  }
}
</script>