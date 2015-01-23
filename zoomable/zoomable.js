$.Zoomable = function (el) {
  this.$el = $(el);
  this.width = 300;
  this.height = 300;
  this.imgWidth = $('.zoomable img').width()
  this.imgHeight = $('.zoomable img').height()
  $(this.$el).on('mousemove', this.showFocusBox.bind(this));
  $(this.$el).on('mouseleave', this.removeFocusBox);
};

$.fn.zoomable = function () {
  return this.each (function () {
    new $.Zoomable(this);
  });
};

$.Zoomable.prototype.showFocusBox = function(event) {
  var right = event.pageX + this.width;
  var bottom = event.pageY + this.height;
  var left = event.pageX;
  var top = event.pageY;

  if (right > this.imgWidth) {
    right = this.imgWidth;
  }
  if (bottom > this.imgHeight) {
    bottom = this.imgHeight;
  }

  $(".zoomable").append("<div class='focus-box' style='top:" + top + " bottom:" + bottom +
  " left:" + left + " right:" + right + "'>")
}

$.Zoomable.prototype.removeFocusBox = function() {

}
