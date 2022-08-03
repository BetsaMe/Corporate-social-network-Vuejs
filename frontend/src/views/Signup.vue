<template>
  <div class="signup">
    <form class="form-signin text-center" @submit.prevent="checkForm">
      <img class="mb-4" src="/images/icon-rec.png" alt="" width="72" />
      <h1 class="h3 mb-3 fw-normal">Sign up</h1>
      <div class="form-floating mb-2">
        <input
          type="text"
          class="form-control"
          v-model="pseudo"
          id="pseudo"
          placeholder="pseudo"
        />
        <label for="pseudo">Pseudo</label>
      </div>
      <div class="form-floating mb-2">
        <input
          type="text"
          class="form-control"
          v-model="firstName"
          id="firstName"
          placeholder="prénom"
        />
        <label for="firstName">Prénom</label>
      </div>
      <div class="form-floating mb-2">
        <input
          type="text"
          class="form-control"
          v-model="lastName"
          id="lastName"
          placeholder="nom"
        />
        <label for="lastName">Nom</label>
      </div>
      <div class="form-floating mb-2">
        <input
          type="email"
          class="form-control"
          v-model="email"
          id="email"
          placeholder="email@example.com"
        />
        <label for="email">Adresse email</label>
      </div>
      <div class="form-floating mb-2">
        <input
          type="password"
          class="form-control"
          v-model="password"
          id="password"
          placeholder="mot de passe"
        />
        <label for="password">Mot de passe</label>
      </div>
      <div class="checkbox mb-3" id="prueba">
        <label>
          <input type="checkbox" value="remember-me" /> Mémoriser vos
          informations
        </label>
      </div>
      <button class="w-100 btn btn-lg btn-orange" type="submit">Sign up</button>
      <div v-if="errors.length" class="text-error">
        <b>Veuillez corriger les erreurs suivantes:</b>
        <ul>
          <li v-for="error in errors" :key="error.name">{{ error }}</li>
        </ul>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Signup",
  data() {
    return {
      pseudo: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      errors: [],
      validFormat: /^[a-zA-Z]{2,10}$/,
      validFormatEmail: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/,
      validFormatPass:
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/,
    };
  },
  methods: {
    // Création du compte utilisateur
    handleSubmit() {
      axios
        .post("http://localhost:3000/api/auth/signup", {
          pseudo:
            this.pseudo.charAt(0).toUpperCase() +
            this.pseudo.slice(1).toLowerCase(),
          firstName:
            this.firstName.charAt(0).toUpperCase() +
            this.firstName.slice(1).toLowerCase(),
          lastName:
            this.lastName.charAt(0).toUpperCase() +
            this.lastName.slice(1).toLowerCase(),
          email: this.email,
          password: this.password,
        })
        .then((response) => {
          console.log(response);
          this.$router.push("/login");
        })
        .catch((err) => {
          if (err.message === "Request failed with status code 400") {
            this.errors.push("Une erreur s'est produite" + err);
          }
        });
    },
    // Vérification des input utilisateur
    checkForm() {
      this.errors = [];

      if (
        !this.pseudo ||
        !this.firstName ||
        !this.lastName ||
        !this.email ||
        !this.password
      ) {
        this.errors.push("Merci de remplir tous les champs");
      } else if (
        !this.validFormat.test(this.firstName) ||
        !this.validFormat.test(this.lasttName) ||
        !this.validFormat.test(this.pseudo)
      ) {
        this.errors.push("Les champs doivent contenir entre 2 et 10 lettres");
      } else if (!this.validFormatEmail.test(this.email)) {
        this.errors.push(
          "L'adresse e-mail doit être indiquée dans un format approprié"
        );
      } else if (!this.validFormatPass.test(this.password)) {
        this.errors.push(
          "Le mot de passe doit contenir au minimum 8 caractères, à savoir : au moins une lettre minuscule et une lettre majuscule, un caractère spécial et un chiffre"
        );
      } else if (!this.errors.length) {
        this.handleSubmit();
      }
    },
  },
};
</script>

<style>
.signup {
  margin-top: 80px;
}
.text-error {
  color: rgb(207, 16, 16);
  font-size: 15px;
  margin-top: 20px;
}
</style>
