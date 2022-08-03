<template>
  <div>
    <div class="d-flex justify-content-around align-items-center my-3">
      <img class="roundPicture" :src="src" :alt="alt" />
      <span>{{ text }}</span>
      <button type="button" class="btn px-3 btn-sm btn-blue-outline">
        {{ btnname }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Popular",
  props: ["src", "alt", "text", "btnname"],
};
</script>

<style></style>
