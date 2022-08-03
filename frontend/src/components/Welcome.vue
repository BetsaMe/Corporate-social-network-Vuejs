<template>
  <div class="container-fluid welcome">
    <div class="row justify-content-center">
      <div class="col-xl-10 col-lg-12 col-md-9">
        <div class="card o-hidden border-0 shadow-lg my-5">
          <div class="card-body p-0">
            <div class="row">
              <div class="col-lg-6 d-lg-block">
                <img class="welcomeImage" src="/images/welcome.jpg" alt="dog" />
              </div>
              <div class="col-lg-6">
                <div class="p-5">
                    <div class="text-center">
                        <h1 class="h4 text-gray-900 mb-4">
                        Bienvenue au reseau <span>Groupomania</span>
                        </h1>
                    </div>
                  <form class="user text-center">
                    <router-link
                      class="btn px-4 mx-2 my-4 btn-orange-outline btn-welcome"
                      to="/login"
                      >Login</router-link
                    >
                    <router-link
                      class="btn px-4 mx-2 my-4 btn-orange btn-welcome"
                      to="/signup"
                      >Signup</router-link
                    >
                    <hr />
                    <a href="#" class="btn btn-google btn-user mb-2">
                      <i class="fab fa-google fa-fw"></i> Connectez-vous avec
                      Google
                    </a>
                    <a href="#" class="btn btn-facebook btn-user">
                      <i class="fab fa-facebook-f fa-fw"></i>Connectez-vous avec
                      Facebook
                    </a>
                  </form>
                  <hr />
                  <div class="text-center">
                    <a class="small logout" href="#">Mot de passe oublié?</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Welcome",
};
</script>

<style>
h1 span {
  font-weight: 700;
}
/* Buttons */
.btn-orange-outline {
  border: 1px solid #d14650;
  color: #d14650;
}
.btn-orange-outline:hover {
  background-color: #d14650;
  color: #fff;
}
.btn-orange {
  background-color: #d14650;
  color: #ffffff;
}
.btn-orange:hover {
  background-color: #091f43;
  color: #fff;
}
.btn-blue-outline {
  border: 1px solid #091f43;
  background-color: #f3f3f9;
}
.btn-blue-outline:hover {
  background-color: #091f43;
  color: #fff;
}

.btnPublication {
  width: 30%;
  min-width: 190px;
  height: 40px;
}
.btn-welcome {
  width: 80%;
  margin: 0;
}
.welcome {
  margin-top: 50px;
}
.welcomeImage {
  object-fit: cover;
  width: 100%;
  height: 100%;
}
hr {
  color: #091f43;
}
</style>
