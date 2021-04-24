<template>
    <ul class="list-group list-group-flush">
      <li class="list-group-item" v-for="date in dates" :key="date.number">
          {{ date.start }} - {{ date.end }}
      </li>
    </ul>
</template>

<script>
export default {
  name: "CardComponent.vue",
  props: ['dates']

}
</script>

<style scoped>

</style>