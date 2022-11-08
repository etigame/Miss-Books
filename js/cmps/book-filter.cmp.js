export default {
    template: `
    <section className="book-filter">
        <h1>Filter By</h1>
        <input 
                @input="filter"
                v-model="filterBy.name" 
                type="text" 
                placeholder="Search">
        <section className="filter-min-price">
            <label for="min-price">Min Price </label>
            <input 
                    @input="filter"
                    v-model="filterBy.minPrice" 
                    type="range" 
                    :id="min-price"
                    min="0" max="300"
                    :title="filterBy.minPrice">
            <span> {{filterBy.minPrice}}</span>
        </section>
        <section className="filter-max-price">
            <label for="max-price">Max Price </label>
            <input 
                    @input="filter"
                    v-model="filterBy.maxPrice" 
                    type="range" 
                    :id="max-price"
                    min="0" max="300"
                    :title="filterBy.maxPrice">
            <span> {{filterBy.maxPrice}}</span>
        </section>
    </section>
    `,
    data() {
        return {
            filterBy: {
                name: '',
                minPrice: 0,
                maxPrice: 300
            }
        }
    },
    methods: {
        filter() {
            this.$emit('filtered', {...this.filterBy}) // we send copy of the data because we don't want to reveale it for posibble dangers
        }
    }
}