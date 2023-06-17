<template>
  <div>
    <h1>Editorial List</h1>
    <ul>
      <li v-for="editorial in editorials" :key="editorial.id">
        {{ editorial.name }} | Address: {{ editorial.address }}
      </li>
    </ul>
  </div>
</template>

<script>
//inside caus is out of requeriments
import axios from 'axios';

export default {
  data() {
    return {
      editorials: []
    };
  },
  mounted() {
    axios.get('/api/editorials')
      .then(response => {
        this.editorials = response.data;
      })
      .catch(error => {
        console.error('Error fetching editorials:', error);
      });
  }
};
</script>