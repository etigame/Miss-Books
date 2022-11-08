export default {
    props: ['book'],
    template: `
    <section :title="book.title" className="book-preview">
        <h2>{{book.title}}</h2>
        <h3>{{displayAmount}}</h3>
        <img :src="book.thumbnail" alt="book.title" />
    </section>
    `,
    computed: {
        displayAmount() {
            const {listPrice: {amount, currencyCode}} = this.book
            return new Intl.NumberFormat('en-US', { style: 'currency', currency: `${currencyCode}` }).format(amount) 
        },
    }
}