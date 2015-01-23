$.Thumbnail = function (el) {
  this.$el = $(el);

  this.$activeImage = $(".gutter-images :first-child");
  this.activate(this.$activeImage);

  var that = this;
  $('.gutter-images').on("click", "img", function (event) {
    var img = $(event.currentTarget)
    that.activate(img);
    that.$activeImage = img;
  });
  $('.gutter-images').on('mouseenter', 'img', function(event) {
    that.activate($(event.currentTarget));
  });
  $('.gutter-images').on('mouseleave', 'img', function(event) {
    that.activate(that.$activeImage);
  });

  this.gutterIdx = 0;
  this.$images = $(".gutter-images").children();
  this.fillGutterImages()

  $('a.nav').on('click', function(event){
    if ($(event.currentTarget).hasClass("left")) {
      that.gutterIdx -= 5;
    } else {
      that.gutterIdx += 5;
      that.gutterIdx = that.gutterIdx % that.$images.length;
    }
    if (that.gutterIdx < 0) {
      that.gutterIdx = that.$images.length - 5;
    }
    that.fillGutterImages();
  });
};

$.fn.thumbnail = function () {
  return this.each (function () {
    new $.Thumbnail(this);
  });
};

$.Thumbnail.prototype.activate = function ($img) {
  $("div.active").html("<img src='" + $img.attr("src")+"'>");
}

$.Thumbnail.prototype.fillGutterImages = function () {
  $("div.gutter-images").html("")
  for (var i = this.gutterIdx; i < this.gutterIdx + 5; i++) {
    $("div.gutter-images").append(this.$images[i]);
  };
}
