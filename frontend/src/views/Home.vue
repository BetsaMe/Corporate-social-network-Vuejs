<template>
  <div id="index">
    <div v-if="userConnected">
      <Navbar />
      <div class="row container-fluid mx-auto px-0">
        <div class="col-lg-8">
          <div
            class="headerFeed d-flex shadow-sm mt-3 p-3 justify-content-between feed"
          >
            <div class="d-flex align-items-center">
              <button type="button" class="btn rounded-pill mx-1 btn-sm btn-blue-outline">
                Populaires
              </button>
              <button type="button" class="btn rounded-pill mx-1 btn-sm btn-blue-outline">
                News
              </button>
              <button type="button" class="btn rounded-pill mx-1 btn-sm btn-blue-outline">
                Tes Posts
              </button>
            </div>
            <router-link
              class="btn btn ml-4 px-4 btnPublication btn-orange"
              to="/createPost"
              >
              Publier
            </router-link>
          </div>

          <div class="feed">
            <Posts />
          </div>
        </div>
        <div class="col-lg-4 color mt-3">
          <div class="populaires shadow-sm p-2">
            <h4 class="text-center mb-4 mt-2">Sujets populaires</h4>
            <Popular
              src="/images/meme.jpg"
              alt="meme"
              text="Funny"
              btnname="Suivre"
            />
            <Popular
              src="/images/cats.jpg"
              alt="cats"
              text="Animaux"
              btnname="Suivre"
            />
            <Popular
              src="/images/wtf.jpg"
              alt="wtf"
              text="Blagues"
              btnname="Suivre"
            />
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <Welcome />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Posts from "@/components/Posts.vue";
import Popular from "@/components/Popular.vue";
import Welcome from "@/components/Welcome.vue";
import Navbar from "@/components/Navbar.vue";

export default {
  name: "Home",
  components: {
    Posts,
    Popular,
    Welcome,
    Navbar,
  },
  data() {
    return {
      userConnected: null,
    };
  },
  created: function () {
    this.userConnected = JSON.parse(sessionStorage.getItem("userInfo"));
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700&display=swap");
* {
  box-sizing: border-box;
}
body {
  width: 100%;
  background-color: #f3f3f9;
  font-family: "Manrope", sans-serif;
  color: rgb(33, 34, 33);
  font-size: 15px;
}
nav {
  background-color: #fff;
  box-shadow: 0px 5px 21px -5px #cdd1e1;
  margin-bottom: 30px;
}
.container-fluid {
  width: 70%;
}
.headerFeed,
.cardStyle,
.populaires {
  background-color: #fff;
  border-radius: 5px;
}
.cardStyle .photoPost {
  width: 100%;
  height: 50vh;
  object-fit: cover;
}

@media only screen and (max-width: 1024px) {
  .container-fluid {
    width: 100%;
  }
}
@media only screen and (max-width: 992px) {
  .form-control {
    width: 100%;
  }
}
@media only screen and (max-width: 480px) {
  .feed {
    flex-direction: column;
  }
  .btnPublication {
    margin-top: 10px;
    width: 100%;
  }
}
</style>
