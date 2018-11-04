 $(function(){
   render();
   function getHistory () {
     var jsonStr = localStorage.getItem("search_list") || '[]';
     var arr = JSON.parse(jsonStr);
     return arr;
   }
   function render () {
     var arr = getHistory ();
     var htmlStr = template("search_tpl", { list: arr });
     console.log(arr);
     $(".lt_history").html(htmlStr);
   }
  $(".lt_history").on("click",".btn_empty",function (){
    mui.confirm("你确定要清空历史记录嘛?","温馨提示",["取消","确认"],function(e){
      //  console.log(e); e是取消和确认，0表示取消，1表示确认
      if(e.index === 1){
        localStorage.removeItem("search_list");
        render();
      }
    })
  });
  $(".lt_history").on("click",".btn_delete",function() {
    var index = $(this).data("index");
    console.log(index);
    var arr = getHistory();
    arr.splice(index,1);
    localStorage.setItem("search_list",JSON.stringify(arr));
    render();
  });
  $(".search_btn").click(function() {
    var key = $(".search_input").val().trim();
    console.log(key);
    if(key === ''){
      mui.toast("请输入搜索关键字");
      return;
    }
    var arr = getHistory();
    console.log(arr);
    var index = arr.indexOf(key);
    if(index!= -1){
      arr.splice(index,1);
    }
    if(arr.length >= 10){
      arr.pop();
    }
    arr.unshift( key );

    localStorage.setItem("search_list",JSON.stringify(arr));
    render();
    $(".search_input").val("");
    location.href = "searchList.html?key=" + key;
  })
 })