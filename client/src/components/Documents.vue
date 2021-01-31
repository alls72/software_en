<template>
  <div class="container container-lrl">
    <h3>Документы</h3>
    <hr>
    <table class="table table-bordered">
      <thead>
      <tr>
        <th>Документ</th>
        <th>Дата</th>
        <th>Для роли</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="doc in documents" :key="doc.id" v-on:click="openDetail(doc.id)">
        <td>{{doc.name}}</td>
        <td>{{doc.date}}</td>
        <td>{{doc.role.name}}</td>
      </tr>
      </tbody>
    </table>
    <div v-if="isAdmin" style="text-align: center; margin-top: 30px">
      <button v-on:click="addDoc">Добавить документ</button>
    </div>
  </div>
</template>

<script>
import DataService from "@/services/DataService";
export default {
  name: "Documents",
  data() {
    return {
      documents: [],
      isAdmin: Boolean
    }
  },
  methods: {
    fetchDocs() {
      DataService.getAllDocuments()
          .then(res => {
            this.documents = res.data
          })
          .catch(e => {
            console.log(e)
          })
    },
    addDoc() {
      this.$router.push("/documents/add")
    },
    openDetail(docId) {
      this.$router.push(`/documents/${docId}`)
    }
  },
  mounted() {
    this.fetchDocs()
    const authUser = JSON.parse(localStorage.getItem("user"));
    this.isAdmin = authUser.role.name === "Admin"
  }
}
</script>
