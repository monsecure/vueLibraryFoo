<template>
  <div>
    <h1>Library List</h1>
    <ul>
      <li v-for="library in libraries" :key="library.id">
        {{ library.name }} | Address: {{ library.address }} |  <router-link :to="`/libraries/${library.id}/books`">View {{ library.name }} book list</router-link>
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
      libraries: []
    };
  },
  mounted() {
    axios.get('http://localhost:8000/api/bibliotecas')
      .then(response => {
        this.libraries = response.data;
      })
      .catch(error => {
        console.error('Error fetching libraries:', error);
      });
  }
};
</script>
