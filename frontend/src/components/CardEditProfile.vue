<template>
  <div id="editProfil" class="row container-fluid mx-auto px-0">
        <div class="col-lg-8">
            <form class="row g-3 headerFeed shadow-sm p-3 mt-3" @submit.prevent="checkForm">
                <div class=" d-flex flex-column  mt-3 justify-content-center align-items-center text-center">          
                    <img class="rounded-circle mt-5" src="/images/profile.jpg" width="150" height="150">
                    <h2 class="font-weight-bold">Information de compte</h2>            
                </div>
                <div class="col-md-6">
                    <label for="validationDefault01" class="form-label">Prénom</label>
                    <input type="text" class="form-control" v-model="firstName" id="validationDefault01" value="Mark" >
                </div>
                <div class="col-md-6">
                    <label for="validationDefault02" class="form-label">Nom</label>
                    <input type="text" class="form-control" v-model="lastName" id="validationDefault02" value="Otto" >
                </div>
                <div class="col-12">
                    <button class="btn btnPublication rounded-pill my-3" type="submit">Enregistrer</button>
                </div>
                <div v-if="errors.length" class="text-error">
                <b >Veuillez corriger les erreurs suivantes:</b>
                <ul>
                    <li v-for="error in errors" :key="error.name">{{ error }}</li>
                </ul>
                </div>
            </form>
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
  name: 'CardEditProfile',
  components: {
    Popular   
  },
  data(){
      return{
          firstName:'',
          lastName:'',
          errors:[],
          validFormat: /^[a-zA-Z]{2,20}$/
      }
  },
  methods:{  
      checkForm(){
        this.errors = [];
        if(!this.validText(this.firstName)){
           this.errors.push('Votre prénom doit contenir entre 2 et 20 lettres');
        }
        if(!this.validText(this.lastName)){
          this.errors.push('Votre nom doit contenir entre 2 et 20 lettres');
        }
       if (!this.errors.length) {
          this.editUser();
        }
    },   
        validText: function (text) {
            return this.validFormat.test(text);
    },     
        async editUser(){           
            const infoUser = JSON.parse(sessionStorage.getItem("userInfo"))
            await axios.put('http://localhost:3000/api/auth/' + infoUser.id,{
                firstName: this.firstName,
                lastName: this.lastName
            });
            this.$router.push('/profile/'+ infoUser.id);            
        }
    }
}
</script>


<style>

</style>
