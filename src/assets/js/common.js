// add remove class to selected / un-selected item 
  $(document).ready(function(){
    $(".adv-select-list ul li").click(function(){ 
  $(".adv-select-list li.selected").removeClass("selected");
    $(this).addClass("selected");
    });
  })
 


  $(document).ready(function(){

  	// for region flag border
    $(".wizard .region .fa").click(function(){ 
  $(".wizard .region .fa.selected").removeClass("selected");
    $(this).addClass("selected");
    });
 

 $(".wizard .region img").click(function(){ 
  $(".wizard .region img.selected").removeClass("selected");
    $(this).addClass("selected");
    });



$(".wizard .nodes-block .pagination  li a").click(function(){ 
  $(".wizard .nodes-block .pagination  li.active").removeClass("active");
    $(this).parent().addClass("active");
    });

 

 $(".wizard .nodesizes-block .pagination  li a").click(function(){ 
  $(".wizard .nodesizes-block .pagination  li.active").removeClass("active");
    $(this).parent().addClass("active");
    });


 $(".wizard .consensus-algorithm .pagination  li a").click(function(){ 
  $(".wizard .consensus-algorithm .pagination  li.active").removeClass("active");
    $(this).parent().addClass("active");
    });
 
  });


  $(window).scroll(function() {
    var sticky = $('header');
    // var gettingstarted = $('.static-header2');
     scroll = $(window).scrollTop();
    
    if (scroll >= 40) { 
     sticky.addClass('sticky-header');
    // gettingstarted.addClass('getting-started');
      }
    else { 
    sticky.removeClass('sticky-header');
        //gettingstarted.removeClass('getting-started');
    
    }
    });