<template>
  <div id="app">

    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'App',
  data(){
    return{
      userConnected: sessionStorage.getItem("userToken"), 
    }
  },
  created () {
            document.title = "Groupomania";
        }
}
</script>

<style>

</style>
