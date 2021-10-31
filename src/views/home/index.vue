<template>
  <div class="home-container">
    <!-- 搜索框导航栏 -->
    <van-nav-bar class="app-nav-bar">
      <van-button
        class="search-btn"
        slot="title"
        icon="search"
        round
        type="info"
        size="small"
        to="/search"
        >搜索</van-button
      >
    </van-nav-bar>

    <!-- 文章频道列表 -->
    <van-tabs class="channel-tabs" v-model="active">
      <van-tab
        v-for="channel in channels"
        :title="channel.name"
        :key="channel.id"
      >
        <article-list :channel="channel" />
      </van-tab>

      <!-- 占位元素 -->
      <div class="wap-nav-placeholder" slot="nav-right"></div>
      <div
        slot="nav-right"
        class="wap-nav-wrap"
        @click="isChannelEditShow = true"
      >
        <van-icon name="wap-nav" />
      </div>
    </van-tabs>

    <!-- 频道编辑模块 -->
    <van-popup
      v-model="isChannelEditShow"
      position="top"
      closeable
      close-icon-position="top-left"
      class="channel-edit-popup"
      get-container="body"
    >
      <channel-edit
        @update-active="onUpdateActive"
        @close="isChannelEditShow = false"
        :user-channels="channels"
        :active="active"
      />
    </van-popup>
  </div>
</template>

<script>
import { getUserChannels } from "@/api/user";
import ArticleList from "./components/article-list.vue";
import ChannelEdit from "./components/channel-edit.vue";
// import { getItem } from "@/utils/storage";

export default {
  name: "Home",
  components: { ArticleList, ChannelEdit },
  props: {},
  data() {
    return {
      active: 0,
      channels: [],
      isChannelEditShow: false,
    };
  },
  computed: {
    user() {
      return this.$store.state.login.user;
    },
  },
  watch: {},
  methods: {
    async loadChannels() {
      // let channels=[]
      // if (this.user) {
      //   // 已登录，直接获取线上用户数据
      //   const { data } = await getUserChannels();
      //   channels = data;
      // } else {
      //   // 没有登录，判断是否有本地存储数据
      //   const loaclChannels=getItem('user-channels')
      //   // 若有，直接获取
      //   if(loaclChannels) {
      //     channels=loaclChannels
      //   } else {
      //     // 获取默认推荐
      //   }
      // }
      // this.channels = channels;

      const { data } = await getUserChannels();
      this.channels = data;
    },

    onUpdateActive(index) {
      this.active = index;
    },
  },
  created() {
    this.loadChannels();
  },
  mounted() {},
  activated() {},
};
</script>
<style scoped lang="less">
.home-container {
  /deep/ .van-nav-bar__title {
    max-width: none;
  }

  .search-btn {
    width: 277px;
    height: 32px;
    background: #5babfb;
    border: none;
    .van-icon {
      font-size: 16px;
    }
    .van-button__txt {
      font-size: 14px;
    }
  }

  .channel-tabs {
    /deep/ .van-tab {
      border-right: 1px solid #edeff3;
      border-bottom: 1px solid #edeff3;
    }
    /deep/ .van-tabs__line {
      width: 15px !important;
      height: 3px;
      background: #3296fa;
      bottom: 20px;
    }
  }

  .wap-nav-placeholder {
    width: 33px;
    flex-shrink: 0;
  }

  .wap-nav-wrap {
    position: fixed;
    right: 0;
    width: 33px;
    height: 43px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    opacity: 0.9;
    .van-icon {
      font-style: 24px;
    }
    &:before {
      content: "";
      width: 1px;
      height: 29px;
      background: linear-gradient(#fff, #fff);
      background-size: contain;
      position: absolute;
      left: 0;
      top: 0;
    }
  }
}

.channel-edit-popup {
  height: 100%;
}
</style>
