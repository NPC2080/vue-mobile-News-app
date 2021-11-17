<template>
  <div class="search-suggestion">
    <van-cell
      icon="search"
      v-for="(str, index) in suggestions"
      :title="str.name"
      :key="index"
    >
      <div slot="title" v-html="highlight(str.name)"></div>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestions } from "@/api/search";
import { debounce } from "lodash"; //lodash -> debounce函数防抖

export default {
  name: "SearchSuggestion",
  components: {},
  props: {
    searchText: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      suggestions: [],
    };
  },
  computed: {},
  watch: {
    searchText: {
      handler: debounce(async function () {
        const { data } = await getSearchSuggestions(this.searchText);
        this.suggestions = data;
      }, 400),
      // async handler() {
      //   const { data } = await getSearchSuggestions(this.searchText);
      //   this.suggestions = data;
      // },
      immediate: true,
    },
  },
  methods: {
    highlight(str) {
      str.replace(
        new RegExp(this.searchText, "gi"),
        `<b>${this.searchText}</b>`
      );
    },
  },
  created() {},
  mounted() {},
};
</script>
<style scoped lang="less"></style>
