import http from "../http-config.js";

class DataService {
    getAllUsers() {
        return http.get("/user/all");
    }

    login(email, password) {
        return http.get("/user", { params: { email: email, password: password } })
    }

    register(data) {
        return http.post("/user", data)
    }

    update(id, data) {
        return http.put(`/user/${id}`, data)
    }

    getAllRoles() {
        return http.get("role/all");
    }

    getRole(id) {
        return http.get(`/role/${id}`)
    }

    getProfile(id) {
        return http.get(`/profile/${id}`);
    }

    updatePassword(data) {
        return http.post("/profile/update_password", data)
    }

    updateProfile(data) {
        return http.put(`/profile/update_profile/${data.id}`, data);
    }

    updatePin(data) {
        return http.post("/profile/update_pin", data);
    }

    getAllEvent() {
        return http.get("/event/all");
    }

    updateEvent(id, event) {
        return http.put(`/event/${id}`, event)
    }

    getEvent(id) {
        return http.get(`/event/${id}`)
    }

    addEvent(data) {
        return http.post("/event/add", data);
    }

    addUser(id, data) {
        return http.put(`/event/addUser/${id}`, data)
    }

    removeUser(id, data) {
        return http.put(`/event/removeUser/${id}`, data)
    }

    getAllDocuments() {
        return http.get("/document/all");
    }

    updateDocument(id, data) {
        return http.put(`/document/${id}`, data)
    }

    deleteDocument(id) {
        return http.delete(`/document/${id}`)
    }

    getDocument(id) {
        return http.get(`/document/${id}`)
    }

    addDocument(data) {
        return http.post("/document/add", data);
    }
}

export default new DataService();