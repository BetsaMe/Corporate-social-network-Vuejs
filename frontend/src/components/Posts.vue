<template>
  <div>
    <div id="notif-post"></div>
    <div v-if="posts.length === 0">
      <p class="empty-home mx-auto my-5 d-flex justify-content-center">
        Il n'y a rien par ici !, Commence à publier !!
      </p>
      <img
        src="/images/rabbit.webp"
        alt="rabbit"
        class="d-flex justify-content-center mx-auto rabbit-img"
      />
    </div>
    <div v-for="post in posts" v-bind:key="post.title">
      <div class="cardStyle shadow-sm mt-3 p-4">
        <div class="d-flex justify-content-between align-items-center">
          <p class="my-0">
            <span class="text-bold">Auteur:</span> {{ post.authorName }}
          </p>
          <div class="d-flex">
            <div v-if="userConnected.id == post.userId">
              <router-link
                :to="{ name: 'editPost', params: { postId: post.id } }"
                ><i class="far fa-edit mr-4 btn-icon-blue"></i
              ></router-link>
            </div>
            <div v-if="userConnected.id === post.userId || isAdmin === true">
              <div @click="deletePost(post)">
                <i class="far fa-trash-alt btn-icon-blue"></i>
              </div>
            </div>
          </div>
        </div>
        <p class="text-start my-2">
          <span class="text-bold">Titre:</span> {{ post.title }}
        </p>
        <p class="my-0">{{ dateCreation(post.createdAt) }}</p>
        <p class="text-start mt-2">{{ post.content }}</p>
        <img class="photoPost" :src="post.image" alt="image" />

        <div class="bottomIcons d-flex mt-4">
          <LikeButton :idByPost="post.id" />
          <div class="btn">
            <i class="fas fa-share-alt btn-icon-blue"></i><span>10</span>
          </div>
          <div class="btn"><i class="fa fa-bookmark btn-icon-blue"></i></div>
        </div>
        <Comment v-bind:idDePost="post.id" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Comment from "@/components/Comment.vue";
import LikeButton from "@/components/LikeButton.vue";

export default {
  name: "Posts",
  components: {
    Comment,
    LikeButton,
  },
  data() {
    return {
      postId: {},
      comments: [],
      userConnected: null,
      posts: [],
      isAdmin: null,
    };
  },
  created: function () {
    this.getPosts();
    this.userConnected = JSON.parse(sessionStorage.getItem("userInfo"));
    this.isAdmin = JSON.parse(sessionStorage.getItem("isAdmin"));
  },
  methods: {
    //Affichage de posts sur la page home
    async getPosts() {
      const response = await axios.get("http://localhost:3000/api/posts/", {
        headers: {
          Authorization:
            "Bearer " + JSON.parse(sessionStorage.getItem("userInfo")).token,
        },
      });
      this.posts = response.data;
    },
    //Supprimer les posts
    async deletePost(post) {
      await axios.delete("http://localhost:3000/api/posts/" + post.id, {
        headers: {
          Authorization:
            "Bearer " + JSON.parse(sessionStorage.getItem("userInfo")).token,
        },
      });

      this.deleteMessage("ton post a été supprimé", "warning", "notif-post");
      this.getPosts();
    },
    //Message
    deleteMessage(message, type, place) {
      const alertPlaceholder = document.getElementById(place);
      const wrapper = document.createElement("div");

      wrapper.innerHTML = [
        `<div class="alert alert-${type} alert-dismissible" role="alert">`,
        `   <div>${message}</div>`,
        '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
        "</div>",
      ].join("");

      alertPlaceholder.append(wrapper);
    },
    dateCreation(postDate) {
      return new Date(postDate).toLocaleDateString("fr");
    },
  },
};
</script>

<style>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
.date {
  margin-left: 10px;
}
.roundPicture {
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 50%;
}
.bottomIcons .fas {
  margin-right: 8px;
}
.bottomIcons span {
  margin-right: 10px;
}
.empty-home {
  font-size: 25px;
}
.rabbit-img {
  width: 80%;
}
</style>
