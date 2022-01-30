<template>
        <div id="comment">
            <Navbar/>
            <div class="row container-fluid mx-auto px-0">
                <div class="cardStyle shadow-sm mt-3 p-4">               
        
                        <p class="text-start mt-2">Titre: {{ title }}</p>
                        <p class="text-start mt-2">Contenu: {{ content }} </p>
                </div>
                <div class="cardStyle shadow-sm mt-3 p-4">   
                    <form @submit.prevent ="sendComment">
                        <div class="mb-3">
                            <label for="exampleFormControlTextarea1" class="form-label">Commentaire</label>                           
                            <textarea v-model="newComment.content" class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                        </div>
                        <button type="submit" class="btn btn-outline-secondary"><i class="fas fa-comments"></i>Commenter</button>
                    </form>
                </div>
            </div>
        </div>
</template>



<script>
import axios from 'axios'
import Navbar from '@/components/Navbar.vue'
export default {
  name: 'NewComment',
  components: {
    Navbar
  },
  data(){
    return{
        userConnected: null,
        postId:'',
        title:'',
        content:'',
        newComment:{
            content:'',
            userId:'',
            postId:''
        }
    }
  },
  created: function(){
     this.userConnected= JSON.parse(sessionStorage.getItem("userInfo"))
     this.postId = this.$route.params.postId;
     console.log(this.postId)
     this.getOnePost()
  },
  methods:{
        async getOnePost(){
            const response = await axios.get('api/posts/'+ this.postId, {
                headers:{
                    Authorization: 'Bearer ' + JSON.parse(sessionStorage.getItem("userInfo")).token
                }
            });
            console.log(response.data);
            this.title= response.data.title,
            this.content= response.data.content
        },
        async sendComment(){
            this.newComment.userId = this.userConnected.id
            this.newComment.postId = this.postId
            const response= await axios.post('/api/comments/', this.newComment,{
                headers:{
                    Authorization: 'Bearer ' + JSON.parse(sessionStorage.getItem("userInfo")).token
                }
            });
            console.log(response.data)            
        }
    }
}
</script>


<style>


</style>
