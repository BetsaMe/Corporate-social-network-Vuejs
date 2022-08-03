<template>
  <div id="profile" class="row container-fluid mx-auto px-0">
    <div class="col-lg-8">
      <div
        class="headerFeed d-flex flex-column shadow-sm mt-3 p-3 justify-content-center align-items-center text-center"
      >
        <img
          class="rounded-circle mt-5"
          src="/images/profile.jpg"
          width="150"
          height="150"
        />
        <h1 class="font-weight-bold">{{ pseudo }}</h1>
      </div>
      <div
        class="headerFeed d-flex flex-column shadow-sm mt-3 p-3 justify-content-center align-items-center text-center"
      >
        <h3>Mes informations</h3>
        <p>Prénom: {{ firstName }}</p>
        <p>Nom: {{ lastName }}</p>
        <p>Email:{{ email }}</p>
        <router-link
          class="btn btn-sm btn-orange"
          :to="{
            name: 'editprofile',
            params: { userId: this.userConnected.id },
          }"
          >Editer ton profil</router-link
        >
      </div>
      <div
        class="headerFeed d-flex flex-column shadow-sm mt-3 p-3 justify-content-center align-items-center text-center"
      >
        <h3>Information de compte</h3>
        <p>
          Date d'inscription: {{ new Date(created).toLocaleDateString("fr") }}
        </p>
        <button @click="deleteUser" class="btn btn-sm btn-orange-outline">
          Supprimer ton compte
        </button>
      </div>
    </div>
    <div class="col-lg-4 color mt-3">
      <div class="populaires shadow-sm p-2">
        <h4 class="text-center">Tes contacts préférés</h4>
        <Popular
          src="/images/prof2.jpg"
          alt="Justine"
          text="Justine"
          btnname="suivre"
        />
        <Popular
          src="/images/prof1.jpeg"
          alt="Alexandre"
          text="Alexandre"
          btnname="suivre"
        />
        <Popular
          src="/images/prof3.jpg"
          alt="Romain"
          text="Romain"
          btnname="suivre"
        />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Popular from "@/components/Popular.vue";
export default {
  name: "CardProfile",
  components: {
    Popular,
  },
  data() {
    return {
      userConnected: null,
      pseudo: "",
      firstName: "",
      lastName: "",
      email: "",
      created: "",
      userId: "",
    };
  },
  created: function () {
    (this.userConnected = JSON.parse(sessionStorage.getItem("userInfo"))),
      this.showUser();
  },
  methods: {
    //Affichage de profil utilisateur
    async showUser() {
      const idUser = this.userConnected.id;
      const response = await axios.get(
        "http://localhost:3000/api/auth/" + idUser
      );
      this.pseudo = response.data.pseudo;
      this.firstName = response.data.firstName;
      this.lastName = response.data.lastName;
      this.email = response.data.email;
      this.created = response.data.createdAt;
      this.userId = response.data.id;
      let isAdmin = JSON.stringify(response.data.isAdmin);
      sessionStorage.setItem("isAdmin", isAdmin);
    },
    //Supprimer le profil utilisateur
    async deleteUser() {
      await axios.delete("http://localhost:3000/api/auth/" + this.userId);
      this.$router.push("/");
      sessionStorage.removeItem("userInfo");
    },
  },
};
</script>

<style>
h3 {
  margin: 10px 0;
}
</style>
