<template>
  <div id="editProfil" class="container-fluid">
        <form class="row g-3 headerFeed shadow-sm p-3" @submit.prevent="checkForm">
            <div class=" d-flex flex-column  mt-3 justify-content-center align-items-center text-center">          
                <img class="rounded-circle mt-5" src="/images/profile.jpg" width="150" height="150">
                <h1 class="font-weight-bold">Information de compte</h1>            
            </div>
            <!-- <div class="col-md-6">
                <label for="validationDefaultUsername" class="form-label">Pseudo</label>
                <div class="input-group">
                <span class="input-group-text" id="inputGroupPrepend2">@</span>
                <input type="text" class="form-control" v-model="pseudo" id="validationDefaultUsername"  aria-describedby="inputGroupPrepend2" >
                </div>
            </div> -->
            <div class="col-md-6">
                <label for="validationDefault01" class="form-label">First name</label>
                <input type="text" class="form-control" v-model="firstName" id="validationDefault01" value="Mark" >
            </div>
            <div class="col-md-6">
                <label for="validationDefault02" class="form-label">Last name</label>
                <input type="text" class="form-control" v-model="lastName" id="validationDefault02" value="Otto" >
            </div>
            <div class="col-12">
                <button class="btn btn-primary my-3" type="submit">Enregistrer</button>
            </div>
            <div v-if="errors.length" class="text-error">
              <b >Veuillez corriger les erreurs suivantes:</b>
              <ul>
                <li v-for="error in errors" :key="error.name">{{ error }}</li>
              </ul>
            </div>
        </form>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'CardEditProfile',
  data(){
      return{
        //   pseudo: '',
          firstName:'',
          lastName:'',
          errors:[],
          validFormat: /^[a-zA-Z]{2,10}$/,
          validFormatPass: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/
      }
  },
  methods:{  
      checkForm(){
        this.errors = [];   
        // if(!this.validText(this.pseudo)){
        //    this.errors.push('Votre pseudo doit contenir entre 2 et 10 lettres');
        // }
        if(!this.validText(this.firstName)){
           this.errors.push('Votre prénom doit contenir entre 2 et 10 lettres');
        }
        if(!this.validText(this.lastName)){
          this.errors.push('Votre nom doit contenir entre 2 et 10 lettres');
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
            await axios.put('/api/auth/' + infoUser.id,{
                // pseudo: this.pseudo,
                firstName: this.firstName,
                lastName: this.lastName
            });
            // this.$router.push('/profile/:userId');            
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
