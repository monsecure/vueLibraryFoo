<template>
  <div>
    <h1>Book Details</h1>
    <div v-if="bookDetails">
      <h2>{{ bookDetails.title }}</h2>
      <p>Synopsis: {{ bookDetails.synopsis }}</p>
      <p>Language: {{ bookDetails.language }}</p>
      <p>Page Numbers: {{ bookDetails.pageNumbers }}</p>
      <p>Publish Date: {{ bookDetails.publishDate }}</p>
    
      <p>ISBN: {{ bookDetails.isbn }}</p>
    </div>
    <div v-else>
      <p>Book not found.</p>
    </div>
    <router-link to="/">Back to Book List</router-link>
  </div>
</template>

<script>
//import { mapGetters } from "vuex";
import {mapActions } from 'vuex';
import axios from 'axios';

export default {
  name: "book-details",
  data() {
    return {     
      bookDetails: {},       
    };
  },
  methods: {
    ...mapActions(['fetchBookDetails']), 
    fetchDetails() {      
      this.bookDetails =this.fetchBookDetails(this.getRoute());
    },
   /* getDetails() {
      this.bookDetails = this.getBookDetails;  
    } */
    getRoute() {
      return parseInt(this.$route.params.id) 
    }
  },
  mounted() {
    //(async () => {
     
     console.log(this.$route.query);
       axios.get('http://localhost:8000/api/books/'+this.getRoute())
      .then(response => {
        this.bookDetails = response.data[0];
      })
      .catch(error => {
        console.error('Error fetching editorials:', error);
      });
    //});


   
  },

      
};
</script>

