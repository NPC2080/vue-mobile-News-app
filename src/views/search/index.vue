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
        @focus="isResultShow = false"
      >
      </van-search>
    </form>

    <!-- 搜索结果 -->
    <search-result v-if="isResultShow"></search-result>

    <!-- 联想提示 -->
    <search-suggestion
      v-else-if="searchText"
      :search-text="searchText"
    ></search-suggestion>

    <!-- 历史记录 -->
    <search-history v-else></search-history>
  </div>
</template>

<script>
import SearchHistory from "./components/search-history.vue";
import SearchResult from "./components/search-result.vue";
import SearchSuggestion from "./components/search-suggestion.vue";
export default {
  name: "Search",
  components: { SearchSuggestion, SearchHistory, SearchResult },
  props: {},
  data() {
    return {
      searchText: "",
      isResultShow: false,
    };
  },
  computed: {},
  watch: {},
  methods: {
    onSearch() {
      this.isResultShow = true;
    },
  },
  created() {},
  mounted() {},
};
</script>
<style scoped lang="less"></style>
