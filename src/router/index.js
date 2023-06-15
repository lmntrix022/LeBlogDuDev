import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Blogs from "../views/Blogs.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import ForgotPassword from "../views/ForgotPassword.vue";
import Profil from "../views/Profil.vue";
import Admin from "../views/Admin.vue";
import CreatePost from "../views/CreatePost.vue";
import EditBlog from "../views/EditingBlog.vue";
import PreviewPost from "../views/BlogPreview.vue";
import ViewBlog from "../views/ViewBlog.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    meta: {
      title:"Home",
    }
  },
  {
    path: "/blogs",
    name: "blogs",
    component: Blogs,
    meta: {
      title:"Le Blog",
    }
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: {
      title:"Login",
    }
  },
  {
    path: "/register",
    name: "register",
    component: Register,
    meta: {
      title:"Register",
    }
  },
  {
    path: "/forgot-password",
    name: "forgotPassword",
    component: ForgotPassword,
    meta: {
      title:"Forgot Password",
    }
  },
  {
    path: "/profil",
    name: "profil",
    component: Profil,
    meta: {
      title:"Profil",
    }
  },
  {
    path: "/admin",
    name: "admin",
    component: Admin,
    meta: {
      title:"Admin",
    }
  },
  {
    path: "/create-post",
    name: "createPost",
    component: CreatePost,
    meta: {
      title:"Creer un Post",
    }
  },
  {
    path: "/preview-post",
    name: "previewPost",
    component: PreviewPost,
    meta: {
      title:"Preview Blog Post",
    }
  },
  {
    path: "/view-blog/:blogid",
    name: "ViewBlog",
    component: ViewBlog,
    meta: {
      title:"View Blog Post",
    }
  },
  {
    path: "/edit-blog/:blogid",
    name: "EditBlog",
    component: EditBlog,
    meta: {
      title:"Edit Blog Post",
    }
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | LeBLOG Du Dev `;
  next(); 
});

export default router;
