<template>
  <div class="xm-center">
    <div class="good-info">
      <div class="info-left">
        <div
          class="left-image"
          v-for="item in productList.productImageSmall"
          :key="item.id"
          @click="changeShowImg(item)"
          :class="item===ShowImg?'active':''"
        >
          <img :src="item" alt />
        </div>
      </div>
      <div class="info-center">
        <img :src="ShowImg" alt />
      </div>
      <div class="info-right">
        <div class="info-name">{{productList.productName}}</div>
        <div class="flex">
          <div class="info-sub">{{productList.subTitle}}</div>
          <div class="info-price">￥{{productList.salePrice}}</div>
        </div>
        <div class="getNum">
          <span>数量</span>
          <xm-steper :saleNum.sync="saleNum" />
        </div>
        <div class="btn-group">
          <Button class="btn" type="primary" @click="addCart(productList.productId)">加入购物车</Button>
          <Button class="btn" @click="buyNow()">现在购买</Button>
        </div>
      </div>
    </div>
    <div class="good-main">
      <div class="title">产品信息</div>
      <div v-html="productList.detail" class="good-detail"></div>
    </div>
  </div>
</template>

<script>
import xmSteper from "../components/common/XmSteper";
export default {
  name: "Detail",
  props: {},
  data() {
    return {
      productList: {},
      ShowImg: "",
      saleNum: 1,
      show: 0
    };
  },
  computed: {},
  created() {},
  mounted() {
    let id = this.$route.params.id;
    this.$api.searchId(id).then(res => {
      this.productList = res.data.result;
      this.ShowImg = this.productList.productImageBig;
      this.productList.salePrice = this.productList.salePrice.toFixed(2);
    });
  },
  watch: {},
  methods: {
    changeShowImg(item) {
      this.ShowImg = item;
    },

    addCart(productId) {
      this.$api.addCart(productId, this.saleNum).then(res => {
        if (res.code === 200) {
          this.$store.dispatch("getCart");
          this.$store.state.showCart = true;
        }
      });
    }
  },
  components: { xmSteper }
};
</script>

<style scoped lang="scss">
.good-info {
  display: flex;
  padding: 60px;
  margin: 20px 0;
  background: #fff;
  border-radius: 8px;
  border: 1px solid #dcdcdc;
  border-color: rgba(0, 0, 0, 0.14);
  box-shadow: 0 3px 8px -6px rgba(0, 0, 0, 0.1);
  .info-left {
    .left-image {
      width: 80px;
      height: 80px;
      border: 1px solid #f0f0f0;
      border-radius: 10px;
      margin: 8px 0;
      img {
        width: 54px;
        height: 54px;
        margin: 11px;
      }
    }
    .active {
      border: 3px solid rgba(0, 0, 0, 0.2);
      img {
        margin: 9px;
      }
    }
  }
  .info-center {
    margin-left: 20px;
    img {
      width: 440px;
      height: 440px;
    }
  }
  .info-right {
    width: 450px;
    padding: 8px 8px 18px 10px;
    .info-name {
      font-size: 24px;
      line-height: 1.25;
      color: #000;
      margin-bottom: 13px;
      font-weight: 400;
    }
    .flex {
      justify-content: space-between;
    }
    .info-sub {
      font-size: 14px;
      line-height: 1.5;
      color: #bdbdbd;
    }
    .info-price {
      padding-left: 2px;
      font-size: 24px;
      color: #d44d44;
      font-weight: 700;
    }
    .getNum {
      width: 100%;
      font-size: 14px;
      padding: 29px 0 8px 10px;
      border-top: 1px solid #ebebeb;
      display: flex;
      line-height: 36px;
      span {
        margin-right: 10px;
      }
    }
    .btn-group {
      border-top: 1px solid #ebebeb;
      padding: 30px 0 0 10px;
      .btn {
        width: 145px;
        height: 50px;
        line-height: 48px;
        margin-right: 20px;
      }
    }
  }
}
.good-main {
  border: 1px solid #d4d4d4;
  border-radius: 8px;
  overflow: hidden;
  margin: 20px auto 115px;
}
.title {
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
.good-detail {
  background: white;
  /deep/img {
    display: block;
    width: 100%;
  }
  /deep/span {
    margin-left: 2em;
  }
}
</style>
