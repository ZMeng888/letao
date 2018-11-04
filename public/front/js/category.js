$(function() {
  $.ajax({
    type:"get",
    url:"/category/queryTopCategory",
    dataType:"json",
    success:function(info){
     console.log(info);
     var htmlStr = template( "left_tpl", info );
     $(".lt_category_left ul").html(htmlStr);
     render(info.rows[0].id);
    }
  });
  $(".lt_category_left ul").on("click","a",function() {
     var id = $(this).data("id");
     render(id);
    //  $(this).addClass("current").parent().siblings().find("a").remove("current");
     $(this).addClass("current").parent().siblings().find("a").removeClass("current");
  })


  function render (id) {
    $.ajax({
      type:"get",
      url:"/category/querySecondCategory",
      data:{
        id:id
      },
      dataType:"json",
      success:function(info){
        console.log(info);
        var htmlStr = template("right_tpl",info);
        $(".lt_category_right ul").html(htmlStr);
      }
    })
  }
})