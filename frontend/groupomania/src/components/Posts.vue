<template>
    <div>
        <div v-for="post in posts" v-bind:key="post.title">
            <div class="cardStyle shadow-sm mt-3 p-4">                
                    <div class="d-flex justify-content-between align-items-center">
                        <p>Post id: {{ post.id }} </p> 
                        <div class="d-flex">
                            <router-link v-if="userConnected.id == post.userId || isAdmin == true" :to="{name:'editPost', params:{postId:post.id}}"><i class="far fa-edit mr-4"></i></router-link>
                            <div @click="deletePost(post)" v-if="userConnected.id == post.userId || isAdmin == true"><i class="far fa-trash-alt"></i></div>
                        </div> 
                    </div>  
                    <p class="text-start mt-2">Titre: {{ post.title }}</p>
                    <p class="text-start mt-2">Contenu: {{ post.content }} </p>
                    <!-- <img class="photoPost" :src="image.source" :alt="image.alt"> -->
                    <div class="bottomIcons d-flex mt-4">
                        <a href=""><i class="fas fa-heart "></i></a><span>50</span>                            
                        <a href=""><i class="fas fa-share-alt"></i></a><span>50</span>
                        <a href=""><i class="fas fa-bookmark"></i></a> 
                    </div>
                    
                    <!-- <a href="" v-if="userConnected.id == post.userId" class="mx-3">Editer</a> -->
                    <!-- <a @click.prevent="deletePost(post)" v-if="userConnected.id == post.userId" class="mx-3 btnDelete">Supprimer</a> -->
                    <div id="comments">
                            <router-link class="btn btn-link btnComment" :to="{name:'newComment', params:{postId:post.id}}">Commenter</router-link>
                            <button class="btn btn-link" @click="(postId = post.id), commentsByPost()">
                             Voir tous les commentaires
                            </button>
                            <div  v-if="postId === post.id">
                                <div class="comment d-flex justify-content-between align-items-center" v-for="comment in comments" v-bind:key="comment.title">
                                    <p class="">{{ comment.content}}</p>
                                    <div class="d-flex">
                                        <div @click="deleteComment(comment)" v-if="userConnected.id == comment.userId || isAdmin== true"><i class="far fa-trash-alt"></i></div>
                                    </div>
                                </div>
                            </div>
                    </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Posts',
  data(){
      return{  
        postId:{}, 
        comments:[] ,
        userConnected: null,   
        posts:{},
        isAdmin:''
      }
  },
    created: function(){
     this.getPosts()
     this.userConnected=JSON.parse(sessionStorage.getItem("userInfo")) 
     this.isAdmin= sessionStorage.getItem('isAdmin')   
  },
  methods:{
        async getPosts(){
            const response = await axios.get('api/posts/',{
                headers:{
                    Authorization: 'Bearer ' + JSON.parse(sessionStorage.getItem("userInfo")).token
                }
            });
            console.log(response.data);
            this.posts = response.data;
        },
        async deletePost(post) {
            const response = await axios.delete("/api/posts/" + post.id, {
                 headers:{
                    Authorization: 'Bearer ' + JSON.parse(sessionStorage.getItem("userInfo")).token
                }
            });
            console.log(response.data);
            alert("Post effacé");
            this.$router.go("/");
        },
        async commentsByPost(){
            let id = this.postId;
            const response = await axios.get('api/comments/'+ id + '/post' ,{
                headers:{
                    Authorization: 'Bearer ' + JSON.parse(sessionStorage.getItem("userInfo")).token
                }
            });
            console.log(response.data);
            this.comments= response.data;
        },
        async deleteComment(comment) {
            const response = await axios.delete("/api/comments/" + comment.id, {
                 headers:{
                    Authorization: 'Bearer ' + JSON.parse(sessionStorage.getItem("userInfo")).token
                }
            })            
            console.log(response.data);
            alert("Commentaire effacé");
            this.$router.go("/");            
        },
    }
}
</script>


<style>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
.date{
    margin-left: 10px;
}
.roundPicture{
    width: 40px;
    height: 40px;
    object-fit: cover;
    border-radius: 50%;
}
.bottomIcons a, .bottomIcons span{
    margin-right: 8px;
    color:black;
}
.bottomIcons span{
    margin-right: 15px;;
}
.photoPost{
    width: 100%;
    max-height: 50vh;
    object-fit: contain;
}
.fa-edit, .fa-comments{
    margin-right: 10px;
}

.btnDelete{
    cursor: pointer;
}
 #comments{
     margin-top: 30px;
     
 }
 .comment{
     background-color: #F3F3F9;
     padding: 10px;
     border-radius: 8px;
     margin-top: 10px;
 }
.btnComment{
    margin-right:10px;
}
.fa-trash-alt{
    cursor: pointer;
}
</style>