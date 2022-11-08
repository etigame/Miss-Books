export default {
    template: `
    <section className="book-add">
        <h1>Add new book</h1>
        <input @input="filter"
                v-model="filterBy.name" 
                type="text" 
                placeholder="Search for a book">
    </section>
    `,
    data() {
        return {
            books: []
        }
    },
    created() {
        booksService.query()
        .then(books => this.books = books)
      },
}