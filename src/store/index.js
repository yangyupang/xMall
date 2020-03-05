import Vue from 'vue'
import Vuex from 'vuex'
import $api from '../http/api'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        cartNum: 0,
        username: '',
        goodsList: [],
        cartSum: 0,
        showCart: false
    },
    mutations: {},
    actions: {
        getCart({
            state
        }) {
            $api.getCarts().then(res => {
                if (res) {
                    state.goodsList = res.data
                    let num = 0
                    let sum = 0
                    res.data.map(item => {
                        num += item.count
                        sum += item.count * item.salePrice
                        item.checked = true
                    })
                    state.cartSum = sum
                    state.cartNum = num
                } else {
                    state.goodsList = []
                    state.cartSum = 0
                    state.cartNum = 0
                }
            })
        }
    },
    modules: {}
})