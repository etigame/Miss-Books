// import { booksService } from '../services/books-service.js'
import { utilService } from '../services/util-service.js'

export default {
  props: ['book'],
  template: `
    <section className="review-add">
        <h1>Add Review</h1>
        <form @submit.prevent="save">
            <input ref="name" type="text" placeholder="Full name" v-model="review.name">
            <!-- <input type="number" placeholder="1-5" v-model="review.rating"> -->
            <select v-model.number="review.rating">
              <option v-for="n in 5">{{ n }}</option>
            </select>
            <p for="read-date">Read at:</p>
            <input id="read-date" type="date" v-model="review.readDate"/>
            <textarea cols="30" rows="5" placeholder="Your review" v-model="review.txt"></textarea>
            <button>Save</button>
        </form>
    </section>
    `,
  data() {
    return {
      review: {
        name: 'Books Reader',
        rating: 1,
        readDate: new Date().toISOString().slice(0, 10),
        txt: '',
      },
    }
  },
  mounted() {
    this.$refs.name.focus()
  },
  methods: {
    save() {
      this.$emit('saveReview', { ...this.review }) // it's better to break the pointer (else it can do problems like edit another reviews on submit)
      this.review = { // if it was bigger data we should get it from the service
        name: 'Books Reader',
        rating: 1,
        readDate: new Date().toISOString().slice(0, 10),
        txt: '',
      }
    },
  },
}
