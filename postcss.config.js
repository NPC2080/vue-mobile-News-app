// PostCSS 配置文件，基于Node.js运行的css处理工具

module.exports = {
  plugins: {
    // 自动添加浏览器厂商前缀以兼容不同浏览器
    // Vue Cli默认添加了autoprefixer，此处不需要配置
    // autoprefixer: {
    //   // browsers用于配置要兼容到的系统环境
    //   browers: ['Android >= 4.0', 'iOS >= 8']
    // },

    // 将 px 单位转化为 rem 单位，对行内样式无效
    "postcss-pxtorem": {
      // 按设计稿宽度/10来算，Vant是基于375宽写的
      rootValue: 37.5,
      propList: ["*"],
    },
  },
};
