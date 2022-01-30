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
                <router-link class="btn btn-outline-primary" :to="{name: 'editprofile', params: {userId: this.userConnected.id}} ">Editer ton profil</router-link>  
            </div> 
            <div class="headerFeed d-flex flex-column shadow-sm mt-3 p-3 justify-content-center align-items-center text-center">          
                <h2>Information de compte</h2>
                <p>Date d'inscription : 31 août 2020</p>
                <button @click="deleteUser"  class="btn btn-outline-danger">Supprimer ton compte</button>          
            </div> 
        </div>
        <div class="col-lg-4 color mt-3">
            <div class="populaires shadow-sm p-2">
                <h4 class="text-center mt-3">Tes contacts préférés</h4> 
                <div class="d-flex justify-content-start align-items-center my-3 mx-4">
                    <img class="roundPicture mr-2" src="/images/meme.jpg" alt="meme" text="Funny" btnname="suivre">
                    <span class="mx-4">Justine Marie</span>
                </div> 
                <div class="d-flex justify-content-d-flex justify-content-start  align-items-center my-3 mx-4">
                    <img class="roundPicture" src="/images/meme.jpg" alt="meme" text="Funny" btnname="suivre">
                    <span class="mx-4">Alexandre Marie</span>
                </div> 
                <div class="d-flex justify-content-d-flex justify-content-start  align-items-center my-3 mx-4">
                    <img class="roundPicture" src="/images/meme.jpg" alt="meme" text="Funny" btnname="suivre">
                    <span class="mx-4">Romain Marie</span>
                </div> 
            </div> 
        </div>  
    </div> 
</template>

<script>
import axios from 'axios';
export default {
  name: 'CardProfile',
  data(){
      return{
          userConnected: null,  
        //   pseudo: '',
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
        async showUser(){
            // const infoUser = JSON.parse(sessionStorage.getItem("userInfo"))
            const idUser= this.userConnected.id
            const response = await axios.get('http://localhost:3000/api/auth/' + idUser);
            console.log(response);
            // this.pseudo= response.data.pseudo
            this.firstName= response.data.firstName
            this.lastName= response.data.lastName
            this.email= response.data.email
            this.userId=response.data.id
        },
        deleteUser(){
            alert('boton')
            axios.delete("http://localhost:3000/api/auth/" + this.userId)
            .then((res) => {
                console.log(res.data);
                this.$router.push("/");
                sessionStorage.removeItem('userInfo');
            });            
        }
    }
}

</script>



<style scoped>



</style>
