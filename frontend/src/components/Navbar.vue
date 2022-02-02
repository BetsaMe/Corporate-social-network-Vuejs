<template>
    <div id="nav">   
        <nav class="navbar navbar-light bg-light">
          <div class="container-fluid">
            <router-link class="navbar-brand" to="/">
              <img :src="logoEntreprise.source" :alt="logoEntreprise.alt" height="30">
            </router-link>          
           
            <div class="d-flex align-items-center">
                <form class="d-flex">
                    <input class="form-control me-2 rounded-pill" type="search" placeholder="Recherche" aria-label="Recherche">
                </form>
                <a class="nav-link" href="#"><i class="fas fa-bell logout"></i></a>
                <a class="nav-link logout" aria-current="page" href="" @click="handleLogout" >Logout</a>
                <div  class="dropdown">
                    <a href="#" class="d-block link-dark text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                      <img src="/images/iconuser.png" alt="imageprofil" width="32" height="32" class="rounded-circle">
                    </a>
                    <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownUser1">
                      <li><router-link class="dropdown-item" :to="{ name: 'profile', params: { userId: userInfo.id }}">Profil</router-link></li>
                      <li><a class="dropdown-item" href="#">Configuration</a></li>
                      <li><a class="dropdown-item" href="#">mode nuit</a></li>
                      <li><hr class="dropdown-divider"></li>
                      <li><a class="dropdown-item logout" href="" @click="handleLogout">Logout</a></li>
                  </ul>
              </div>           
            </div> 
          </div>
        </nav>
    </div> 
</template>

<script>

export default {
  name: 'Navbar',
  data(){
    return{
      userInfo: null,  
       logoEntreprise:{
          source: "/images/icon-left-font-monochrome-black copy.svg",
          alt: "logo groupomania"
      }
    }
  },
  created: function(){
    this.userInfo= JSON.parse(sessionStorage.getItem("userInfo"))
  },
    methods:{
    handleLogout(){
      sessionStorage.removeItem("userInfo");
      sessionStorage.removeItem("isAdmin");

      this.$router.push('/');
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
i .fa, .bottomIcons i{
  color: #8a8a8a;
}
.fa-user-circle{
  font-size: 35px;
}
.fa-bell{
  font-size: 18px;
}
.inputsearch{
  width: 80%;
}
.rounded-circle{
  object-fit: cover;
}
.logout{
  color: #091f43;
}
.logout:hover{
  color: #d14650;
}
</style>
