// 每次jQuery进行Ajax请求的时候都会先调用ajaxPrefilter 这个函数，在这个函数中可以拿到我们给Ajax提供的配置信息
$.ajaxPrefilter(function(options){
  options.url = 'http://ajax.frontend.itheima.net' + options.url
  console.log(options.url)
})