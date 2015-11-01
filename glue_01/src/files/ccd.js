(function($){
// メニュー
  var menu = $('#menu_hidden'),
  menuBtn = $('#menu_button'),
  body = $(document.body),
  menuWidth = menu.outerWidth();
  menuBtn.on('click', function(){
  $('button#menu_button').toggleClass('open');
    if($('button#menu_button').hasClass('open')){
      body.animate({'left' : menuWidth }, 300);
      menu.animate({'left' : 0 }, 300);
    } else {
      menu.animate({'left' : -menuWidth }, 300);
      body.animate({'left' : 0 }, 300);
    }
  });

// ウィンドウズ変更時の動作
  var onResize1 = function() {
    var winW = $(window).width();
    var slideW = $('.slide_image').width();
    if(winW > 960){
      $('.resize1,.lang_sel_list_vertical').css({'width':winW/2-200});
      $('.resize2').css({'width':winW/2-530});
      $('.link_prev').css({'width':winW/2-1});
    } else {
      $('.resize1,.lang_sel_list_vertical').css({'width':280});
      $('.resize2').css({'width':winW/2-530});
    }
  };
  onResize1();
  $(window).resize(onResize1);

  var swiper = new Swiper('.swiper-container', {
      nextButton: '.swiper-button-next',
      prevButton: '.swiper-button-prev',
      speed: 800,
      effect: 'slide',
      autoplay: 8000,
      loop: true,
  });

})(jQuery);