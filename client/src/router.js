import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);

export default new Router({
    mode: "history",
    routes: [
        {
            path: "/sign_in",
            component: () => import("./components/SignIn")
        },
        {
            path: "/sign_up",
            component: () => import("./components/SignUp")
        },
        {
            path: "/profile/:id",
            name: "profile",
            component: () => import("./components/Profile")
        },
        {
            path: "/users",
            component: () => import("./components/Users")
        },
        {
            path: "/profile/edit_password/:id",
            component: () => import("./components/EditPassword")
        },
        {
            path: "/profile/edit_profile/:id",
            component: () => import("./components/EditProfile")
        },
        {
            path: "/profile/edit_pin/:id",
            component: () => import("./components/EditPin")
        },
        {
            path: "/documents/add",
            component: () => import("./components/NewDocument")
        },
        {
            path: "/documents",
            component: () => import("./components/Documents")
        },
        {
            path: "/documents/:id",
            component: () => import("./components/Document")
        },
        {
            path: "/events",
            component: () => import("./components/Events")
        },
        {
            path: "/events/add",
            component: () => import("./components/NewEvent")
        },
        {
            path: "/events/:id",
            component: () => import("./components/Event")
        },
        {
            path: "/events/:id/docs",
            component: () => import("./components/EventDocuments")
        },
        {
            path: "/home",
            component: () => import("./components/Home")
        }
    ]
});