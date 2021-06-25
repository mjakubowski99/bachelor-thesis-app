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
      <tr v-for="(item, index) in items" v-bind:key="index">
        <td>
          <button v-on:click="deleteSchedule(index)" class="btn btn-danger" :id="'delete-'+index">
            <delete-icon> </delete-icon>
          </button>
          {{ index + 1 }}
        </td>
        <td>
          <b-input-group class="mb-3 d-flex flex-row">
              <b-form-input
                  type="text"
                  v-model="item.start"
                  placeholder="HH:MM"
              ></b-form-input>
          </b-input-group>
        </td>
        <td>
          <b-input-group class="mb-3 d-flex flex-row">
            <b-form-input
                type="text"
                v-model="item.end"
                placeholder="HH:MM"
            ></b-form-input>
          </b-input-group>
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

import DeleteIcon from "./Icons/DeleteIcon";

export default {
  name: "ScheduleTableComponent",
  components: {DeleteIcon},
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
            start: '',
            end: '',
          }
      );
      this.scrollToDown();
    },
    scrollToDown(){
      this.$el.scrollIntoView(false);
    },
    deleteSchedule(index){
      this.items.splice(index, 1);
    }
  },
}
</script>

<style scoped>

</style>