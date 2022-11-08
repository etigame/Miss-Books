import { eventBus } from "../services/event-bus-service.js"

export default {
    template: `
        <section v-if="msg.txt" :class="msg.type" class="user-msg">
            <h1>{{ msg.txt }}</h1>
            <router-link v-if="msg.link" :to="msg.link">Check it Out</router-link>
            <button @click="msg.txt = !msg.txt">X</button>
        </section>
    `,
    data(){
        return {
            msg: { 
                txt: '', 
                type: 'success',
                // link: ''
            }
        }
    },
    created(){
        eventBus.on('user-msg', this.showMsg)
    },
    methods: {
        showMsg(payload){
            this.msg = payload
            setTimeout(() => this.msg.txt = '', this.msg.timeout || 3000)
        }
    },
}