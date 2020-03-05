<template>
  <div class="register-container">
    <div class="register-box">
      <div class="title">注册 XMall 账号</div>
      <div class="register-input">
        <Input v-model="username" placeholder="账号" style="width: 350px" @on-change="changeData" />
      </div>
      <div class="register-input">
        <Input
          v-model="passwd"
          @on-change="changeData"
          type="password"
          password
          placeholder="密码"
          style="width: 350px"
        />
      </div>
      <div class="register-input">
        <Input
          v-model="repasswd"
          @on-change="changeData"
          type="password"
          password
          placeholder="重复密码"
          style="width: 350px"
        />
      </div>
      <div
        id="vaptchaContainer"
        style="width: 350px;height: 40px;margin: 20px auto;margin-top: 20px;"
      >
        <!--vaptcha-container是用来引入VAPTCHA的容器，下面代码为预加载动画，仅供参考-->
        <div class="vaptcha-init-main">
          <div class="vaptcha-init-loading">
            <a href="/" target="_blank">
              <img src="https://r.vaptcha.com/public/img/vaptcha-loading.gif" />
            </a>
            <span class="vaptcha-text">Vaptcha启动中...</span>
          </div>
        </div>
      </div>
      <div class="register-input">
        <Checkbox v-model="checked" @on-change="changeData">
          <span>我已阅读并同意遵守</span>
          <a href>法律声明</a>和
          <a href>隐私条款</a>
        </Checkbox>
      </div>
      <div class="btn-box">
        <Button class="btn" :class="flag?'submit':'not-allowed'" @click="submit">注册</Button>
      </div>
      <div class="register-bottom">
        如果您已拥有 XMall 账号，则可在此
        <a href="/login">登录</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "register",
  props: {},
  data() {
    return {
      username: "",
      passwd: "",
      repasswd: "",
      checked: false,
      checkVaptcha: false,
      flag: false
    };
  },
  computed: {},
  created() {},
  mounted() {
    let _this = this;
    this.vaptcha(_this);
  },
  watch: {},
  methods: {
    //创建验证实例
    vaptcha(_this) {
      var token = "";
      vaptcha({
        vid: "5e34c85a76cb1970819ea9b8",
        type: "click", // 展现类型 点击式
        container: "#vaptchaContainer", // 按钮容器，可为Element 或者 selector
        offline_server: "/offline"
        // mode: 'offline' 调试离线模式时使用
      }).then(function(vaptchaObj) {
        vaptchaObj.render(); // 调用验证实例 vaptchaObj 的 render 方法加载验证按钮
        vaptchaObj.listen("pass", function() {
          token = vaptchaObj.getToken();
          _this.checkVaptcha = true;
          _this.changeData();
        });
        $("#reset").on("click", function() {
          vaptchaObj.reset();
          $("#result").html("请验证..");
        });
      });
      $("#validate").on("click", function() {
        $.post(
          "/validate",
          {
            token: token
          },
          function(res) {
            if (res.success == 1) {
              $("#result").html("验证成功");
            } else {
              $("#result").html("验证失败");
            }
          },
          "json"
        );
      });
    },
    changeData() {
      if (
        this.username !== "" &&
        this.passwd !== "" &&
        this.repasswd !== "" &&
        this.checked &&
        this.checkVaptcha
      ) {
        this.flag = true;
      } else {
        this.flag = false;
      }
    },
    //提交
    submit() {
      if (this.flag) {
        let userCheck = /^[a-zA-Z0-9_-]{4,16}$/;
        let passCheck = /^[a-zA-Z0-9_-]{4,16}$/;
        if (!userCheck.test(this.username)) {
          this.$Message.error(
            "用户名错误，4到16位（字母，数字，下划线，减号）"
          );
          return;
        }
        if (!passCheck.test(this.passwd)) {
          this.$Message.error(
            "密码错误，最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符"
          );
          return;
        }
        if (this.repasswd !== this.passwd) {
          this.$Message.error("两次密码不相同");
          return;
        }
        this.$api.register(this.username, this.passwd).then(res => {
          if (res.code === 200) {
            this.$Message.success(res.msg);
            this.$router.push("/login");
          } else {
            this.$Message.error(res.msg);
          }
        });
      } else {
        this.$Message.warning("请补全信息再点击注册");
      }
    }
  },
  components: {}
};
</script>

<style scoped lang="scss">
.register-container {
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url("../assets/login-bg.png");
}
.register-box {
  overflow: hidden;
  width: 450px;
  margin: 100px auto;
  background: white;
  border-bottom: 1px solid #dcdcdc;
  border-radius: 10px;
  box-shadow: 0 9px 30px -6px rgba(0, 0, 0, 0.2),
    0 18px 20px -10px rgba(0, 0, 0, 0.04), 0 18px 20px -10px rgba(0, 0, 0, 0.04),
    0 10px 20px -10px rgba(0, 0, 0, 0.04);
}
.title {
  padding: 0;
  text-align: center;
  color: #666;
  border-bottom: 1px solid #dcdcdc;
  box-shadow: none;
  font-weight: 700;
  font-size: 20px;
  height: 60px;
  line-height: 60px;
}
.register-input {
  margin: 20px auto;
  width: 350px;
  color: rgb(153, 153, 153);
  /deep/input {
    height: 50px;
    border-radius: 8px;
  }
  /deep/.ivu-icon {
    font-size: 22px;
    line-height: 50px;
  }
}
.btn-box {
  width: 350px;
  height: 50px;
  margin: 20px auto;
  border-bottom: 1px solid #dcdcdc;
}
.btn {
  font-size: 18px;
  width: 350px;
  height: 50px;
  border-radius: 4px;
  color: #fff;
}
.not-allowed {
  cursor: not-allowed;
  border: 1px solid #afafaf;
  background-color: #a9a9a9;
  background-image: linear-gradient(180deg, #b8b8b8, #a9a9a9);
}
.submit {
  cursor: pointer;
  background-color: #678ee7;
}
.register-bottom {
  width: 350px;
  height: 40px;
  margin: 0 auto 40px;
  padding: 20px;
  border-top: 1px solid #dcdcdc;
  color: rgb(153, 153, 153);
  font-size: 14px;
  text-align: center;
}
</style>
