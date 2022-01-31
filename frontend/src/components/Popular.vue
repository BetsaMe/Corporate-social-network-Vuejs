<template>
    <div>
      <div class="d-flex justify-content-around align-items-center my-3">
          <img class="roundPicture" :src="src" :alt="alt">
          <span>{{ text }}</span>
          <button type="button" class="btn rounded-pill px-3 py-1 btnPopulaire1">{{ btnname }}</button>
      </div>
    </div>    
</template>

<script>
export default {
  name: 'Popular',
  props:[ 'src', 'alt', 'text', 'btnname'] 
}
</script>


<style >

</style>
