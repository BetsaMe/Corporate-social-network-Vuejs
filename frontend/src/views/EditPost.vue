<template>
    <div v-if="userConnected"> 
        <Navbar/> 
        <div  class="row container-fluid mx-auto px-0">
            <div class="col-lg-8">
                <form @submit.prevent="modifyPost" enctype="multipart/form-data">
                    <div class="headerFeed shadow-sm p-3 mt-3">
                        <h3 class="m-0 pb-3">Modifier ta publication</h3>
                        <div class="mb-3 ">
                            <label for="formTitle" class="form-label text-left ">Titre</label>
                            <input v-model="title" type="title" class="form-control" id="formTitle" placeholder="">
                        </div>
                        <div class="mb-3">
                            <label for="image" class="form-label">Remplacer l'image</label>
                            <input class="form-control" type="file" id="image" name="image" ref="image">
                         </div>
                        <div class="mb-3">
                            <label for="formTextarea" class="form-label">Description</label>
                            <textarea v-model="content" class="form-control" id="formContent" rows="3" placeholder=""></textarea>
                        </div>
                        <div class="">
                            <button type="submit" class="btn btnPublication rounded-pill">Enregistrer</button>
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
        title: "",
        content: "",
        image:""                 
      }
  },
  created: function(){
     this.userConnected= JSON.parse(sessionStorage.getItem("userInfo"))
     this.postId = this.$route.params.postId;
  },
  methods:{
      // création de la fonction pour mofifier les posts
      async modifyPost(){
        this.image = this.$refs.image.files[0];  
        const formData = new FormData()
        
        formData.append('title', this.title)
        formData.append('content', this.content)
        formData.append('image', this.image)  

        await axios.put('http://localhost:3000/api/posts/'+ this.postId , formData,{
            headers:{
                Authorization: 'Bearer ' + JSON.parse(sessionStorage.getItem("userInfo")).token
            }
        });
        alert("Post modifié");
        window.location.href = "http://localhost:8080/";              
    } 
  }  
}
</script>

<style>


</style>