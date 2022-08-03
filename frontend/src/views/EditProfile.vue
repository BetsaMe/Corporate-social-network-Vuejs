<template>
  <div>
    <div v-if="userConnected">
      <Navbar />
      <CardEditProfile />
    </div>
    <div v-else>
      {{ this.$router.push("/") }}
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import CardEditProfile from "@/components/CardEditProfile.vue";
import Navbar from "@/components/Navbar.vue";

export default {
  name: "Profile",
  components: {
    CardEditProfile,
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
