$(function() {
  var currentPage = 1;
  var pageSize = 5;
  render();
  function render() {
    $.ajax({
      type: "get",
      url: "/category/querySecondCategoryPaging",
      data: {
        page:currentPage,
        pageSize:pageSize
      },
      success: function (info) {
        console.log(info);
        var hemlstr = template("aecondTpl",info);
        $("tbody").html(hemlstr);

        // 分页插件
        $('#paginator').bootstrapPaginator({
          // 版本号
          bootstrapMajorVersion: 3,
          // 总页数
          totalPages: Math.ceil( info.total / info.size ),
          // 当前页
          currentPage: info.page,
          // 绑定页码点击事件
          onPageClicked: function( a, b, c, page ) {
            // 点击时, 显示 page 页的数据
            // 更新当前页
            currentPage = page;
            render();
          }
        })
      }
    })
  };
  // 显示模态框
  $("#addBtn").click(function() {
    $("#addModal").modal("show");

    $.ajax({
      type:"get",
      url:"/category/queryTopCategoryPaging",
      data:{
        page:1,
        pageSize:100
      },
      dataType:"json",
      success:function(info){
        var htmlStr = template("dropdownTpl",info);

        $(".dropdown-menu").html(htmlStr)
      }
    })
  });
  // 下来菜单
  $(".dropdown-menu").on("click","a",function() {
    console.log($(this).text());
    var txt = $(this).text();
    $("#dropdownText").text(txt);
    var id = $(this).data("id");
    $('[name="categoryId"]').val(id);
    $("#form").data("bootstrapValidator").updateStatus("categoryId","VALID");
  });
  // 配置文件上传插件
  $("#fileupload").fileupload({
    dataType: 'json',
    done:function(e,data){
    var picUrl = data.result.picAddr;//后台返回数据
    $("#imgBox img").attr("src",picUrl);
    $('[name="brandLogo"]').val( picUrl);
    // 改变符号对号
    $("#form").data("bootstrapValidator").updateStatus("brandLogo","VALID");
    }
  });
 
  // 表单验证
  $('#form').bootstrapValidator({
    excluded: [],
    // 配置图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',   // 校验成功
      invalid: 'glyphicon glyphicon-remove',   // 校验失败
      validating: 'glyphicon glyphicon-refresh'  // 校验中
    },
     // 配置需要校验的字段
     fields: {
      categoryId: {
        // 校验规则
        validators: {
          notEmpty: {
            message: "请选择一级分类"
          }
        }
      },
      brandName: {
        validators: {
          notEmpty: {
            message: "请选择二级级分类"
          }
        }
      },
      brandLogo:{
        validators: {
          notEmpty: {
            message: "请选择图片"
          }
        }
      }
    }
  });

  // 6. 注册表单校验成功事件, 阻止默认的表单提交, 通过 ajax 进行提交
  $('#form').on("success.form.bv", function( e ) {
    e.preventDefault();
    $.ajax({
      type:"post",
      url:"/category/addSecondCategory",
      data: $("#form").serialize(),
      dataType:"json",
      success:function(info) {
        if(info.success){
          $("#addModal").modal("hide");
          currentPage = 1;
          render();
          $("#form").data("bootstrapValidator").resetForm(true);
          $("#dropdownText").text("请选择一级分类");
          $("#imgBox img").attr("src","images/none.png")
        }
      }
    })
  })
})