import { booksService } from '../services/books-service.js'

import bookList from '../cmps/book-list.cmp.js'
import bookFilter from '../cmps/book-filter.cmp.js'
import bookAdd from '../cmps/book-add.cmp.js'
// import bookDetails from './book-details.cmp.js' // moved to main.js on views

export default {
  template: `
    <section class="books-app">
        <book-add />
        <book-filter @filtered="setFilter" />
        <book-list 
            :books="booksToShow" 
            @selected="selectBook" 
            @remove="removeBook" />
        <book-details 
            :book="selectedBook"
            @close="selectedBook = null" 
            v-if="selectedBook" />
    </section>
    `,
  data() {
    return {
      books: [],
      filterBy: null,
      selectedBook: null,
    }
  },
  created() {
    booksService.query()
    .then(books => this.books = books)
  },
  methods: {
    removeBook(bookId) {
      booksService.remove(bookId)
      .then(() => {
        const idx = this.books.findIndex((book) => book.id === bookId)
        this.books.splice(idx, 1)
        })

    },
    selectBook(bookId) {
      this.selectedBook = this.books.find((book) => book.id === bookId)
    },
    setFilter(filterBy) {
      this.filterBy = filterBy
      //   if (filterBy.name !== undefined) this.filterBy.name = filterBy.name
      //   if (filterBy.minPrice !== undefined)
      //     this.filterBy.minPrice = filterBy.minPrice
      //   if (filterBy.maxPrice !== undefined)
      //     this.filterBy.maxPrice = filterBy.maxPrice
    },
  },
  computed: {
    booksToShow() {
      if (!this.filterBy) return this.books
      const { name, maxPrice, minPrice } = this.filterBy
      const regex = new RegExp(name, 'i') // i = ignore case sensitive
      return this.books.filter(
        ({ title, listPrice: { amount } }) =>
          regex.test(title) && // regex.test return true/false
          amount >= minPrice &&
          amount <= maxPrice
      )
    },
  },
  components: {
    bookList,
    bookFilter,
    bookAdd,
    // bookDetails,
  },
}
