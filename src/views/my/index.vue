<template>
  <div class="my-container">
    <van-cell-group v-if="user" class="my-info">
      <van-cell
        :border="false"
        class="base-info"
        title="单元格"
        value="内容"
        center
      >
        <van-image
          class="avatar"
          slot="icon"
          round
          fit="cover"
          src="https://img01.yzcdn.cn/vant/cat.jpeg"
        />
        <div class="name" slot="title">{{ user }}</div>
        <van-button class="update-btn" size="small" round>编辑资料</van-button>
      </van-cell>
      <van-grid class="data-info" :border="false">
        <van-grid-item class="data-info-item">
          <div class="text-wrap" slot="text">
            <div class="count">123</div>
            <div class="text">帖子</div>
          </div>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <div class="text-wrap" slot="text">
            <div class="count">123</div>
            <div class="text">关注</div>
          </div>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <div class="text-wrap" slot="text">
            <div class="count">123</div>
            <div class="text">粉丝</div>
          </div>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <div class="text-wrap" slot="text">
            <div class="count">123</div>
            <div class="text">获赞</div>
          </div>
        </van-grid-item>
      </van-grid>
    </van-cell-group>
    <div v-else class="not-login">
      <div>
        <van-image
          class="avatar"
          slot="icon"
          round
          fit="cover"
          src="https://img01.yzcdn.cn/vant/cat.jpeg"
        />
      </div>

      <div @click="$router.push('./login')" class="text">登录 / 注册</div>
    </div>
    <van-grid class="nav-grid mb-4" :column-num="2">
      <van-grid-item
        class="nav-grid-item"
        icon-prefix="newsapp"
        icon="shoucang"
        text="收藏"
      />
      <van-grid-item
        class="nav-grid-item"
        icon-prefix="newsapp"
        icon="lishi"
        text="历史"
      />
    </van-grid>
    <van-cell title="选项1" is-link to="/" />
    <van-cell class="mb-4" title="选项2" is-link to="/" />
    <van-cell
      v-if="user"
      class="logout-cell"
      title="退出登录"
      @click="onLogout"
    />
  </div>
</template>

<script>
//import { mapState } from "vuex";

export default {
  name: "my",
  components: {},
  props: {},
  data() {
    return {};
  },
  computed: {
    user() {
      return this.$store.state.login.user;
    },
  },
  watch: {},
  methods: {
    onLogout() {
      this.$dialog
        .confirm({
          title: "温馨提示",
          message: "确定要退出吗？",
        })
        .then(() => {
          this.$store.commit("setUser", null);
        })
        .catch(() => {});
    },
  },
  created() {},
  mounted() {
    // var that = this;
    // console.log(that.$store.state.login.user);
    // console.log(that.user);
  },
  beforeCreate() {},
  beforeMount() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
  activated() {},
};
</script>
<style lang="less" scoped>
.my-container {
  .my-info {
    // background: url("") no-repeat;
    background-size: cover;
    background-image: linear-gradient(
      rgb(82, 209, 226),
      rgb(54, 103, 122)
    ) !important;
    .base-info {
      box-sizing: border-box;
      height: 115px;
      background-color: unset;
      padding-top: 38px;
      padding-bottom: 11px;
      .avatar {
        box-sizing: border-box;
        border: 1px solid #fff;
        width: 66px;
        height: 66px;
        margin-right: 11px;
      }
      .name {
        font-size: 15px;
        color: #fff;
      }
      .update-btn {
        height: 16px;
        font-size: 10px;
        color: #666666;
      }
    }
    .data-info {
      .data-info-item {
        height: 65px;
        color: #fff;
        .text-wrap {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          .count {
            font-size: 18px;
          }
          .text {
            font-size: 11px;
          }
        }
      }
    }
    /deep/ .van-grid-item__content {
      background-color: unset;
    }
  }

  .not-login {
    height: 180px;
    background-image: linear-gradient(rgb(82, 209, 226), rgb(54, 103, 122));
    background-size: cover;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .avatar {
      width: 66px;
      height: 66px;
    }
    .text {
      font-size: 14px;
      color: #fff;
    }
  }

  /deep/ .nav-grid {
    .nav-grid-item {
      height: 70px;
      .newsapp {
        font-size: 30px;
      }
      .newsapp-lishi {
        color: #ff9d1d;
      }
      .newsapp-shoucang {
        color: #eb5253;
      }
      .van-grid-item__text {
        font-size: 14px;
        color: #333333;
      }
    }
  }

  .logout-cell {
    text-align: center;
    color: #d86262;
  }

  .mb-4 {
    margin-bottom: 4px;
  }
}
</style>
