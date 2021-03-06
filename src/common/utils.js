//防抖函数
 //防抖的过程
        /*
        1.timer为空，执行settimeout中的函数，因为延迟了，所以第二次的图片加载完成调用来了（打断函数执行）
        2.timer有值，然后被清空，继续执行settimeout中的函数，因为延迟了，所以第三次次的图片加载完成调用来了（打断函数执行）
        3.重复（2）
        ....
        30.timer有值，然后被清空，继续执行settimeout中的函数，因为是最后一次，延迟过后，函数就执行了
        */
export function debounce(func,delay=50) {
  let timer = null;
  // ...args 代表可变的参数，参数的个数可以任意，最终放在一个数组中
  return function(...args) {
      if(timer) {//如果有值，就把它清空
          clearTimeout(timer);
      }
      //重新给他设置一个值
      timer = setTimeout(() => {
          func.apply(this,args);
      },delay);
  }
}
export function formatDate(date, fmt) {
    //正则表达式：字符串匹配的利器
    //1.获取年份  不确定有几个y  RegExp.$1匹配的结果
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    //2.获取
    let o = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'h+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds()
    };
    for (let k in o) {
      //获取到k的值 `(${k})`
      if (new RegExp(`(${k})`).test(fmt)) {
        let str = o[k] + '';//获取对应的时间 M(月份) 01
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
      }
    }
    return fmt;
  };
  
function padLeftZero (str) {
    return ('00' + str).substr(str.length);
  };

