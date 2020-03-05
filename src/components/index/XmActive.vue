<template>
  <div class="xm-center flex">
    <div class="active-box" v-for="item in activeList" :key="item.id">
      <div class="active-each" @click="$godetail(item.productId)">
        <div class="active-shadow"></div>
        <img :src="item.picUrl" alt />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "XmActive",
  props: {
    activeList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {};
  },
  computed: {},
  created() {},
  mounted() {},
  watch: {},
  methods: {},
  components: {},
  filters: {}
};
</script>

<style scoped lang="scss">
.xm-center {
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.14);
  margin-bottom: 20px;
}
.active-box {
  width: 25%;
  &:nth-child(-n + 3) {
    border-right: 1px solid rgba(0, 0, 0, 0.14);
  }
  .active-each {
    width: 100%;
    height: 200px;
    position: relative;

    .active-shadow {
      position: absolute;
      width: 100%;
      height: 100%;
      cursor: pointer;
      transition: all 0.15s ease-out;
    }
    .active-shadow:hover {
      background: rgba(0, 0, 0, 0.04);
    }
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
