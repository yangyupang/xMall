<template>
  <div class="shopCart-container xm-center">
    <div>
      <div class="table-name">购物清单</div>
      <div v-if="goodsList.length>0">
        <div class="table-title">
          <div class="w60">商品信息</div>
          <div class="w10">单价</div>
          <div class="w10">数量</div>
          <div class="w10">小计</div>
          <div class="w10">操作</div>
        </div>
        <div v-for="row in goodsList" :key="row.id" class="flex Cart-each">
          <div class="goodinfo w60">
            <div class="check">
              <Checkbox v-model="row.checked" @on-change="changeOne(row)"></Checkbox>
            </div>
            <div class="goodinfo-img">
              <img :src="row.productImageBig" alt />
            </div>
            <div class="goodinfo-name">{{row.productName}}</div>
          </div>
          <div class="salePrice w10">￥{{row.salePrice.toFixed(2)}}</div>
          <div class="w10">
            <div class="steper">
              <xm-steper :saleNum.sync="row.count" @editCart="editCart(row)" />
            </div>
          </div>
          <div class="sum w10">￥{{(row.count*row.salePrice).toFixed(2)}}</div>
          <div class="del w10" @click="delCart(row._id)">
            <i class="iconfont icon-shan_chu"></i>
          </div>
        </div>
        <div class="table-bottom">
          <div class="bottom-left">
            <Checkbox v-model="checkAll" @on-change="changeAll">全选</Checkbox>
            <span @click="delChecked">删除选中的商品</span>
          </div>
          <div class="bottom-right">
            <div class="right-carNum">
              <div class="carNum-check">
                已选择
                <span>{{checkedNum}}</span>件商品
              </div>
              <div class="carNum-all">
                共计
                <span>{{$store.state.cartNum}}</span>件商品
              </div>
            </div>
            <div class="right-pay">
              <div class="payable">
                应付总额:
                <span class="pay-num">￥{{checkedSum}}</span>
              </div>
              <div class="pay-msg">应付总额不含运费</div>
            </div>
            <div>
              <Button type="primary" class="btn" @click="goPayMent()">现在结算</Button>
            </div>
          </div>
        </div>
      </div>
      <div class="cart-empty" v-else>
        <img src="../assets/cart-empty.png" alt />
        <div class="empty-msg">你的购物车空空如也</div>
        <Button @click="$router.push('/goods')">现在购物</Button>
      </div>
    </div>
  </div>
</template>

<script>
import xmSteper from "../components/common/XmSteper";
export default {
  name: "ShopMent",
  props: {},
  data() {
    return {
      checkAll: true
    };
  },
  computed: {
    goodsList() {
      return this.$store.state.goodsList;
    },
    checkedNum() {
      let sum = 0;
      this.goodsList.map(item => {
        if (item.checked) {
          sum += item.count;
        }
      });
      return sum;
    },
    checkedSum() {
      let sum = 0;
      this.goodsList.map(item => {
        if (item.checked) {
          sum += item.count * item.salePrice;
        }
      });
      return sum;
    }
  },
  created() {},
  mounted() {},
  watch: {},
  methods: {
    editCart(item) {
      this.$api.editCart(item._id, item.count).then(res => {
        if (res.code === 200) {
          this.$store.dispatch("getCart");
        }
      });
    },
    delCart(item) {
      this.$api.delCart(item).then(res => {
        console.log(res);
        if (res.code === 200) {
          this.$store.dispatch("getCart");
        }
      });
    },
    changeAll(flag) {
      console.log(flag);
      this.$store.state.goodsList.map(item => {
        item.checked = flag;
      });
      console.log(this.$store.state.goodsList);
    },
    changeOne(row) {
      this.$store.state.goodsList.map(item => {
        if (row._id === item._id) {
          item.checked = row.checked;
        }
      });
      this.checkAll = this.goodsList.every(item => item.checked);
    },
    delChecked() {
      this.$store.state.goodsList.map(item => {
        if (item.checked) {
          this.$api.delCart(item._id).then(res => {
            if (res.code === 200) {
              this.$store.dispatch("getCart");
            }
          });
        }
      });
    },
    goPayMent() {
      this.$router.push("/payMent");
    }
  },
  components: {
    xmSteper
  }
};
</script>

<style scoped lang="scss">
.shopCart-container {
  margin: 30px auto;
  border: 1px solid #d4d4d4;
  border-radius: 8px;
  overflow: hidden;
  .table-name {
    position: relative;
    height: 60px;
    padding: 0 10px 0 24px;
    border-bottom: 1px solid #d4d4d4;
    border-radius: 8px 8px 0 0;
    box-shadow: 0 1px 7px rgba(0, 0, 0, 0.06);
    background: #f3f3f3;
    background: linear-gradient(#fbfbfb, #ececec);
    line-height: 60px;
    font-size: 18px;
    color: #333;
  }
  .table-title {
    display: flex;
    background: #eee;
    border-bottom: 1px solid #dbdbdb;
    border-bottom-color: rgba(0, 0, 0, 0.08);
    line-height: 38px;
    height: 38px;
    font-size: 12px;
  }
  .w60 {
    width: 60%;
    padding-left: 30px;
  }
  .w10 {
    width: 10%;
    text-align: center;
  }
  .Cart-each {
    background: white;
    .salePrice,
    .sum,
    .del {
      font-size: 14px;
      height: 21px;
      margin: 41px 0;
    }
    .sum {
      font-weight: 800;
    }
    .steper {
      width: 80px;
      overflow: hidden;
      height: 21px;
      margin: 41px auto;
    }
  }
  .goodinfo {
    display: flex;
    margin: 10px 0;
    .check {
      margin: 31px 0;
    }
    .goodinfo-img {
      margin: 0 10px;
      width: 80px;
      height: 80px;
      border-radius: 3px;
      border: 0 solid hsla(0, 0%, 100%, 0.1);
      box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.06);
    }
    img {
      width: 80px;
    }
    .goodinfo-name {
      line-height: 18px;
      margin: 31px 20px;
      color: #333;
      font-size: 16px;
    }
  }
  .icon-shan_chu {
    cursor: pointer;
  }
  .table-bottom {
    border-radius: 0 0 8px 8px;
    height: 90px;
    width: 100%;
    background-position: 50%;
    background: #fdfdfd;
    background: linear-gradient(#fdfdfd, #f9f9f9);
    border-top: 1px solid #e9e9e9;
    box-shadow: 0 -3px 8px rgba(0, 0, 0, 0.04);
    display: flex;
    justify-content: space-between;
    .bottom-left {
      height: 22px;
      padding: 34px 19px;
      span {
        margin-left: 21px;
        color: #bbb;
        cursor: pointer;
      }
    }
    .bottom-right {
      display: flex;
      padding: 20px 30px;
      line-height: 25px;
      .right-carNum {
        padding: 0 15px;
        border-right: 1px solid gray;
        text-align: right;
        .carNum-check {
          color: #323232;
          font-size: 16px;
          span {
            color: #d44d44;
            text-align: center;
            display: inline-block;
            width: 35px;
          }
        }
        .carNum-all {
          font-size: 14px;
          color: #959595;
          span {
            text-align: center;
            display: inline-block;
            width: 35px;
          }
        }
      }
      .right-pay {
        padding: 0 15px;
        .payable {
          color: #323232;
          font-size: 16px;
        }
        .pay-num {
          color: #d44d44;
          text-align: center;
          display: inline-block;
          font-weight: 700;
          font-size: 18px;
        }
        .pay-msg {
          font-size: 14px;
          color: #959595;
        }
      }
      .btn {
        width: 130px;
        height: 50px;
      }
    }
  }
  .cart-empty {
    text-align: center;
    background: white;
    img {
      margin: 30px 0 10px;
    }
    .empty-msg {
      text-align: center;
      padding: 20px;
      color: rgb(141, 141, 141);
    }
    button {
      width: 150px;
      height: 40px;
      line-height: 38px;
      color: rgb(141, 141, 141);
      margin: 10px 0 30px;
    }
  }
}
</style>
