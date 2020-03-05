<template>
  <div>
    <div>
      <div v-if="goodsList.length>0" class="goods">
        <div class="goods-box" :class="goodsList.length>5?'goods-more':''">
          <div class="good-each" v-for="item in goodsList" :key="item.id">
            <div class="each-left">
              <img :src="item.productImageBig" alt />
            </div>
            <div class="each-right">
              <div class="productName">
                <a href="javascript:0;" @click="$godetail(item.productId)">{{item.productName}}</a>
              </div>
              <div class="saleinfo">
                <span class="salePrice">￥{{item.salePrice.toFixed(2)}}</span>
                <span class="count">x {{item.count}}</span>
              </div>
            </div>
            <div class="each-del" @click.stop="delCart(item._id)">
              <i class="iconfont icon-shan_chu"></i>
            </div>
          </div>
        </div>
        <div class="goods-bottom">
          <div>
            <div class="saleNum">
              共
              <strong>{{cartNum}}</strong>件商品
            </div>
            <div class="total">
              合计：
              <span>￥{{cartSum}}</span>
            </div>
          </div>
          <div>
            <Button class="btn" type="primary" @click="goShopCart">去购物车</Button>
          </div>
        </div>
      </div>
      <div v-else class="empty">
        <i class="iconfont icon-gouwuche"></i>
        <div>您的购物车竟然是空的!</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "XmShopCart",
  props: {},
  data() {
    return {};
  },
  computed: {
    goodsList() {
      return this.$store.state.goodsList;
    },
    cartNum() {
      return this.$store.state.cartNum;
    },
    cartSum() {
      return this.$store.state.cartSum;
    }
  },
  created() {},
  mounted() {},
  watch: {},
  methods: {
    goShopCart() {
      if (this.$store.state.username !== "") {
        this.$router.push("/shopCart");
      } else {
        this.$router.push("/login");
      }
    },
    delCart(item) {
      this.$api.delCart(item).then(res => {
        console.log(res);
        if (res.code === 200) {
          this.$store.dispatch("getCart");
        }
      });
    }
  },
  components: {},
  filters: {}
};
</script>

<style scoped lang="scss">
.goods {
  .goods-box {
    max-height: 620px;
    .good-each {
      position: relative;
      height: 120px;
      display: flex;
      border-bottom: 1px solid #f0f0f0;
      .each-left {
        padding: 10px;
        img {
          height: 80px;
          width: 80px;
        }
      }
      .each-right {
        width: 205px;
        height: 80px;
        margin: 20px;
      }
      .productName {
        color: #000;
        width: 185px;
        overflow: hidden;
        word-break: keep-all;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-size: 14px;
        line-height: 16px;
        margin-bottom: 10px;
      }
      .saleinfo {
        .salePrice {
          color: #cacaca;
          margin-top: 20px;
          color: #d44d44;
          font-weight: 700;
          font-size: 16px;
        }
        .count {
          font-size: 12px;
          margin-left: 10px;
        }
      }

      &:hover .each-del {
        display: block;
      }
      .each-del {
        font-size: 16px;
        line-height: 16px;
        margin-top: -8px;
        display: none;
        position: absolute;
        right: 10px;
        top: 50%;
      }
    }
  }
  .goods-more {
    overflow: hidden;
    overflow-y: scroll;
  }
  .goods-bottom {
    border-top: 1px solid #f0f0f0;
    .saleNum {
      margin-bottom: 4px;
      line-height: 16px;
      font-size: 12px;
      color: #c1c1c1;
    }
    .total {
      line-height: 20px;
      font-size: 14px;
      color: #6f6f6f;
    }
    span {
      font-size: 18px;
      color: #de4037;
      display: inline-block;
      font-weight: 700;
    }
    padding: 20px;
    display: flex;
    justify-content: space-between;
  }
  .btn {
    width: 108px;
    height: 40px;
    border: 1px solid #5c81e3;
    border-radius: 4px;
    font-size: 12px;
    color: #fff;
    background-color: #678ee7;
    background-image: linear-gradient(180deg, #678ee7, #5078df);
  }
}
.empty {
  height: 310px;
  width: 100%;
  text-align: center;
  padding: 80px;
  .icon-gouwuche {
    font-size: 100px;
    line-height: 100px;
  }
}
</style>
