<template>
    <button
      type="button"
      class="btn rounded-pill mx-1 btn-sm btn-blue-outline"
      :class="customClass"
      :aria-label="text"
    >
      {{ text }}
    </button>
  </template>
  
  <script>
  export default {
    name: "FilterBtn",
    props: {
      text: {
        type: String,
        required: true,
      },
      customClass: {
        type: String,
        default: "",
      },
    },
  };
  </script>
  
  <style scoped>

  </style>
  