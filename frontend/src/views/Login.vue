<template>
  <div class="login">
    <form class="form-signin text-center" @submit.prevent="handleSubmit">
      <img class="mb-4" src="/images/icon-rec.png" alt="" width="72" />
      <h1 class="h3 mb-3 fw-normal">Login</h1>

      <div class="form-floating mb-2">
        <input
          type="email"
          class="form-control"
          v-model="email"
          id="email"
          placeholder="email@example.com"
        />
        <label for="floatingInput">Adresse email</label>
      </div>
      <div class="form-floating mb-2">
        <input
          type="password"
          class="form-control"
          v-model="password"
          id="password"
          placeholder="mot de passe"
        />
        <label for="floatingPassword">Mot de passe</label>
      </div>

      <div class="checkbox mb-3">
        <label>
          <input type="checkbox" value="remember-me" /> Mémoriser vos
          informations
        </label>
      </div>
      <button class="w-100 btn btn-lg btn-orange" type="submit">Login</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    // Se connecter à l'application
    handleSubmit() {
      axios
        .post("http://localhost:3000/api/auth/login", {
          email: this.email,
          password: this.password,
        })
        .then((response) => {
          let userInfo = JSON.stringify(response.data);
          let isAdmin = response.data.user.isAdmin;
          sessionStorage.setItem("userInfo", userInfo);
          sessionStorage.setItem("isAdmin", isAdmin);
          this.$router.push("/");
        })
        .catch((err) => {
          if (err) {
            console.log(err);
          }
        });
    },
  },
};
</script>

<style>
.login {
  margin-top: 150px;
}
.form-signin {
  width: 100%;
  max-width: 350px;
  margin: auto;
}
.bd-placeholder-img {
  font-size: 1.125rem;
  text-anchor: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
}

@media (min-width: 768px) {
  .bd-placeholder-img-lg {
    font-size: 3.5rem;
  }
}
</style>
