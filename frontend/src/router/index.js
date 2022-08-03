import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Signup from '../views/Signup.vue'
import Profile from '../views/Profile.vue'
import EditProfile from '../views/EditProfile.vue'
import CreatePost from '../views/CreatePost.vue'
import EditPost from '../views/EditPost.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/profile/:userId',
    name: 'profile',
    component: Profile
  },
  {
    path: '/profile/:userId/edit',
    name: 'editprofile',
    component: EditProfile
  },
  {
    path: '/createPost',
    name: 'createPost',
    component: CreatePost
  },
  {
    path: '/editPost/:postId',
    name: 'editPost',
    component: EditPost
  }
  
]

const router = new VueRouter({
  mode:"history",
  routes
})

export default router
