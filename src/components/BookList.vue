<template>
  <div>
    <h2>Book List</h2>

    <div class="filter-section">
      <button @click="toggleFilters" class="collapse-btn">
        {{ showFilters ? 'Hide Filters' : 'Show Filters' }}
      </button>
      <div v-show="showFilters" class="filters">       
        <label for="filterLanguage">Filter by Language:</label>
        <select id="filterLanguage" v-model="filter.language">
          <option value="">All</option>
          <option value="English">English</option>
          <option value="Spanish">Spanish</option>
          <!-- Add more language options as needed -->
        </select>
        <select v-model="filter.editorialid">
          <option value="">All</option>
          <option v-for="editorial in editorials" :value="editorial.id" :key="editorial.id">
            {{ editorial.name }}
          </option>
        </select>
        <input v-model="filter.author" type="text" placeholder="Author">        
        <input v-model="filter.date" type="text" placeholder="Date">        
        <input v-model="filter.isbn" type="text" placeholder="ISBN">
        <input type="text" v-model="filter.title" placeholder="Search title">    
        <button @click="filterBooks">Filter</button>
      </div>
    </div>



   
    <span class="action-span-top">
       <button @click="goToAddBook">Add Book</button>
    </span>
    
    <table class="book-table">
      <thead>
        <tr>
          <th>Title</th>          
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="book in filteredBooks" :key="book.id">
          <td>{{ book.title }}</td>         
          <td>
            <span class="action-span"><router-link :to="`/books/${book.id}`">View</router-link></span>
            <span class="action-span">
              <button @click="editBook(book.id)" :disabled="isDisabled">Edit</button>
            </span>
            <span class="action-span">
              <button @click="moveToTrash(book.id)">Move to Trash</button>
            </span>
            <span class="action-span">
              <button @click="deleteBook(book.id)">Delete</button>
            </span>
            
          </td>
        </tr>
      </tbody>
    </table>

     <div class="pagination">
       <button @click="previousPage" :disabled="currentPage === 1">Previous</button>
        <span>Page {{ currentPage }} of {{ totalPages }}</span>
        <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
    </div>

   
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import axios from 'axios';

export default {
  name: "book-list",
  data() {
    return {
      showFilters: true,
      editorials: [],
      filter : {
        language: '',
        author: '',
        date : '',
        editorialid : 0 ,
        title : '',
        isbn : '',
        libraryid : 0,
        page :1,
        pageSize : 2,
      },
      //currentPage : 1,
      //totalPages : 0     
    };
  },
  mounted() {
    this.fetchEditorials();    
  },
  computed: {
     ...mapGetters(["filteredBooks", "currentPage", "totalPages"]),
     isDisabled() {
      
        return true == true
      },
  },
  methods: {
    toggleFilters() {
      this.showFilters = !this.showFilters;
    },
    goToAddBook() {
      this.$router.push("/books/add");
    },
    previousPage() {
      if (this.currentPage > 1) {
        //this.$store.dispatch("fetchBooks", this.currentPage - 1,this.$route.params.id);
        this.filter.page = this.currentPage - 1;
        this.$store.dispatch("filterBooks", this.filter);
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        //this.$store.dispatch("fetchBooks", this.currentPage + 1,this.$route.params.id);
         this.filter.page = this.currentPage + 1;
         this.$store.dispatch("filterBooks", this.filter);
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
    moveToTrash(id) {//delte logico o soft delete con opcion para restaurar 
       axios.patch('http://localhost:8000/api/books/'+id+'/move-to-trash')
      .then(response => {
        console.log(response.data);
        this.$router.go();
      })
      .catch(error => {
        console.error('Error fetching libraries:', error);
      });
    },
    deleteBook(id) {//hard delete/destroy
       axios.delete('http://localhost:8000/api/books/'+id)
      .then(response => {
        console.log(response.data);
        this.$router.go();
      })
      .catch(error => {
        console.error('Error fetching libraries:', error);
      });
    }    
  },
  created() {
   
    console.log(this.filter);
    this.filter.libraryId =parseInt(this.$route.params.id);
    this.$store.dispatch("filterBooks",this.filter);
  },
};
</script>

<style>

.filter-section {
  margin-bottom: 20px;
}

.collapse-btn {
  padding: 5px 10px;
  background-color: #42ca91;
  color: #fff;
  border: none;
  cursor: pointer;
}

.filters {
  margin-top: 5px;
  padding: 10px;
  border: 2px solid #42ca91;
}

/*input[type="text"] {
  padding: 5px;
  margin-right: 5px;
}*/
.filters input[type="text"] {
  padding: 5px;
  margin-right: 5px;
}


button {
  padding: 5px 10px;
  background-color: #3490dc;
  color: #fff;
  border: none;
  cursor: pointer;
}

.book-list li {
  margin-bottom: 10px;
  font-size: 16px;
}

.book-table {
  width: 100%;
  border-collapse: collapse;
}

.book-table th,
.book-table td {
  padding: 10px;
  border: 1px solid #ddd;
}

.book-table th {
  background-color: #f2f2f2;
}

.book-table td:last-child {
  white-space: nowrap;
}

.action-span {
  display: inline-block;
  margin-right: 5px;
}

.action-span-top {
  display: inline-block;
  margin: 10px;
}

.pagination {
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
}

.pagination button {
  padding: 5px 10px;
  background-color: #428bca;
  color: #fff;
  border: none;
  cursor: pointer;
  margin: 0 5px;
}
</style>

