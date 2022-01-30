<template>
  <div>  
      <form class="form-signin text-center" @submit.prevent="checkForm">
          <img class="mb-4" src="/images/icon-rec.png" alt="" width="72" >
          <h1 class="h3 mb-3 fw-normal">Signup</h1>
          <div class="form-floating">
            <input type="name" class="form-control" v-model="pseudo" id="pseudo" placeholder="pseudo">
            <label for="floatingInput">Pseudo</label>
          </div>            
          <div class="form-floating">
            <input type="name" class="form-control" v-model="firstName" id="firstName" placeholder="prénom">
            <label for="floatingInput">Prénom</label>
          </div>
          <div class="form-floating">
            <input type="name" class="form-control" v-model="lastName" id="lastName" placeholder="nom">
            <label for="floatingInput">Nom</label>
          </div>
          <div class="form-floating">
            <input type="email" class="form-control" v-model="email" id="email" placeholder="email@example.com">
            <label for="floatingInput">Adresse email</label>
          </div>
          <div class="form-floating">
            <input type="password" class="form-control" v-model="password" id="password" placeholder="mot de passe">
            <label for="floatingPassword">Mot de passe</label>
          </div>
          <div class="checkbox mb-3" id="prueba">
            <label>
              <input type="checkbox" value="remember-me"> Remember me
            </label>
          </div>
          <button class="w-100 btn btn-lg btn-primary" type="submit">Sign up</button>         
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
          //password between 8 to 15 characters which contain at least one lowercase letter,
          //one uppercase letter, one numeric digit, and one special character
          validFormatPass: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/
      }
  },
  methods:{      
      async handleSubmit(){
        const response= await axios.post('http://localhost:3000/api/auth/signup', {
              pseudo: this.pseudo,
              firstName: this.firstName,
              lastName: this.lastName,
              email: this.email,
              password: this.password  
        });
        this.$router.push('/login');
        console.log(response)
                
      }, 
      checkForm(){
        this.errors = [];
        if(!this.firstName || !this.lastName || !this.email || !this.password ){
            this.errors.push('Merci de remplir tous les champs');
            return false
        }
        if(!this.validText(this.pseudo)){
           this.errors.push('Votre pseudo doit contenir entre 2 et 10 lettres');
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
      .form-signin{
        width:100%;
        max-width: 350px;
        margin: auto;
      }
        .bd-placeholder-img {
        font-size: 1.125rem;
        text-anchor: middle;
        -webkit-user-select: none;
        -moz-user-select: none;
        user-select: none;
      }
      .text-error{
        color: rgb(207, 16, 16);
        font-size: 15px;
        margin-top: 20px;
      }

      @media (min-width: 768px) {
        .bd-placeholder-img-lg {
          font-size: 3.5rem;
        }
      }
</style>