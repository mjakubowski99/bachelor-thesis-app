<template>
  <div id="container" class="ml-5 mr-5">
    <table id="table" class="table table-bordered border-dark" style="box-shadow: 5px 5px 19px -4px #000000;">
      <thead class="bg-dark text-light">
      <tr>
        <th scope="col">Numer</th>
        <th scope="col">Godzina poczatkowa</th>
        <th scope="col">Godzina koncowa</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in items" v-bind:key="item.number">
        <td>
          {{ item.number }}
        </td>
        <td>
          <b-form-timepicker class="w-50 mx-auto" v-model="item.start" locale="pl"></b-form-timepicker>
        </td>
        <td>
          <b-form-timepicker class="w-50 mx-auto" v-model="item.end" locale="pl"></b-form-timepicker>
        </td>
      </tr>
      </tbody>
    </table>
    <div class="text-center">
      <button @click="addItem()" id="add-item" class="btn btn-primary mb-5 mr-2"> Dodaj godzine odjazdu </button>
      <button v-on:click="$emit('get-schedule', items)" class="btn btn-danger mb-5 mr-2"> Wygeneruj rozkład </button>
    </div>
  </div>
</template>

<script>

export default {
  name: "ScheduleTableComponent",
  data(){
      return {
        items: [],
        counter: 1,
        startDate: [],
        endDate: [],
      }
  },
  methods: {
    addItem(){
      this.items.push(
          {
            number: this.counter,
            start: '',
            end: '',
          }
      );
      this.counter++;
      this.scrollToDown();
    },
    scrollToDown(){
      this.$el.scrollIntoView(false);
    }
  },
}
</script>

<style scoped>

</style>