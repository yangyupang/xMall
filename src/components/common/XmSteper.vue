<template>
  <div class="steper-container">
    <i
      class="iconfont icon-jian"
      :class="saleNum===1?'not-allowed':'pointer'"
      @click="changeNum('down')"
      onselectstart="return false;"
    ></i>
    <div class="num-input">
      <input type="text" :value="saleNum" @change="changeInput" maxlength="2" v-if="!show" />
      <ul :class="show>0?'showUp':show<0?'showDown':''" class="num-show">
        <li v-for="num in 3" :key="num.id">{{Number(saleNum)+num-2}}</li>
      </ul>
    </div>
    <i
      class="iconfont icon-plus"
      :class="saleNum===100?'not-allowed':'pointer'"
      @click="changeNum('up')"
      onselectstart="return false;"
    ></i>
  </div>
</template>

<script>
export default {
  name: "XmSteper",
  props: {
    saleNum: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      show: 0
    };
  },
  computed: {},
  created() {},
  mounted() {},
  watch: {},
  methods: {
    changeNum(item) {
      let saleNum = this.saleNum;
      if (item === "up" && saleNum < 100) {
        this.show = 1;
        setTimeout(() => {
          this.$emit("update:saleNum", saleNum + 1);
          this.$emit("editCart");
          this.show = 0;
        }, 200);
      }
      if (item === "down" && saleNum > 1) {
        this.show = -1;
        setTimeout(() => {
          this.$emit("update:saleNum", saleNum - 1);
          this.$emit("editCart");
          this.show = 0;
        }, 200);
      }
    },
    changeInput(e) {
      this.$emit("update:saleNum", Number(e.target.value));
      this.$emit("editCart");
    }
  },
  components: {},
  filters: {}
};
</script>

<style scoped lang="scss">
.steper-container {
  display: flex;
  width: 80px;
}
.not-allowed {
  cursor: not-allowed;
}
.pointer {
  cursor: pointer;
}
span {
  padding-right: 20px;
  color: #8d8d8d;
}
.num-input {
  position: relative;
  overflow: hidden;
  width: 40px;
  margin: 1px;
  input {
    position: absolute;
    text-align: center;
    width: 40px;
    background: none;
    outline: none;
    border: none;
    color: #686767;
    z-index: 2;
    left: 0;
    top: 0;
  }
  .num-show {
    width: 40px;
    line-height: 36px;
    position: absolute;
    text-align: center;
    left: 0;
    top: -36px;
    opacity: 0;
  }
  .showUp {
    animation: up 0.2s;
  }
  @keyframes up {
    from {
      transform: translateY(0);
      opacity: 1;
    }
    to {
      opacity: 1;
      transform: translateY(-36px);
    }
  }
  .showDown {
    animation: down 0.2s;
  }
  @keyframes down {
    from {
      transform: translateY(0);
      opacity: 1;
    }
    to {
      transform: translateY(36px);
      opacity: 1;
    }
  }
}
</style>
