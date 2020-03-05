<template>
  <div>
    <xm-carousel :panelContents="data[0].panelContents" />
    <xm-active :activeList="data[1].panelContents" />
    <xm-hotProduct :hotProductsList="data[2].panelContents" :hotTitle="data[2].name" />
    <div v-for="(item,index) in 3" :key="item.id">
      <xm-products :list="data[index+3].panelContents" :title="data[index+3].name" />
    </div>
    <xm-active :activeList="data[6].panelContents" />
  </div>
</template>

<script>
import xmCarousel from "../components/index/XmCarousel";
import xmActive from "../components/index/XmActive";
import xmHotProduct from "../components/index/XmHotProduct";
import xmProducts from "../components/index/XmProducts";
export default {
  name: "Index",
  props: {},
  data() {
    return {
      data: [{}, {}, {}, {}, {}, {}, {}]
    };
  },
  computed: {},
  created() {},
  mounted() {
    this.getHomeData();
  },
  watch: {},
  methods: {
    getHomeData() {
      this.$api.getHome().then(res => {
        if (res.code === 200) {
          this.data = res.data;
          console.log(res.data);
        }
      });
    }
  },
  components: {
    xmCarousel,
    xmActive,
    xmHotProduct,
    xmProducts
  }
};
</script>

<style scoped lang="scss">
</style>
