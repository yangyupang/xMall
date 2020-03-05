<template>
  <div class="xm-center">
    <div class="address-list">
      <div class="table-name">收货信息</div>
      <div class="address-box">
        <div
          class="address-each"
          v-for="(item,index) in addressList"
          :key="item.id"
          :class="index===defaultAdd?'defaultColor':''"
          @click="changeDefaultAdd(index)"
        >
          <div class="each-main">
            <div class="add-default" v-if="index===defaultAdd">
              <i class="iconfont icon-gou"></i>
            </div>
            <div>
              收货人：{{item.username}}
              <span v-if="item.isDefault">(默认地址)</span>
            </div>
            <div>手机号码：{{item.phone}}</div>
            <div>收货地址：{{item.address}}</div>
          </div>
          <div class="each-btn-group">
            <div @click="editAddress(item)">修改</div>
            <div @click="deleteAddress(item._id)">删除</div>
          </div>
        </div>
        <div class="address-each" @click="editAddress('')">
          <div class="each-add">
            <i class="iconfont icon-plus"></i>
            <div>使用新地址</div>
          </div>
        </div>
        <Modal v-model="flagAdd" width="360">
          <p slot="header" style="color:#f60;text-align:center">
            <span>{{addObj.addressId?'编辑收货地址':"新增收货地址"}}</span>
          </p>
          <div style="text-align:left">
            <Input v-model="addObj.name" placeholder="请输入收货人姓名" style="width: 300px;margin:10px;" />
            <Input v-model="addObj.tel" placeholder="请输入收货人电话" style="width: 300px;margin:10px;" />
            <Input v-model="addObj.add" placeholder="请输入收货详细地址" style="width: 300px;margin:10px;" />
            <Checkbox v-model="addObj.isDefault">设为默认</Checkbox>
          </div>
          <div slot="footer">
            <Button size="large" long :loading="loading" @click="saveAdd()">保存</Button>
          </div>
        </Modal>
      </div>
    </div>
    <div class="paylist">
      <div class="table-name">购物清单</div>
      <div v-if="payList.length>0">
        <div class="table-title">
          <div class="w70">商品信息</div>
          <div class="w10">单价</div>
          <div class="w10">数量</div>
          <div class="w10">小计</div>
        </div>
        <div v-for="row in payList" :key="row.id" class="flex Cart-each">
          <div class="goodinfo w70">
            <div class="goodinfo-img">
              <img :src="row.productImageBig" alt />
            </div>
            <div class="goodinfo-name">{{row.productName}}</div>
          </div>
          <div class="salePrice w10">￥{{row.salePrice.toFixed(2)}}</div>
          <div class="w10">
            <div class="steper">{{row.count}}</div>
          </div>
          <div class="sum w10">￥{{(row.count*row.salePrice).toFixed(2)}}</div>
        </div>
      </div>
      <div class="bottom-pay">
        <div class="flex">
          <div class="payable">
            应付总额:
            <span class="pay-num">￥{{checkedSum}}</span>
          </div>
          <Button type="primary" class="btn">提交订单</Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PayMent",
  props: {},
  data() {
    return {
      addressList: [],
      flagAdd: false,
      addObj: {
        name: "",
        add: "",
        tel: "",
        isDefault: false,
        addressId: null
      },
      loading: false,
      defaultAdd: 0
    };
  },
  computed: {
    payList() {
      let arr = this.$store.state.goodsList;
      return arr.filter(item => item.checked);
    },
    checkedSum() {
      let sum = 0;
      this.payList.map(item => {
        if (item.checked) {
          sum += item.count * item.salePrice;
        }
      });
      return sum;
    }
  },
  created() {},
  mounted() {
    this.getList();
  },
  watch: {
    flagAdd(flag) {
      if (!flag) {
        this.addObj = {};
      }
    }
  },
  methods: {
    getList() {
      this.$api.getList().then(res => {
        if (res.code === 200) {
          this.addressList = res.data;
          this.loading = false;
          this.flagAdd = false;
          res.data.map((item, index) => {
            if (item.isDefault) {
              this.defaultAdd = index;
            }
          });
        }
      });
    },
    editAddress(item) {
      if (item._id) {
        this.addObj = {
          name: item.username,
          tel: item.phone,
          add: item.address,
          isDefault: item.isDefault,
          addressId: item._id
        };
      }
      this.flagAdd = true;
    },
    saveAdd() {
      this.loading = true;
      console.log(this.addObj);
      if (this.addObj.addressId) {
        this.$api
          .editAddress(
            this.addObj.addressId,
            this.addObj.name,
            this.addObj.tel,
            this.addObj.add,
            this.addObj.isDefault
          )
          .then(res => {
            console.log(res);
            this.getList();
            this.addObj = {};
          });
      } else {
        this.$api
          .setAddAddress(
            this.addObj.name,
            this.addObj.tel,
            this.addObj.add,
            this.addObj.isDefault
          )
          .then(res => {
            this.addObj = {};
            this.getList();
          });
      }
    },
    changeDefaultAdd(index) {
      this.defaultAdd = index;
    },
    deleteAddress(id) {
      this.$api.deleteAddress(id).then(res => {
        if (res.code === 200) {
          this.getList();
        }
      });
    }
  },
  components: {}
};
</script>

<style scoped lang="scss">
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
.address-list,
.paylist {
  margin: 30px 0;
  border: 1px solid #d4d4d4;
  border-radius: 8px;
  overflow: hidden;
}
.address-box {
  overflow: hidden;
  background: white;
  display: flex;
  flex-wrap: wrap;
  padding: 20px 0;
}
.defaultColor {
  border: 1px solid rgb(106, 143, 229) !important;
  background: white !important;
}
.address-each {
  width: 276px;
  height: 158px;
  margin: 10px 14px;
  border: 1px solid #e5e5e5;
  border-radius: 3px;
  background: #fafafa;
  line-height: 14px;
  text-align: left;
  color: #626262;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  &:hover {
    background: #f1f1f1;
  }
  .each-main {
    padding: 19px 14px 0 19px;
    line-height: 26px;
    .add-default {
      position: absolute;
      top: 10px;
      right: 20px;
      .icon-gou {
        color: rgb(106, 143, 229);
      }
    }
  }
  .each-btn-group {
    position: absolute;
    display: flex;
    width: 100%;
    bottom: -30px;
    left: 0;
    background: white;
    div {
      &:hover {
        background: #fafafa;
      }
      height: 30px;
      width: 50%;
      border: 1px solid #e5e5e5;
      line-height: 30px;
      text-align: center;
    }
  }
  &:hover .each-btn-group {
    animation: upbtn 0.5s;
    @keyframes upbtn {
      to {
        bottom: 0;
      }
      from {
        bottom: -30px;
      }
    }
    bottom: 0;
  }

  .each-add {
    font-size: 16px;
    line-height: 20px;
    width: 80px;
    height: 50px;
    margin-left: -40px;
    margin-top: -25px;
    position: absolute;
    top: 50%;
    left: 50%;
    text-align: center;
  }
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
.w70 {
  width: 70%;
  padding-left: 30px;
}
.w10 {
  width: 10%;
  text-align: center;
}
.Cart-each {
  background: white;
  .salePrice,
  .sum {
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
.bottom-pay {
  border-radius: 0 0 8px 8px;
  height: 90px;
  width: 100%;
  background-position: 50%;
  background: #fdfdfd;
  background: linear-gradient(#fdfdfd, #f9f9f9);
  border-top: 1px solid #e9e9e9;
  box-shadow: 0 -3px 8px rgba(0, 0, 0, 0.04);
  .flex {
    float: right;
    height: 100%;
    padding: 20px 30px;
    line-height: 25px;
    .payable {
      color: #323232;
      font-size: 16px;
      line-height: 50px;
      padding: 0 20px;
      span {
        color: #d44d44;
        text-align: center;
        display: inline-block;
        width: 35px;
        font-weight: 800;
      }
    }
    .btn {
      width: 130px;
      height: 50px;
    }
  }
}
</style>
