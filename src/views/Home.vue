<template>
  <div>
    <h1>Library App - Book List</h1>
    <button @click="goToAddBook">Add Book</button>
    <ul>
      <li v-for="book in books" :key="book.id">
        <router-link :to="'/book/' + book.id">{{ book.name }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Home",
  computed: {
    ...mapGetters(["books"]),
  },
  methods: {
    goToAddBook() {
      this.$router.push("/book/add");
    },
  },
  created() {
    // Fetch book list from the store or API
    //this.$store.dispatch("fetchBooks");
  },
};
</script>

