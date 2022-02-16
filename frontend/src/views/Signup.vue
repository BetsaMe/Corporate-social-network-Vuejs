<template>
  <div class="signup">  
      <form class="form-signin text-center" @submit.prevent="checkForm">
          <img class="mb-4" src="/images/icon-rec.png" alt="" width="72" >
          <h1 class="h3 mb-3 fw-normal">Signup</h1>
          <!-- <div class="form-floating">
            <input type="name" class="form-control" v-model="pseudo" id="pseudo" placeholder="pseudo">
            <label for="pseudo">Pseudo</label>
          </div>             -->
          <div class="form-floating">
            <input type="text" class="form-control" v-model="firstName" id="firstName" placeholder="prénom">
            <label for="firstName">Prénom</label>
          </div>
          <div class="form-floating">
            <input type="text" class="form-control" v-model="lastName" id="lastName" placeholder="nom">
            <label for="lastName">Nom</label>
          </div>
          <div class="form-floating">
            <input type="email" class="form-control" v-model="email" id="email" placeholder="email@example.com">
            <label for="email">Adresse email</label>
          </div>
          <div class="form-floating">
            <input type="password" class="form-control" v-model="password" id="password" placeholder="mot de passe">
            <label for="password">Mot de passe</label>
          </div>
          <div class="checkbox mb-3" id="prueba">
            <label>
              <input type="checkbox" value="remember-me"> Mémoriser vos informations
            </label>
          </div>
          <button class="w-100 btn btn-lg btnsign" type="submit">Sign up</button>         
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
  name: 'Signup',
  data(){
      return{
          pseudo:'',
          firstName: '',
          lastName: '',
          email: '',
          password:'',
          errors:[],
          validFormat: /^[a-zA-Z]{2,10}$/,
          validFormatEmail: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/,
          //mot de passe de 8 à 15 caractères contenant au moins une lettre minuscule,
          //une lettre majuscule, un chiffre et un caractère spécial.
          validFormatPass: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/
      }
  },
  methods:{    
     // création de la fonction pour la création du compte utilisateur
      async handleSubmit(){
        await axios.post('http://localhost:3000/api/auth/signup', {
              pseudo: this.pseudo,
              firstName: this.firstName,
              lastName: this.lastName,
              email: this.email,
              password: this.password  
        });
        this.$router.push('/login');
                
      }, 
      // vérification des input utilisateur
      checkForm(){
        this.errors = [];
        if(!this.firstName || !this.lastName || !this.email || !this.password ){
            this.errors.push('Merci de remplir tous les champs');
            return false
        }
        if(!this.validText(this.firstName)){
           this.errors.push('Votre prénom doit contenir entre 2 et 10 lettres');
        }
        if(!this.validText(this.lastName)){
          this.errors.push('Votre nom doit contenir entre 2 et 10 lettres');
        }
        if(!this.validEmail(this.email)){
          this.errors.push("L'adresse e-mail doit être indiquée dans un format approprié");
        }
        if(!this.validPassword(this.password)){
          this.errors.push("mot de passe trop faible!");
        }
        if (!this.errors.length) {
          this.handleSubmit();
        }
      },
      // création de la fonction pour gerer les formats de validation
      validEmail: function (email) {
        return this.validFormatEmail.test(email);
      },
      validText: function (text) {
        return this.validFormat.test(text);
      },
      validPassword: function (password) {
        return this.validFormatPass.test(password);
      }        
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
      .signup{
        margin-top:80px ;
      }
      .text-error{
        color: rgb(207, 16, 16);
        font-size: 15px;
        margin-top: 20px;
      }

</style>