<template>
  <b-jumbotron
      bg-variant="dark"
      text-variant="white"
      border-variant="dark"
      class="mt-5 border border-light"
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