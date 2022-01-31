<template>
    <div class="row container-fluid mx-auto px-0">
        <div id="profile" class="col-lg-8">
            <div class="headerFeed d-flex flex-column shadow-sm mt-3 p-3 justify-content-center align-items-center text-center">          
                <img class="rounded-circle mt-5" src="/images/profile.jpg" width="150" height="150">
                <h1 class="font-weight-bold">{{ firstName }}</h1>            
            </div>  
            <div class="headerFeed d-flex flex-column shadow-sm mt-3 p-3 justify-content-center align-items-center text-center">          
                <h2>À propos de moi</h2>
                <p>Prénom: {{ firstName }}</p>
                <p>Nom: {{ lastName }}</p>  
                <p>Email:{{ email }}</p> 
                <router-link class="btn rounded-pill btnPublication" :to="{name: 'editprofile', params: {userId: this.userConnected.id}} ">Editer ton profil</router-link>  
            </div> 
            <div class="headerFeed d-flex flex-column shadow-sm mt-3 p-3 justify-content-center align-items-center text-center">          
                <h2>Information de compte</h2>
                <p>Date d'inscription : 31 août 2020</p>
                <button @click="deleteUser"  class="btn rounded-pill btn-outline-danger">Supprimer ton compte</button>          
            </div> 
        </div>
        <div class="col-lg-4 color mt-3">
                <div class="populaires shadow-sm p-2">
                <h4 class="text-center">Tes contacts préférés</h4>                     
                <Popular src="/images/prof2.jpg" alt="Justine" text="Justine" btnname="suivre"/>                    
                <Popular src="/images/prof1.jpeg" alt="Alexandre" text="Alexandre" btnname="suivre"/>                    
                <Popular src="/images/prof3.jpg" alt="Romain" text="Romain" btnname="suivre"/>
            </div> 
        </div>  
    </div> 
</template>

<script>
import axios from 'axios';
import Popular from '@/components/Popular.vue'
export default {
  name: 'CardProfile',
  components: {
    Popular   
  },
  data(){
      return{
          userConnected: null,
          firstName:'',
          lastName:'',
          email:'',
          userId:''
      }
  },
  created: function(){
    this.userConnected= JSON.parse(sessionStorage.getItem("userInfo")),  
    this.showUser()
  },
  methods:{
        //création de la fonction pour l'affichage de profil utilisateur
        async showUser(){
            const idUser= this.userConnected.id
            const response = await axios.get('http://localhost:3000/api/auth/' + idUser);
            
            this.firstName= response.data.firstName
            this.lastName= response.data.lastName
            this.email= response.data.email
            this.userId=response.data.id
            let isAdmin = JSON.stringify(response.data.isAdmin);
            sessionStorage.setItem("isAdmin", isAdmin);            
        },
        //création de la fonction pour supprimer le profil utilisateur
        async deleteUser(){
            await axios.delete("http://localhost:3000/api/auth/" + this.userId)            
                this.$router.push("/");
                sessionStorage.removeItem('userInfo');                       
        }
    }
}

</script>



<style>



</style>
