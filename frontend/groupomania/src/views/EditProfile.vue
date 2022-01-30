<template>
    <main v-if="userConnected">  
         <Navbar/>    
         <CardEditProfile/>  
    </main>  
</template>

<script>
// @ is an alias to /src
import CardEditProfile from '@/components/CardEditProfile.vue'
import Navbar from '@/components/Navbar.vue'

export default {
  name: 'Profile',
  components: {
    CardEditProfile,
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


</style>
