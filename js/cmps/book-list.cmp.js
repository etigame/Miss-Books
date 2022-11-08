import bookPreview from './book-preview.cmp.js'
import { eventBus } from '../services/event-bus-service.js'

export default {
    props: ['books'],
    template: `
    <section className="book-list">
        <ul>
            <li v-for="book in books" :key="book.id" >
                <book-preview :book="book"/>
                <section className="actions">
                    <!-- <button @click="showDetails(book.id)">Details</button> -->
                    <router-link :to=" '/book/' + book.id ">Details</router-link>
                    <button @click="remove(book.id)">Delete</button>
                </section>
            </li>
        </ul>
    </section>
    `,
    methods: {
        remove(bookId) {
            this.$emit('remove', bookId)

            const msg = {
                txt: `Book ${bookId} was successfully removed`,
                type: 'success',
                link: ``,
                timeout: 10000,
              }
              eventBus.emit('user-msg', msg)
        },
        // showDetails(bookId) {
        //     this.$emit('selected', bookId)
        // }
    },
    components: {
        bookPreview
    }
}