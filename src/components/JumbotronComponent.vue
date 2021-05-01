<template>
  <b-jumbotron
      text-variant="white"
      class="border border-light text-center bg-violet"
      style="background-color: #8000ff;"
  >
    <template #header> {{ header }} </template>

    <template #lead> {{ lead }} </template>

    <hr class="my-4">

    <p> {{ footer }} </p>

  </b-jumbotron>
</template>

<script>
export default {
  name: "JumbotronComponent.vue",
  props: ['header', 'lead', 'footer'],
}
</script>

<style scoped>

</style>