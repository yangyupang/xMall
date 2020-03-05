<template>
  <div class="container">
    <Modal v-model="flag" title="长时间未操作" @on-ok="asyncOK">
      <p>由于您5分钟未操作，先已清除您的登录状态，点击确定重新登录</p>
    </Modal>
    <xm-header />
    <router-view />
    <xm-footer class="footer" />
  </div>
</template>

<script>
import xmHeader from "../components/common/XmHeader";
import xmFooter from "../components/common/XmFooter";
export default {
  props: {},
  data() {
    return {
      flag: false
    };
  },
  components: {
    xmHeader,
    xmFooter
  },
  methods: {
    //判断是否10分钟未点击，如果未点击则
    check() {
      var lastTime = new Date().getTime();
      var currentTime = new Date().getTime();
      var timeOut = 5 * 60 * 1000; //设置超时时间： 30分
      let _this = this;
      function checkTimeout() {
        currentTime = new Date().getTime(); //更新当前时间
        lastTime = localStorage.getItem("lastTime");
        console.log(currentTime - lastTime);
        console.log(timeOut);
        if (currentTime - lastTime > timeOut) {
          //判断是否超时，超时则清理登录状态
          console.log("超时");
          localStorage.removeItem("username");
          _this.$store.state.username = "";
          _this.flag = true;

          clearInterval(timer);
        }
      }
      /* 定时器 间隔30秒检测是否长时间未操作页面 */
      let timer = setInterval(checkTimeout, 30000);
    },
    asyncOK() {
      this.$router.push("/login");
    }
  },
  mounted() {
    if (localStorage.getItem("username")) {
      //当username存在时创建点击事件监听
      window.addEventListener("mousedown", e => {
        let lastTime = new Date().getTime();
        localStorage.setItem("lastTime", lastTime);
      });
      this.$store.state.username = localStorage.getItem("username");
      this.check();
    }
    this.$store.dispatch("getCart");
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.container {
  background: #ededed;
}
.footer {
  border-top: 1px solid #e6e6e6;
  background: #fafafa;
}
</style>