import Vue from 'vue'

Vue.prototype.$godetail = function(id) {
    this.$router.push({
        name: "detail",
        params: {
            id: id
        }
    });
}