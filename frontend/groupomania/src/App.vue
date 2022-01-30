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
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
i .fa, .bottomIcons i{
  color: #8a8a8a;
}
.fa-user-circle{
  font-size: 35px;
}
.fa-bell{
  font-size: 18px;
}
.inputsearch{
  width: 80%;
}
.rounded-circle{
  object-fit: cover;
}

</style>
