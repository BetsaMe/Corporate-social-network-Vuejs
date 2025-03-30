<template>
  <div v-if="userConnected">
    <Navbar />
    <div class="row container-fluid mx-auto px-0">
      <div class="col-lg-8">
        <form @submit.prevent="createPost" enctype="multipart/form-data">
          <div class="headerFeed shadow-sm p-3 mt-3">
            <h3 class="m-0 pb-3">Créer une publication</h3>
            <div class="mb-3">
              <label for="formTitle" class="form-label text-left">Titre</label>
              <input
                v-model="title"
                type="text"
                class="form-control"
                id="formTitle"
                placeholder=""
              />
            </div>

            <div class="mb-3">
              <label for="formTextarea" class="form-label">Description</label>
              <textarea
                v-model="content"
                class="form-control"
                id="formContent"
                rows="3"
                maxlength="250"
                placeholder="Ecrire ton commentaire"
              ></textarea>
            </div>
            <div class="mb-3">
              <label for="image" class="form-label">Ajouter une image</label>
              <input
                class="form-control"
                type="file"
                id="image"
                name="image"
                ref="image"
              />
            </div>
            <div class="">
              <button type="submit" class="btn ml-4 px-4 btn-orange">
                Enregistrer
              </button>
            </div>
          </div>
        </form>
      </div>
      <div class="col-lg-4 color mt-3">
        <div class="populaires shadow-sm p-2">
          <h4 class="text-center">Les plus populaires de la semaine</h4>
          <Popular
            src="/images/meme.jpg"
            alt="meme"
            text="Funny"
            btnname="suivre"
          />
          <Popular
            src="/images/cat.png"
            alt="cats"
            text="Animaux"
            btnname="suivre"
          />
          <Popular
            src="/images/wtf.jpg"
            alt="wtf"
            text="Blagues"
            btnname="suivre"
          />
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    {{ this.$router.push("/") }}
  </div>
</template>

<script>
import axios from "axios";
import Popular from "@/components/Popular.vue";
import Navbar from "@/components/Navbar.vue";

export default {
  name: "CreatePost",
  components: {
    Popular,
    Navbar,
  },
  data() {
    return {
      userConnected: null,
      errors: [],
      title: "",
      content: "",
      // userId: null,
      // authorName:null,
      image: "",
    };
  },
  created: function () {
    this.userConnected = JSON.parse(sessionStorage.getItem("userInfo"));
  },
  methods: {
    // création de la fonction de création de posts
    async createPost() {
      this.image = this.$refs.image.files[0];
      const formData = new FormData();

      formData.append("title", this.title);
      formData.append("content", this.content);
      formData.append("userId", this.userConnected.id);
      formData.append("authorName", this.userConnected.user.firstName);
      formData.append("image", this.image);

      await axios.post("http://localhost:3000/api/posts/", formData, {
        headers: {
          Authorization:
            "Bearer " + JSON.parse(sessionStorage.getItem("userInfo")).token,
        },
      });
      window.location.href = "http://localhost:8080/";
    },
  },
};
</script>

<style></style>
