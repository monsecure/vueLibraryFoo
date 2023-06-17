import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export default {
  // Books API
  getBooks(data) {
    return apiClient.post('/books',data);//se asume que data contiene los filtros
  },
 /* getBooks(pageNumber,libraryId) {
    return apiClient.get('/books',{
      params: {
        page: pageNumber,
        pageSize: 10,
        libraryId: libraryId
      }
    });
  },*/
  searchBooks(data) {
  
      return apiClient.post('/books/search', data)
      
  },
  getBook(id) {
    return apiClient.get(`/books/${id}`);
  },
  createBook(data) {
    return apiClient.post('/books', data);
  },
  updateBook(id, data) {
    return apiClient.put(`/books/${id}`, data);
  },
  deleteBook(id) {
    return apiClient.delete(`/books/${id}`);
  },
  moveToTrashBook(id) {
    return apiClient.delete(`/books/${id}/move-to-trash`);
  },
  restoreBook(id) {
    return apiClient.patch(`/books/${id}/restore`);
  },
  getTrashedBooks(pageNumber,pageSize) {
    return apiClient.get('/books',{
      params: {
        page: pageNumber,
        pageSize: pageSize
      }
    });
  },
  // Authors API
  getAuthors() {
    return apiClient.get('/authors');
  },
  // Editorials API
  getEditorials() {
    return apiClient.get('/editorials');
  },
 
};
