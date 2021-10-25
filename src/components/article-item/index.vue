<template>
  <!-- <div class="article-item">hahaah</div> -->
  <van-cell class="article-item">
    <div slot="title" class="title van-multi-ellipsis--l3">
      {{ article.name }}
    </div>
    <div slot="label">
      <div class="cover-wrap" v-if="article.covertype === 3">
        <div class="cover-wrap-item">
          <van-image
            class="cover-item"
            fit="cover"
            src="https://img01.yzcdn.cn/vant/cat.jpeg"
          ></van-image>
        </div>
        <div class="cover-wrap-item">
          <van-image
            class="cover-item"
            fit="cover"
            src="https://img01.yzcdn.cn/vant/cat.jpeg"
          ></van-image>
        </div>
        <div class="cover-wrap-item">
          <van-image
            class="cover-item"
            fit="cover"
            src="https://img01.yzcdn.cn/vant/cat.jpeg"
          ></van-image>
        </div>
      </div>
      <div class="label-wrap">
        <span>{{ article.author }}</span>
        <span>{{ article.comment }}条评论</span>
      </div>
    </div>
    <van-image
      v-if="article.covertype === 1"
      class="right-cover"
      fit="cover"
      src="https://img01.yzcdn.cn/vant/cat.jpeg"
    ></van-image>
  </van-cell>
</template>

<script>
export default {
  name: "ArticleItem",
  components: {},
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  methods: {},
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
.article-item {
  .title {
    font-size: 16px;
    color: #3a3a3a;
  }
  /deep/ .van-cell__value {
    flex: unset;
    width: 116px;
    height: 73px;
    margin-left: 12px;
  }
  .rigth-cover {
    width: 116px;
    height: 73px;
  }

  .cover-wrap {
    padding: 15px 0;
    display: flex;
    .cover-wrap-item {
      flex: 1;
      height: 73px;
      &:not(:last-child) {
        padding-right: 4px;
      }
      .article-item .cover-item {
        width: 100%;
        height: 73px;
      }
    }
  }

  .label-wrap {
    font-style: 11px;
    color: #b4b4b4;
    span {
      margin-right: 12px;
    }
  }
}
</style>
