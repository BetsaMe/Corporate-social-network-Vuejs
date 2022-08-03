<template>
  <div>
    <button class="btn btn-link btn-icon-blue px-0" @click="showComments()">
      Voir tous les commentaires
    </button>
    <div v-if="isVisible === true">
      <div
        class="comment d-flex justify-content-between align-items-center"
        v-for="comment in comments"
        v-bind:key="comment.title"
      >
        <div class="d-flex">
          <p class="mx-3">Par {{ comment.authorName }}:</p>
          <p>{{ comment.content }}</p>
        </div>

        <div class="d-flex">
          <div
            @click="deleteComment(comment)"
            v-if="userConnected.id == comment.userId || isAdmin == true"
          >
            <i class="far fa-trash-alt mx-2"></i>
          </div>
        </div>
      </div>
      <div id="message" class="my-2"></div>
    </div>
    <form @submit.prevent="sendComment">
      <textarea
        v-model="newComment.content"
        cols="2"
        rows="2"
        placeholder="Faites un commentaire ici..."
      ></textarea>
      <button type="submit" class="btn btn-sm btn-orange">Comment</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Comment",
  props: ["idDePost"],
  components: {},
  data() {
    return {
      isVisible: false,
      userConnected: null,
      postId: "",
      author: "",
      newComment: {
        content: "",
        userId: "",
        postId: "",
        authorName: "",
      },
      comments: [],
      isAdmin: null,
    };
  },
  created: function () {
    this.userConnected = JSON.parse(sessionStorage.getItem("userInfo"));
    this.isAdmin = JSON.parse(sessionStorage.getItem("isAdmin"));
    this.postId = this.idDePost;
  },
  methods: {
    // Commenter un post
    async sendComment() {
      this.newComment.userId = this.userConnected.id;
      this.newComment.postId = this.postId;
      this.newComment.authorName = this.userConnected.user.pseudo;
      await axios.post("http://localhost:3000/api/comments/", this.newComment, {
        headers: {
          Authorization:
            "Bearer " + JSON.parse(sessionStorage.getItem("userInfo")).token,
        },
      });
      this.isVisible = true;
      this.commentsByPost();
    },
    //Commentaires sur le post concerné
    async commentsByPost() {
      let id = this.postId;
      const response = await axios.get(
        "http://localhost:3000/api/comments/" + id + "/post",
        {
          headers: {
            Authorization:
              "Bearer " + JSON.parse(sessionStorage.getItem("userInfo")).token,
          },
        }
      );
      this.comments = response.data;
    },

    showComments() {
      if (this.isVisible === false) {
        this.isVisible = true;
        this.commentsByPost();
      } else {
        this.isVisible = false;
      }
    },

    //Supprimer un commentaire
    async deleteComment(comment) {
      await axios.delete("http://localhost:3000/api/comments/" + comment.id, {
        headers: {
          Authorization:
            "Bearer " + JSON.parse(sessionStorage.getItem("userInfo")).token,
        },
      });
      this.deleteMessage('"Commentaire effacé"!', "warning");
      this.commentsByPost();
    },
    // Notification
    deleteMessage(message, type) {
      const alertPlaceholder = document.getElementById("message");
      const wrapper = document.createElement("div");

      wrapper.innerHTML = [
        `<div class="alert alert-${type} alert-dismissible" role="alert">`,
        `   <div>${message}</div>`,
        '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
        "</div>",
      ].join("");

      alertPlaceholder.append(wrapper);
    },
  },
};
</script>

<style>
.fa-edit,
.fa-comments {
  margin-right: 10px;
}
.btnDelete {
  cursor: pointer;
}
#comments {
  margin-top: 30px;
}
.comment {
  background-color: #f3f3f9;
  padding: 10px;
  border-radius: 4px;
  margin-top: 10px;
}
.comment p {
  margin-right: 8px;
}
.fa-trash-alt {
  cursor: pointer;
}
.text-bold {
  font-weight: 700;
}
textarea {
  width: 100%;
  border-radius: 4px;
  margin-top: 10px;
  border-color: #acacac;
}

textarea:focus {
  border-color: #091f43;
}

.btn:focus {
  outline: none;
  box-shadow: none;
}
</style>
