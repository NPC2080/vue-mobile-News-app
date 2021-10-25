<template>
  <div class="login-container">
    <van-nav-bar
      class="app-nav-bar"
      title="登录"
      left-arrow
      @click-left="$router.back()"
    />
    <van-form
      ref="login-form"
      @submit="onLogin"
      @failed="onFailed"
      :show-error="false"
      :show-error-message="false"
      validate-first
    >
      <van-field
        v-model="user.mobile"
        name="mobile"
        icon-prefix="newsapp"
        left-icon="mobile-phone"
        center
        placeholder="请输入手机号码"
        :rules="formRules.mobile"
      />
      <van-field
        v-model="user.code"
        name="code"
        clearable
        icon-prefix="newsapp"
        left-icon="unlock"
        center
        placeholder="请输入验证码"
        :rules="formRules.code"
      >
        <template #button>
          <van-count-down
            v-if="isCountDownShow"
            :time="60 * 1000"
            format="ss s"
            @finish="isCountDownShow = false"
          />
          <van-button
            v-else
            @click.prevent="onSendSMS"
            size="mini"
            round
            class="send-btn"
            :loading="isSendSMSLoading"
            >发送验证码</van-button
          >
        </template>
      </van-field>
      <div class="login-btn-wrap">
        <van-button type="info" block class="login-btn">登录</van-button>
      </div>
    </van-form>
    <van-divider>测试用手机号13880600111，验证码123456</van-divider>
  </div>
</template>

<script>
import { login, sendSMS } from "@/api/user";

export default {
  name: "login",
  components: {},
  props: {},
  data() {
    return {
      user: {
        mobile: "",
        code: "",
      },
      formRules: {
        mobile: [
          { required: true, message: "请填写用户名" },
          { pattern: /^1[3|5|7|8|9]\d{9}$/, message: "手机号格式错误" },
        ],
        code: [
          { required: true, message: "请填写验证码" },
          { pattern: /^\d{6}$/, message: "验证码格式错误" },
        ],
      },
      isCountDownShow: false,
      isSendSMSLoading: false,
    };
  },
  computed: {},
  watch: {},
  methods: {
    async onLogin() {
      this.$toast.loading({
        duration: 0,
        message: "登录中...",
        forbidClick: true, //loading期间禁用点击
      });
      console.log(login);
      // try {
      //   const res = await login(this.user);
      //   console.log(res);
      //   this.$toast.success("登录成功");
      // } catch (error) {
      //   this.$toast.fail("登录失败");
      // }

      this.$toast.success("登录成功");
      this.$store.commit("setUser", "XiaoMing");
      console.log(this.$store.state.login);
      this.$router.push("/");
    },
    onFailed(error) {
      if (error.errors[0]) {
        this.$toast({
          message: error.errors[0].message,
          position: "top",
        });
      }
    },
    async onSendSMS() {
      try {
        const data = await this.$refs["login-form"].validate("mobile");

        //验证通过，发送验证码
        this.isSendSMSLoading = true; //loading状态，防止多次发送
        const res = await sendSMS(this.user.mobile);
        console.log(data, res);
        this.isCountDownShow = true;
      } catch (error) {
        let message = "";
        console.log(message);
        if (error && error.response && error.response.status === 429) {
          message = "频繁发送，请稍后再试";
        } else if (error.name === "mobile") {
          message = error.message;
        } else {
          message = "发送失败，请稍后再试";
        }
        this.$toast({
          message: error.message,
          position: "top",
        });
      }

      this.isSendSMSLoading = false;
    },
  },
  created() {},
  mounted() {},
  beforeCreate() {},
  beforeMount() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
  activated() {},
};
</script>
<style scoped lang="less">
.login-container {
  .send-btn {
    width: 76px;
    height: 23px;
    background-color: #ededed;
    .van-button__test {
      font-size: 11px;
      color: #666666;
    }
  }
  .login-btn-wrap {
    padding: 26px 16px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
      .van-button__text {
        font-size: 15px;
      }
    }
  }
}
</style>
