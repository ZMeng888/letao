$(function () {
 $('#form').bootstrapValidator({
  //  配置图标
  feedbackIcons: {
    valid: 'glyphicon glyphicon-ok',  
    invalid: 'glyphicon glyphicon-remove', 
    validating: 'glyphicon glyphicon-refresh'
  },

   fields: {
    //  判断用户名是否为空
     username:{
      validators:{
        notEmpty:{
          message:"用户名不能为空"
        },
        // 判断用户长度
        stringLength:{
          min:2,
          max:6,
          message:"用户名长度必须是2-6位"
        },
        callback:{
          message:"用户名错误"
        }
      }
     },
     password: {
      //  判断密码是否为空
      validators:{
        notEmpty:{
          message:"密码不能为空"
        },
        // 判断密码长度是多少位
        stringLength:{
          min:6,
          max:12,
          message:"密码长度必须是6-12位"
        },
        callback:{
          message:"密码错误"
        }
      }
     }
   }
 })

//  登录 功能
$('#form').on("success.form.bv",function(e) {
  e.preventDefault();
  $.ajax({
    type:"post",
    url: " /employee/employeeLogin",

    data: $('#form').serialize(),
    dataType: 'json',
    success:function(info) {
      if(info.success){
        location.href = "index.html";
      }
      if(info.error === 1000){
        $("#form").data("bootstrapValidator").updateStatus("username","INVALID","callback")
      }
      if(info.error === 1001){
        $("#form").data("bootstrapValidator").updateStatus("password","INVALID","callback")
      }
      
      
    }
  })
})

// 重置内容
$('[type="reset"]').click(function() {
  $("#form").data("bootstrapValidator").resetForm(true);
})
})