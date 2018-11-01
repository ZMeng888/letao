$(function() {
 var currentPage = 1;
 var pageSize = 5;
 var currentId;
 var isDelete;
  render();
  function render () {
    $.ajax({
      type:"get",
      url:"/user/queryUser",
      data:{
        page:currentPage,
        
        pageSize:pageSize	    	    
      
      },
      dataType:"json",
      success:function(info) {
        console.log(info);
        var htmlStr = template("tmp",info);
        console.log(htmlStr);
        $("tbody").html(htmlStr);
  
        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion:3,
          totalPages:Math.ceil(info.total / info.size),
          currentPage: info.page,
          onPageClicked:function(a, b, c,page){
              currentPage = page;
              render();
          }
        })
      }
    })
  }
 

  // 点击启用禁用按钮
  $("tbody").on("click",".btn",function() {
    $('#userModal').modal("show");
    currentId = $(this).parent().data("id");
    isDelete = $(this).hasClass("btn-danger") ? 0 : 1;
  });
  $("#submitBtn").click(function() {
    // console.log(currentId);
    // console.log(isDelete);
    $.ajax({
      type: "post",
      url: "/user/updateUser",
      data: {
        id: currentId,
        isDelete: isDelete
      },
      dataType: 'json',
      success: function(info) {
        $('#userModal').modal("hide");
        render();
      }

    })
  })
})
