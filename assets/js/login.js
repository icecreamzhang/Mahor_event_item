$(function(){
  $(".login-box").on("click", "#link_reg", function(e){
    // console.log($(this).parent())
    $(".login-box").hide()
    $(".reg-box").show()
  })
  $(".reg-box").on("click", "#link_login", function(e){
    // console.log($(this).parent())
    $(".reg-box").hide()
    $(".login-box").show()
  })
  // 表单验证
  // 从layui中获取form对象
  const form = layui.form
  // 获取layer对象
  const layer = layui.layer
  // 通过 form.verify()函数定义自定义规则
  form.verify({
    username: function(value, item){ //value：表单的值、item：表单的DOM对象
      if(!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)){
        return '用户名不能有特殊字符';
      }
      if(/(^\_)|(\__)|(\_+$)/.test(value)){
        return '用户名首尾不能出现下划线\'_\'';
      }
      if(/^\d+\d+\d$/.test(value)){
        return '用户名不能全为数字';
      }
      
      //如果不想自动弹出默认提示框，可以直接返回 true，这时你可以通过其他任意方式提示（v2.5.7 新增）
      if(value === 'xxx'){
        alert('用户名不能为敏感词');
        return true;
      }
    },
    
    //我们既支持上述函数式的方式，也支持下述数组的形式
    //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
    pass: [
      /^[\S]{6,12}$/
      ,'密码必须6到12位，且不能出现空格'
    ],
    // 校验两次密码是否一致
    // value就是这个输入框的内容
    repass: function(value){
      // 通过形参拿到的是确认密码框的内容
      // 还需要拿到密码框的内容
      // 然后进行等于判断
      // 如果判断失败则return一个提示
      const pwd = $(".reg-box [name = password]").val()
      if(pwd !== value){
        return "输入密码不一致"
      }
    }

  })



  //监听注册表单的提交事件
  $("#form_reg").on("submit", function(e){
    // 阻止表单的默认提交行为
    e.preventDefault()
    $.post("http://www.liulongbin.top:3007/api/reguser",{username: $("#form_reg [name = username]"), password: $("#form_reg [name = password]")},function(res){
      if(res.status !== 0){
        return layer.msg(res.message)
      }
      layer.msg('注册成功，请登录')
      // 不需要在使用点击跳转，只需要模拟人点击#link_login就好
      $("#link_login").click()
    })
  })


  // 监听登录表单的提交事件
  $("#form_login").submit(function(e){
    $.ajax({
      url:'http://www.liulongbin.top:3007/api/login',
      method: "POST",
      data: $(this).seriallize(),
      success: function(res){
        if(res.status !== 0){
          return layer.msg("登录失败")
        }
        layer.msg("登录成功")
        // 跳转到后台
        location.href = '/index.html'
      } 
    })
  })
})