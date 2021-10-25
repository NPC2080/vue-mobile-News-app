<template>
  <div class="search-container">
    <!-- 搜索栏 -->
    <form action="/">
      <van-search
        v-model="searchText"
        placeholder="请输入搜索关键词"
        show-action
        @search="onSearch"
        @cancel="$router.back()"
      >
      </van-search>
    </form>

    <!-- 联想提示 -->
    <search-suggestion></search-suggestion>

    <!-- 历史记录 -->
    <search-history></search-history>

    <!-- 搜索结果 -->
  </div>
</template>

<script>
import SearchHistory from "./components/search-history.vue";
import SearchSuggestion from "./components/search-suggestion.vue";
export default {
  name: "Search",
  components: { SearchSuggestion, SearchHistory },
  props: {},
  data() {
    return { searchText: "" };
  },
  computed: {},
  watch: {},
  methods: {
    onSearch() {},
  },
  created() {},
  mounted() {},
};
</script>
<style scoped lang="less"></style>
