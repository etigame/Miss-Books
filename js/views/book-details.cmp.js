import { booksService } from '../services/books-service.js'
import {
  eventBus,
  showSuccessMsg,
  showErrorMsg,
} from '../services/event-bus-service.js'

import longText from '../cmps/long-text.cmp.js'
import reviewAdd from '../cmps/review-add.cmp.js'

export default {
  // props:['book'], // no need anymore because the id comes from the router.params
  template: `
    <section v-if="book" className="book-details">
        <h2>{{ book.title }}</h2>
        <h3>{{ book.subtitle }}</h3>
        <img :src="book.thumbnail" alt="" />
        <p>Authors: {{ displayAuthors }}</p>
        <p>Published: {{ book.publishedDate }}, {{ bookState }}</p>
        <p>Price: <span :style="stylePrice">{{ displayAmount }}</span></p>
        <img v-if="book.listPrice.isOnSale" :src="saleImg" alt="" />
        <p>Language: {{ book.language }}</p>
        <p>Page count: {{ book.pageCount }}, {{ readingLength }}</p>
        <p>Categories: {{ displayCategories }}</p>
        <p>Id: {{ book.id }}</p>
        <long-text :txt="book.description" :maxLength="100" />
        <review-add @saveReview="addReview"/>
        <!-- the section below should be a component 'reviews'-->
        <section v-if="book.reviews" class="book-reviews">
            <ul>
                <li v-for="review in book.reviews" :key="review.id">
                    <button @click="deleteReview(review.id)">X</button>
                    <p>Name: {{ review.name }}</p>
                    <p>Rate: {{ review.rating }}</p>
                    <p>Read at: {{ review.readDate }}</p>
                    <p>"{{ review.txt }}"</p>
                </li>
            </ul>
        </section>
        <!-- check -->
        <!-- <button @click="$emit('close')">Close</button> -->
        <router-link to="/book" :book="book">Back</router-link> 
    </section>

    <h3 v-else>Loading...</h3>
    `,
  data() {
    return {
      book: null,
    }
  },
  created() {
    const id = this.$route.params.id
    booksService.get(id).then((book) => (this.book = book))
  },
  methods: {
    addReview(review) {  // should be like this(=with the service) because it's data on storage
      booksService.addReview(this.book.id, review)
      .then((book) => {
        this.book = book

        const msg = {
          txt: `Book ${book.id} was successfully edited`,
          link: `/book/${book.id}`,
        }
        showSuccessMsg(msg.txt, msg.link)
      })
      .catch(err => console.log(err))
    

      // eventBus.emit('user-msg', msg)
      // this.$router.push('/car') // after edit, navigate immidietly to the car-list page
    },
    deleteReview(reviewId) { // should be also in the service (like addReview)
      const reviews = this.book.reviews
      const idx = reviews.findIndex((review) => review.id === reviewId)
      reviews.splice(idx, 1)

      const msg = {
        txt: `Review ${reviewId} was successfully removed`,
        type: 'success',
        link: ``,
        timeout: 10000,
      }
      eventBus.emit('user-msg', msg)
    },
  },
  computed: {
    displayAmount() {
      const {
        listPrice: { amount, currencyCode },
        language,
      } = this.book
      return new Intl.NumberFormat(language, {
        style: 'currency',
        currency: `${currencyCode}`,
      }).format(amount)
    },
    readingLength() {
      if (this.book.pageCount <= 100) return 'Light Reading'
      if (this.book.pageCount > 100 && this.book.pageCount <= 500)
        return 'Decent Reading'
      else return 'Long reading'
    },
    bookState() {
      const yearNow = new Date().getFullYear()
      if (yearNow - this.book.publishedDate > 10) return 'Veteran Book'
      if (yearNow - this.book.publishedDate < 1) return 'New!'
    },
    stylePrice() {
      if (this.book.listPrice.amount > 150) return 'color: red'
      if (this.book.listPrice.amount < 20) return 'color: green'
    },
    saleImg() {
      return '../../img/sale.png'
    },
    displayAuthors() {
      return this.book.authors.join()
    },
    displayCategories() {
      return this.book.categories.join()
    },
  },
  components: {
    longText,
    reviewAdd,
  },
}
