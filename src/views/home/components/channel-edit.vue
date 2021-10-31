<template>
  <div class="channel-edit">
    <van-cell center :border="false">
      <div slot="title" class="channel-title">我的频道</div>
      <van-button
        @click="isEdit = !isEdit"
        type="danger"
        plain
        round
        size="mini"
        >{{ isEdit ? "完成" : "编辑" }}</van-button
      >
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item
        :icon="isEdit && index !== 0 ? 'clear' : ''"
        class="grid-item"
        :class="{ active: index === active }"
        v-for="(channel, index) in userChannels"
        :key="index"
        :text="channel.name"
        @click="onUserChannelClick(channel, index)"
      ></van-grid-item>
    </van-grid>

    <van-cell center :border="false">
      <div slot="title" class="channel-title">频道推荐</div>
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item
        class="grid-item"
        v-for="(channel, index) in recommendChannels"
        :key="index"
        :text="channel.name"
        @click="onAdd(channel)"
      ></van-grid-item>
    </van-grid>
  </div>
</template>

<script>
import { getAllChannels } from "@/api/channel";
// import { deleteUserChannels, addUserChannels, getAllChannels } from "@/api/channel";
// import { mapState } from "vuex";
// import { setItem } from "@/utils/storage";

export default {
  name: "ChannelEdit",
  components: {},
  props: {
    userChannels: {
      type: Array,
      required: true,
    },
    active: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      isEdit: false,
      allChannels: [],
    };
  },
  computed: {
    recommendChannels() {
      // 返回满足条件的数组
      return this.allChannels.filter((channel) => {
        // filter根据返回的布尔值决定是否放进数组
        return !this.userChannels.find((userChannel) => {
          // 查找满足该条件的元素并返回
          return userChannel.id === channel.id;
        });
      });
    },
    user() {
      return this.$store.state.login.user;
    },
    // ...mapState(["user"]),
  },
  methods: {
    async loadAllChannels() {
      const { data } = await getAllChannels();
      this.allChannels = data;
    },

    async onAdd(channel) {
      this.userChannels.push(channel);

      // // 数据持久化
      // if (this.user) {
      //   await addUserChannels({
      //     channels: [
      //       {
      //         id: channel.id,
      //         seq: this.userChannels.length,
      //       },
      //     ],
      //   });
      // } else {
      //   // 未登录，保存数据到本地
      //   setItem("user-channels", this.userChannels);
      // }
    },

    onUserChannelClick(channel, index) {
      if (this.isEdit && index !== 0) {
        this.deleteChannel(index);
      } else {
        this.switchChannel(index);
      }
    },

    async deleteChannel(index) {
      //若删除激活频道之前的频道
      if (index <= this.active) {
        this.$emit("update-active", this.active - 1);
      }
      this.userChannels.splice(index, 1);

      // //数据持久化
      // if (this.user) {
      //   await deleteUserChannels(channel.id);
      // } else {
      //   setItem("user-channels", this.userChannels);
      // }
    },

    switchChannel(index) {
      this.$emit("update-active", index);

      this.$emit("close");
    },
  },
  created() {
    this.loadAllChannels();
  },
};
</script>
<style scoped lang="less">
.channel-edit {
  padding-top: 54px;
  .channel-title {
    font-style: 16px;
    color: #333333;
  }
  .grid-item {
    width: 80px;
    height: 43px;
    /deep/ .van-grid-item__content {
      background-color: #f4f5f6;
      .van-grid-item__text {
        font-style: 14px;
        color: #222;
        margin-top: 0;
      }
    }
    /deep/ .van-grid-item__icon {
      position: absolute;
      right: -5px;
      top: -5px;
      font-size: 16px;
      color: #ccc;
    }
  }
  .active {
    /deep/ .van-grid-item__text {
      color: red !important;
    }
  }
}
</style>
