import { createStore } from 'vuex'
import api from "./api.js";


export const store = createStore({
  state: {
    books: [],
    currentPage: 1,
    totalPages: 1,
    currLibraryId : 1,
    bookDetails: null,
    filters: {
        language: '',
        author: '',
        date : '',
        editorialid : 0 ,
        title : '',
        isbn : '',
        libraryid : 0,
        page :1,
        pageSize : 2,
    }
  },
  getters: {
    books: (state) => state.books,
    filteredBooks: state => {        
        return state.books;
      },    
    currentPage:(state) => state.currentPage,
    totalPages:(state) => state.totalPages,
   
   /* getBookById: (state) => (id) =>{
        var found = state.books.find((book) => book.id === id);
        if(found.lenght ===0){
           found =  state.bookDetails;
        }
        return found;
    }, */
  },
  mutations: {
    setBooks(state, { books, currentPage, totalPages }) {
      state.books = books;
      state.currentPage = currentPage;
      state.totalPages = totalPages;
    },
    setBookFilters(state, filters) {
        state.filters = filters;
    },
    addBookStore(state, book) {
      state.books.push(book);
    },
    setBookDetails: (state, details) => {
        state.bookDetails = details;
    }
  },  
  actions: {   
    filterBooks({ commit }, filterRequest) {
        console.log(this.filter);
        api.searchBooks(filterRequest)
          .then((response) => {
          
            const { data } = response; // Assuming the books are returned in the "data" property of the response
            const { current_page, last_page, library_id, data: books } = data; // Extracting the pagination and books data
            commit("setBooks", { books, currentPage: current_page, totalPages: last_page, libraryId : library_id });
          })
          .catch((error) => {
            // Handle error
            console.error(error);
          });
    },
    updateBookFilters({ commit }, filters) {
        commit('setBookFilters', filters);
    },
    addBook({ commit }, book) {
        
        return api.createBook(book)
        .then((response) => {
            commit("addBookStore", response.data);
        });
    },
    fetchBookDetails: ({ commit }, bookId) => {
    
        api.getBook(bookId)
          .then((response) => {
            commit('setBookDetails', response.data[0]);
          })
          .catch((error) => {
            // Handle error
            console.error(error);
          });
    }, 
    getBookDetails: (state) => state.bookDetails,   
  },
  
});