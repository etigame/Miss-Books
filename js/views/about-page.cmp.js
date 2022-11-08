// import { eventBus } from '../services/event-bus.service.js'

export default {
    template: `
        <section class="about-page">
            <h1>About Miss Books</h1>
            <img src="./img/miss-books.jpg" alt="Miss Books" />
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro voluptates blanditiis rem quisquam nisi ad sint id tempora, officiis architecto doloribus labore libero consequatur odit ex! Laudantium ut animi at placeat minima, error accusamus architecto officia quo mollitia debitis necessitatibus ipsa, beatae doloribus aliquam aut. Rerum dolore minima fugiat quam voluptatum magni laudantium quae repudiandae veniam saepe, reprehenderit vel doloribus placeat, incidunt architecto esse consequatur quod eum magnam possimus? Molestias facilis consequatur quisquam. Itaque earum nostrum porro explicabo quisquam eius eveniet officia assumenda quod, aperiam, quibusdam veniam ut quasi quos molestias voluptate mollitia praesentium ullam asperiores? Nulla facilis ab hic.</p>
            <!-- <button @click="emit">Emit test event</button> -->
        </section>
    `,
    created() {
        // const aboutInterval = function() {
        //     console.log('aboutInterval')
        // }
        // setInterval(aboutInterval, 1000)
    },
    unmounted() {
        // clearInterval(this.aboutInterval) // not working
        // console.log('Stop interval');
    },
    methods: {
        // emit(){
        //     eventBus.emit('user-msg', {num: 1234, txt: 'baba'})
        // }
    },
 
}