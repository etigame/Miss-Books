import booksApp from './views/books-app.cmp.js'
import homePage from './views/home-page.cmp.js'
import aboutPage from './views/about-page.cmp.js'
import bookDetails from './views/book-details.cmp.js'

const { createRouter, createWebHashHistory } = VueRouter

const routerOptions = {
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            component: homePage
        },
        {
            path: '/book',
            component: booksApp
        },
        {
            path: '/book/:id',
            component: bookDetails
        },
        {
            path: '/about',
            component: aboutPage
        }
    ]
}

export const router = createRouter(routerOptions)
