<template>
  <div>
    <button class="btn px-1" @click="likeOnePost()">
      <i class="fas fa-heart btn-icon-blue"></i>
      <span> {{ count }}</span>
    </button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "LikeButton",
  data() {
    return {
      postId: "",
      count: "",
      userConnected: null,
      oneLike: {
        islike: "",
        userId: "",
        postId: "",
      },
    };
  },
  props: ["idByPost"],
  created: function () {
    this.getLikesByPost();
    this.userConnected = JSON.parse(sessionStorage.getItem("userInfo"));
  },
  methods: {
    async getLikesByPost() {
      const id = this.idByPost;
      const response = await axios.get(
        "http://localhost:3000/api/likes/" + id,
        {
          headers: {
            Authorization:
              "Bearer " + JSON.parse(sessionStorage.getItem("userInfo")).token,
          },
        }
      );
      this.count = response.data;
    },
    //  Like or dislike a post
    async likeOnePost() {
      this.oneLike.islike = "1";
      this.oneLike.postId = this.idByPost;
      this.oneLike.userId = this.userConnected.id;

      await axios.post("http://localhost:3000/api/likes/", this.oneLike, {
        headers: {
          Authorization:
            "Bearer " + JSON.parse(sessionStorage.getItem("userInfo")).token,
        },
      });

      // this.isActive = ! this.isActive;
      this.getLikesByPost();
    },
  },
};
</script>

<style></style>
