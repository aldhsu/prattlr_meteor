Template.postItem.helpers({
  domain: function() {
    var $a = $('<a>');
    $a.attr('href', this.url);
    return $a[0].hostname;
  },
  _id: function() {
    console.log(this)
  }
})