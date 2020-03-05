<template>
  <div class="xm-center">
    <div class="hot-title">{{hotTitle}}</div>
    <div class="flex">
      <div class="hot-box" v-for="item in hotProductsList" :key="item.id">
        <goodBox class="hot-each" :item="item" />
      </div>
    </div>
  </div>
</template>

<script>
import goodBox from "../common/XmGoodBox";
export default {
  name: "XmHotProduct",
  props: {
    hotProductsList: {
      type: Array,
      default: () => []
    },
    hotTitle: {
      type: String,
      default: ""
    }
  },
  data() {
    return {};
  },
  computed: {},
  created() {},
  mounted() {},
  watch: {},
  methods: {
    addCart(productId) {
      this.$api.addCart(productId).then(res => {
        if (res.code === 200) {
          this.$store.dispatch("getCart");
          this.$store.state.showCart = true;
        }
      });
    }
  },
  components: { goodBox },
  filters: {}
};
</script>

<style scoped lang="scss">
.xm-center {
  border: 1px solid #d4d4d4;
  border-radius: 8px 8px 0 0;
  overflow: hidden;
}
.hot-title {
  width: 100%;
  height: 60px;
  background: linear-gradient(#fbfbfb, #ececec);
  border-bottom: 1px solid #d4d4d4;
  font-size: 18px;
  font-weight: 400;
  color: #626262;
  line-height: 60px;
  padding: 0 20px;
}
.flex {
  overflow-y: hidden;
}
.hot-box {
  width: 50%;
  flex: 1;
  height: 430px;
  text-align: center;
  background: rgba($color: #999, $alpha: 0.1);
  .hot-each {
    width: 100%;
  }
}
</style>
