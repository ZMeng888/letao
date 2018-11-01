$(function(){
  var currentPage = 1;
  var pageSize = 5;
  render();
  function render () {
    $.ajax({
      type: "get",
      url:"/category/queryTopCategoryPaging",
      data: {
        page:currentPage,
        pageSize:pageSize
      },
    dataType: "json",
    success:function(info){
     console.log(info);
     var htmlstr = template("firstpl",info);
     $("tbody").html(htmlstr);
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
 
  $("#addBtn").click(function() {
    $("#addModal").modal("show");
  });
  // 表单验证
  $('#form').bootstrapValidator({
    // 配置图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',   // 校验成功
      invalid: 'glyphicon glyphicon-remove',   // 校验失败
      validating: 'glyphicon glyphicon-refresh'  // 校验中
    },

    // 配置需要校验的字段
    fields: {
      categoryName: {
        // 校验规则
        validators: {
          notEmpty: {
            message: "请输入一级分类"
          }
        }
      }
    }
  });

   // 4. 注册表单校验成功事件, 阻止默认的提交, 通过 ajax 提交
  //  $("#form").on("success.form.bv",function(e){
  //    e.preventDefault();
  //    $.ajax({
  //      type: "post",
  //      url:"/category/addTopCategory",
  //      data:$("#form").serialize(),
  //      dataType: "json",
  //      success:function(info){
  //        consoole.log(info);
  //        $("#addModal").modal("hide");
  //        currentPage = 1;
  //        render();
  //        $('#form').data("bootstrapValidator").resetForm( true );
  //      }
  //    })
  //  })

  $('#form').on("success.form.bv", function( e ) {
    // 阻止默认的提交
    e.preventDefault();

    $.ajax({
      type: "post",
      url: "/category/addTopCategory",
      data: $('#form').serialize(),
      dataType: "json",
      success: function( info ) {
        console.log( info );
        // 关闭模态框
        $('#addModal').modal("hide");
        // 页面重新渲染第1页
        currentPage = 1;
        render();

        // 调用 resetForm 进行重置
        // resetForm(true) 传 true 表示内容和校验状态都重置
        $('#form').data("bootstrapValidator").resetForm( true );
      }
    })

  })

})