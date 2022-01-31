<template>
  <div v-if="userConnected"> 
      <Navbar/> 
      <div  class="row container-fluid mx-auto px-0">
          <div class="col-lg-8">
            <form @submit.prevent="modifyPost">
                <div class="headerFeed shadow-sm p-3 mt-3">
                    <h3 class="m-0 pb-3">Modifier ta publication</h3>
                    <div class="mb-3 ">
                        <label for="formTitle" class="form-label text-left ">Titre</label>
                        <input v-model="editedPost.title" type="title" class="form-control" id="formTitle" placeholder="">
                    </div>
                    <!-- <div class="mb-3">
                        <label for="formFile" class="form-label">Ajouter à votre publication</label>
                        <input class="form-control" type="file" id="formFile">
                    </div> -->
                    <div class="mb-3">
                        <label for="formTextarea" class="form-label">Contenu</label>
                        <textarea v-model="editedPost.content" class="form-control" id="formContent" rows="3" placeholder=""></textarea>
                    </div>
                    <div class="">
                        <button type="submit" class="btn btn-primary">Enregistrer</button>
                    </div>
                </div> 
            </form>
          </div>  
          <div class="col-lg-4 color mt-3">
              <div class="populaires shadow-sm p-2">
                <h4 class="text-center">Les + populaires</h4>                     
                <Popular src="/images/meme.jpg" alt="meme" text="Funny" btnname="suivre"/>                    
                <Popular src="/images/cats.jpg" alt="cats" text="Animaux" btnname="suivre"/>                    
                <Popular src="/images/wtf.jpg" alt="wtf" text="Blagues" btnname="suivre"/>
            </div> 
        </div>
      </div>
  </div>
    <div v-else >
        {{ this.$router.push("/") }} 
    </div>  
</template>

<script>
import axios from 'axios';
import Popular from '@/components/Popular.vue'
import Navbar from '@/components/Navbar.vue'

export default {
  name: 'EditePost',
  components: {
    Popular,
    Navbar
  },
  data(){
      return{
        userConnected: null,
        postId:'',
        editedPost: {
            title: "",
            content: "",
            userId: null
        },
          errors:[],
          validFormat: /^[a-zA-Z]{2,10}$/,
          validFormatEmail: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/,
      }
  },
  created: function(){
     this.userConnected= JSON.parse(sessionStorage.getItem("userInfo"))
     this.postId = this.$route.params.postId;
  },
  methods:{
      async modifyPost(){
        const token = this.userConnected.token
        this.editedPost.userId= this.userConnected.id
        const response= await axios.put('http://localhost:3000/api/posts/'+ this.postId , this.editedPost,{
            headers:{
                Authorization: 'Bearer ' + token
            }
        });
        console.log(response.data) 
        alert("Post modifié");
        window.location.href = "http://localhost:8080/";              
    } 
  }  
}
</script>