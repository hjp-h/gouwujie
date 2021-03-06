module.exports = {
  plugins: {
    autoprefixer: {},
    "postcss-px-to-viewport":{
      viewportWidth:375,//视窗的宽度，对应的是我们设计稿的宽度
      viewportHeight:567,//视窗的高度
      unitPrecision:5,//指定'px'转换为视窗单位值的小数位数
      viewportUnit:'vw',//转换的单位
      selectorBlackList:['ignore','tab-bar','tab-bar-item'],//指定不需要转换的类
      minPixelValue:1,//小于或等于'1px'不转换为视窗单位
      mediaQuery:false//允许在媒体查询中转换'px'
    }
  }
}
