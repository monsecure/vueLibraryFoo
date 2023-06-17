<template>
  <div v-if="isBookCreated" class="success-message">
      Book created successfully!
  </div>
  <div class="book-form">
    <h2>{{ formTitle }}</h2>
    <form @submit.prevent="addBook">
      <div>
        <label for="title">Name:</label>
        <input type="text" id="title" v-model="book.title" required>
      </div>
      <div>
        <label for="synopsis">Synopsis:</label>
        <textarea id="synopsis" v-model="book.synopsis" required></textarea>
      </div>
      <div>               
        <label for="filterLanguage">Select the book Language:</label>
        <select id="filterLanguage" v-model="book.language">
          <option value="">All</option>
          <option value="English">English</option>
          <option value="Spanish">Spanish</option>
          <!-- Add more language options as needed -->
        </select>
      </div>
      <div>
        <label for="pageNumber">Page Number:</label>
        <input type="number" id="pageNumber" v-model="book.pagesNumber" required>
      </div>
      <div>
        <label for="publishDate">Publish Date:</label>
        <input type="date" id="publishDate" v-model="book.publishingDate" required>
      </div>
      <div>
        <label for="author">Autor:</label>
        <select id="author" v-model="book.author_id" required>
          <option value="">All</option>
          <option v-for="author in authors" :value="author.id" :key="author.id">
            {{ author.name }}
          </option>
        </select>
      </div>
      <div>
        <label for="editorial">Editorial:</label>
        <select id="editorial" v-model="book.editorial_id" required>
          <option value="">All</option>
          <option v-for="editorial in editorials" :value="editorial.id" :key="editorial.id">
            {{ editorial.name }}
          </option>
        </select>    
      </div>
      <div>
        <label for="biblioteca">Librería:</label>
        <select id="biblioteca" v-model="book.biblioteca_id" required>
          <option value="">All</option>
          <option v-for="biblioteca in bibliotecas" :value="biblioteca.id" :key="biblioteca.id">
            {{ biblioteca.name }}
          </option>
        </select>    
      </div>
      <div>
        <label for="isbn">ISBN:</label>
        <input type="text" id="isbn" v-model="book.isbn" required>
      </div>
      <button type="submit">Add Book</button>
    </form>
    <router-link to="/">Back to Home</router-link>
  </div>
</template>

<script>

import axios from 'axios';
//import {mapActions } from 'vuex';
//import { mapGetters } from "vuex";

export default {
  name: "add-book",
  data() {
    return {
      editorials: [],
      authors: [],
      bibliotecas: [],
      book: {
        title: '',
        synopsis: '',
        language: '',
        pagesNumber: 0,
        publishingDate: '',
        author_id: '',
        editorial_id: '',        
        biblioteca_id : '',
        isbn: ''
      },
      isBookCreated: false,
    };
  },
  computed: {
    formTitle() {
      return this.isEditMode ? 'Edit Book' : 'Add Book';
    },
    submitButtonText() {
      return this.isEditMode ? 'Update' : 'Save';
    },
    isEditMode() {
      return false;
      // Determine if the component is in edit mode based on a prop or route param
      // For example: return this.$route.params.id !== undefined;
    }
  },
  mounted() {
    this.fetchEditorials();
    this.fetchAuthors();    
    this.fetchBibliotecas();    
  },
  methods: {

    addBook() {

      if (this.isEditMode) {
        // Update book details
       /* this.updateBook(this.book)
          .then(() => {
            // Handle success
            console.log('Book updated successfully');
          })
          .catch(error => {
            // Handle error
            console.error('Error updating book:', error);
          });*/
      } else {
        // Add new book
        // Call an action to add the book to the store or API
        this.$store.dispatch("addBook", this.book)
          .then(() => {
              this.isBookCreated = true;
            // Book added successfully, navigate to book list
            //this.$router.push("/");
          })
          .catch((error) => {
            // Handle error
            console.error(error);
          });
      }

    },
    async fetchEditorials() {
      try {
        const response = await axios.get('http://localhost:8000/api/editorials');
        this.editorials = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    async fetchAuthors() {
      try {
        const response = await axios.get('http://localhost:8000/api/authors');
        this.authors = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    async fetchBibliotecas() {
      try {
        const response = await axios.get('http://localhost:8000/api/bibliotecas');
        this.bibliotecas = response.data;
      } catch (error) {
        console.log(error);
      }
    }
  },
};
</script>

<style scoped>
.book-form {
  max-width: 500px;
  margin: 0 auto;
}

.book-form form {
  display: flex;
  flex-direction: column;
}

.book-form label {
  margin-bottom: 5px;
  margin-right: 5px;
}

.book-form input[type="text"],
.book-form input[type="number"],
.book-form input[type="date"],
.book-form textarea,
.book-form select {
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.book-form button[type="submit"] {
  padding: 10px 20px;
  background-color: #428bca;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.success-message {
  background-color: green;
  color: white;
  padding: 10px;
  text-align: center;
}
</style>
