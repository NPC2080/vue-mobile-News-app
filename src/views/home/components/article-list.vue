<template>
  <div class="article-list">
    <van-pull-refresh
      :success-duration="1000"
      :success-text="refreshSuccessText"
      v-model="isPullLoading"
      @refresh="onRefresh"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <article-item
          v-for="article in articles"
          :key="article.id"
          :article="article"
        />
        <!-- <van-cell
          v-for="item in articles"
          :key="item.id"
          :title="item.name"
        ></van-cell> -->
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from "@/api/article";
import ArticleItem from "@/components/article-item";

export default {
  name: "ArticleList",
  components: {
    ArticleItem,
  },
  props: {
    channel: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      articles: [],
      isPullLoading: false, //下拉刷新的loading状态
      loading: false, //某次加载状态是否结束，是否继续加载下一次
      finished: false, //总加载状态是否结束
      timestamp: null, //获取下一页数据的时间戳
      page: 0, //模拟时间戳
      refreshSuccessText: "刷新成功",
    };
  },
  computed: {},
  watch: {},
  methods: {
    async onLoad() {
      const { data } = await getArticles({
        channel_id: this.channel.id,
        timestamp: this.timestamp || Date.now(), //时间戳，标志获取内容页码
        with_top: 1, //是否包含置顶文章 1-包含置顶 0-不包含
        page: this.page,
      });
      //将数据放入数组
      this.articles.push(...data.data);
      //本次加载结束
      this.loading = false;

      // if (data.data.length) {
      //   this.timestamp = data.data.pre_timestamp;
      // } else {
      //   this.finished = true;
      // }
      if (this.page < 3) {
        this.page++;
      } else {
        this.finished = true;
      }
      // 模拟异步请求
      // setTimeout(() => {
      //   for (let i = 0; i < 10; i++) {
      //     this.list.push(this.list.length + 1);
      //   }
      //   this.loading = false;
      //   if (this.list.length >= 30) {
      //     this.finished = true;
      //   }
      // }, 1000);
    },

    async onRefresh() {
      // const { data } = await getArticles({
      //   channel_id: this.channel.id,
      //   timestamp: this.timestamp || Date.now(), //时间戳，标志获取内容页码
      //   with_top: 1, //是否包含置顶文章 1-包含置顶 0-不包含
      //   page: this.page,
      // });
      let d = new Date();
      this.articles.unshift({
        id: d.getTime(),
        name: "更新的数据" + d.getTime(),
      });

      this.isPullLoading = false;
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
.article-list {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 50px;
  top: 90px;
  overflow-y: auto;
}
</style>
