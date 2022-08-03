<template>
  <div v-if="userConnected">
    <Navbar />
    <CardProfile />
  </div>
  <div v-else>
    {{ this.$router.push("/") }}
  </div>
</template>

<script>
// @ is an alias to /src
import CardProfile from "@/components/CardProfile.vue";
import Navbar from "@/components/Navbar.vue";

export default {
  name: "Profile",
  components: {
    CardProfile,
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

<style></style>
