

// $(document).ajaxStart(function(){
//   NProgress.start();
// });
// $(document).ajaxStop(function() {
//   setTimeout(function(){
//     NProgress.done();
//   },500);
// })
$(document).ajaxStart(function() {
  // 第一个 ajax 开始发送时调用, 开启进度条
  NProgress.start();
});


$(document).ajaxStop(function() {
  // 在所有的 ajax 请求完成时调用
  // 模拟网络环境, 添加延迟
  setTimeout(function() {
    NProgress.done();
  }, 500 );
});

$(function() {
 $(".lt_aside .nav .category").click(function() {
   $(this).next().stop().slideToggle();
 });
 $(".lt_topbar .icon_menu").click(function() {
   $(".lt_aside").toggleClass("hidemenu");
   $(".lt_main").toggleClass("hidemenu");
   $(".lt_topbar").toggleClass("hidemenu");
 });

 $(".lt_topbar .icon_logout").click(function() {
   $("#logoutModal").modal("show");
 });
 $("#logoutBtn").click(function() {
   $.ajax({
     type:"get",
     url:"/employee/employeeLogout",
     dataType:"json",
     success:function(info){
      console.log(info);
      location.href = "login.html"
      
     }

   })
 })
});