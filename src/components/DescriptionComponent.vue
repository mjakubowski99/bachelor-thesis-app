<template>
  <div class="d-flex w-75 ml-auto mr-auto content-wrapper mt-5 mb-5">

      <div class="flex-row bg-primary text-white w-50">
          <h3 class="text-center mt-5 mb-5 w-75 ml-auto mr-auto border-bottom border-light"> {{ title }}</h3>
          <br/><br/><br/>
          <div class="text-center ml-5 mr-5">
              <slot> </slot>
          </div>

          <div class="mt-3 text-center">
            <a class="btn btn-light text-primary" :href="buttonLink"> Przejdź do modułu </a>
          </div>
      </div>

      <div class="flex-row w-50 bg-white">
        <img :src="imagePath" alt="..." class="img-fluid">
      </div>

  </div>

</template>

<script>
export default {
    name: "DescriptionComponent",
    props: ['imagePath', 'buttonLink', 'title', 'content'],
}
</script>

<style scoped>

</style>