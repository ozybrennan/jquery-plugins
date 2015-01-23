$.Carousel = function (el) {
  this.$el = $(el);
  this.activeIdx = 0;
  this.itemCount = $(".items").children().length
  $(".items :first-child").addClass("active");
  var that = this;
  $(".slide-right").on("click", function () {
    that.slide(-1);
  });
  $(".slide-left").on("click", function () {
    that.slide(1);
  });
};

$.fn.carousel = function () {
  return this.each (function () {
    new $.Carousel(this);
  });
};

$.Carousel.prototype.slide = function(num) {
  if (this.transitioning) {
    return;
  }
  this.transitioning = true;
  var that = this;

  var transitionClass = transitionHelper(num);
  var outTransitionClass = transitionHelper(-num);

  var realIdx = (this.activeIdx+num) % this.itemCount;
  if (realIdx < 0){
    realIdx = this.itemCount - 1;
  }

  $("img").eq(this.activeIdx).addClass(outTransitionClass);
  $("img").eq(realIdx).addClass("active").addClass(transitionClass);

  setTimeout(function(){
    $("img").eq(realIdx).removeClass(transitionClass);
  }, 0);

  $($("img").eq(this.activeIdx)).one("transitionend", function (event) {
    console.log(event.currentTarget)
    $(event.currentTarget).removeClass("active").removeClass(outTransitionClass)
    that.transitioning = false;
  });

  this.activeIdx = realIdx;
}

function transitionHelper(num) {
  if (num > 0) {
    return "right";
  } else {
    return "left";
  }
}
