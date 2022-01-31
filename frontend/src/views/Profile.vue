<template>
    <div v-if="userConnected">  
         <Navbar/>    
         <CardProfile/>  
    </div> 
    <div v-else >
           {{ this.$router.push("/") }} 
    </div>  
</template>

<script>
// @ is an alias to /src
import CardProfile from '@/components/CardProfile.vue'
import Navbar from '@/components/Navbar.vue'

export default {
  name: 'Profile',
  components: {
    CardProfile,
    Navbar
  },
  data(){
    return{
      userConnected: null
    }
  },
    created: function(){
     this.userConnected= JSON.parse(sessionStorage.getItem("userInfo"))
  },
}
</script>


<style>
*{
    box-sizing: border-box;
}
body{
    width: 100%;
    background-color: #F3F3F9;
    font-family: 'Poppins', sans-serif;
    color: rgb(33, 34, 33);
    font-size: 15px;
}
nav{
    background-color: #fff;   
    box-shadow: 0px 5px 21px -5px #cdd1e1;
    margin-bottom: 30px;
}
.container-fluid{
    width: 70%;
}
.headerFeed, .cardStyle,  .populaires{
    background-color: #fff;
    border-radius: 5px;
}

.cardStyle .photoPost{   
    object-fit: contain;
}
.btnPublication{
    width: 30%;
    height: 40px;
}


@media only screen and (max-width: 1024px){
    .container-fluid{
        width: 100%;
    }
    
}
@media only screen and (max-width: 992px){
    .form-control {
        width: 100%;
    }
    
}

</style>
