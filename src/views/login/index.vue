<template>
  <div class="login-container">
    <van-nav-bar
      class="app-nav-bar"
      title="登录"
      left-arrow
      @click-left="$router.back()"
    />
    <van-cell-group>
      <van-field
        v-model="user.mobile"
        icon-prefix="newsapp"
        left-icon="mobile-phone"
        placeholder="请输入手机号码"
      />
      <van-field
        v-model="user.code"
        clearable
        icon-prefix="newsapp"
        left-icon="unlock"
        placeholder="请输入验证码"
      >
        <template #button>
          <van-button size="mini" round class="send-btn">发送验证码</van-button>
        </template>
      </van-field>
    </van-cell-group>
    <div class="login-btn-wrap">
      <van-button type="info" block class="login-btn" @click="onLogin"
        >信息按钮</van-button
      >
    </div>
  </div>
</template>

<script>
import { login } from "@/api/user";

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
    };
  },
  computed: {},
  watch: {},
  methods: {
    async onLogin() {
      try {
        const res = await login(this.user);
        console.log(res);
      } catch (error) {
        console.log(error);
      }
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
