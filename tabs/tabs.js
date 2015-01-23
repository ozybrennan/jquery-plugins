$.Tabs = function (el) {
  this.$el = $(el);
  this.$contentTabs = this.$el.data("data-content-tabs");
  this.activeTab = $('.tab-pane.active');
  this.$el.on('click', 'a', this.clickTab.bind(this));
};

$.fn.tabs = function () {
  return this.each(function (){
    new $.Tabs(this);
  });
};

$.Tabs.prototype.clickTab = function(event) {
  var that = this;

  this.activeTab.removeClass('active').addClass('transitioning');
  $('a[href="#'+this.activeTab.attr("id")+'"]').removeClass('active');
  
  $(this.activeTab).one("transitionend", function (secondEvent) {
      that.activeTab.removeClass('transitioning');
      var divPane = $($(event.currentTarget).attr("href"));
      that.activeTab = divPane;
      divPane.addClass('active transitioning');
      setTimeout(function(){
        divPane.removeClass('transitioning');
      }, 0);
  })
  $(event.currentTarget).addClass('active');
  event.preventDefault();
}
