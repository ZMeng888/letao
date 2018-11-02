$(function() {
  var currentPage = 1;
  var pageSize = 2;
  var picArr = [];
  render();
  function render() {
    $.ajax({
      type:"get",
      url:"/product/queryProductDetailList",
      data:{
       page:currentPage,
       pageSize:pageSize
      },
      dataType:"json",
      success:function(info){
        console.log(info);
        var htmlstr = template("productPtl",info);
        $("tbody").html(htmlstr);

        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion: 3,
          totalPages: Math.ceil( info.total / info.size ),
          currentPage: info.page,
          onPageClicked: function(a, b, c, page) {
            // 更新当前页, 重新渲染
            currentPage = page;
            render();
          }
        })
      }
 
 
   })
  };

  $("#addBtn").click(function() {
    $('#addModal').modal("show");
   // 获取所有的二级分类, 进行渲染下拉菜单
    $.ajax({
      type: "get",
      url:"/category/querySecondCategoryPaging",
      data:{
        page:1,
        pageSize:100
      },
      dataType:"json",
      success:function(info){
        console.log(info);
        var htmlstr = template("dropdownTpl",info);
        $(".dropdown-menu").html(htmlstr);
      }
    })
  });
 // 3. 给下拉菜单的 a 绑定点击事件 (事件委托绑定)
 $(".dropdown-menu").on("click","a",function(){
   var txt = $(this).text();
   $("#dropdownText").text(txt);

   var id = $(this).data("id");
   $('[name="brandId"]').val(id);

   $('#form').data("bootstrapValidator").updateStatus("brandId", "VALID");
 });

//  上传文件初始化
 $("#fileupload").fileupload({
  dataType:"json",
  //e：事件对象
  //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
  done:function (e, data) {
    console.log(data.result);
    var picObj = data.result;
    var picUrl = picObj.picAddr;
    picArr.unshift(picObj);
    $("#imgBox").prepend('<img src="'+ picUrl+ '" alt="">' );

    if(picArr.length > 3){
      picArr.pop();
      $("#imgBox img:last-of-type").remove();
    }
    if(picArr.length === 3){
      $('#form').data("bootstrapValidator").updateStatus("picStatus", "VALID");
    }
    console.log(picArr);
  }
});




// 表单校验   
$("#form").bootstrapValidator({
  excluded: [],
  feedbackIcons: {
    valid: 'glyphicon glyphicon-ok',   // 校验成功
    invalid: 'glyphicon glyphicon-remove',   // 校验失败
    validating: 'glyphicon glyphicon-refresh'  // 校验中
  },
  fields: {
  brandId:{
    validators:{
      notEmpty:{
        message:"请选择二级分类"
      }
    }
  },
  proName:{
    validators:{
      notEmpty:{
        message:"请选择商品名称"
      }
    }
  },
  proDesc: {
    validators: {
      notEmpty: {
        message: "请输入商品描述"
      },
    }
  },
  num:{
    validators: {
      notEmpty: {
        message: "请输入商品库存"
      },
      regexp:{
        regexp:/^[1-9]\d*$/,
        message: '库存格式要求是非零开头的数字'
      }
    }
  },
  size:{
    validators:{
      notEmpty:{
        message:"请输入商品尺码"
      },
      regexp:{
        regexp:/^\d{2}-\d{2}$/,
        message:"尺码格式必须是 xx-xx 的格式, 例如: 32-40"
      }
    }
  },
  oldPrice:{
    validators: {
      notEmpty: {
        message: "请输入商品原价"
      }
    }
  },
  price: {
    validators: {
      notEmpty: {
        message: "请输入商品现价"
      }
    }
  },
  picStatus: {
    validators: {
      notEmpty: {
        message: "请上传3张图片"
      }
    }
  }
  }
});

$("#form").on("success.form.bv",function(e){
  e.preventDefault();
  var params = $("#form").serialize();
  params += "&picName1" +picArr[0].picName+ "$picAddr1=" +picArr[0].picAddr;
  params += "&picName2" +picArr[1].picName+ "$picAddr2=" +picArr[1].picAddr;
  params += "&picName3" +picArr[2].picName+ "$picAddr3=" +picArr[2].picAddr;
   $.ajax({
     type:"post",
     url:"/product/addProduct",
     data:params,
     dataType: "json",
     success:function(info){
       if(info.success){
         $("#addModal").modal("hide");
         currentPage = 1;
         render();
         $("form").data("bootstrapValidator").resetForm(true);
         $("#dropdownText").text("请选择二级分类");
         $("#imgBox img").remove();
       }
     }
   })
})
})