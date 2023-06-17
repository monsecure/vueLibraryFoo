import BookList from '../components/BookList.vue';
import BookForm from '../components/BookForm.vue';
import BookDetails from '../components/BookDetails.vue';
//import AuthorList from '../components/AuthorList.vue';
//import AuthorForm from '../components/AuthorForm.vue';
import EditorialList from '../components/EditorialList.vue';
//import EditorialForm from '../components/EditorialForm.vue';
import LibraryList from '../components/LibraryList.vue';
//import LibraryForm from '../components/LibraryForm.vue';

export const routes = [
  { path: '/', redirect: '/libraries' },//{ path: '/', redirect: '/dashboard' }
 // { path: '/books', component: BookList },
  { path: '/books/add', component: BookForm },
  { path: '/books/edit/:id', component: BookForm },
  { path: '/books/:id', component: BookDetails },
  //{ path: '/authors', component: AuthorList },
  //{ path: '/authors/add', component: AuthorForm },
  //{ path: '/authors/edit/:id', component: AuthorForm },
  { path: '/editorials', component: EditorialList },
  //{ path: '/editorials/add', component: EditorialForm },
  //{ path: '/editorials/edit/:id', component: EditorialForm },
  { path: '/libraries', component: LibraryList },
  { path: '/libraries/:id/books', component: BookList },
  //{ path: '/libraries/add', component: LibraryForm },
  //{ path: '/libraries/edit/:id', component: LibraryForm },
];

/*const router = new VueRouter({
  mode: 'history',
  routes,
});*/

/*const routes = [
  { path: "/", component: Home },
  { path: "/book/:id", component: BookDetails },
  { path: "/book/add", component: AddBook },
];*/


//export default router;
