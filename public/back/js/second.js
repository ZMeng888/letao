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
  }

  
})