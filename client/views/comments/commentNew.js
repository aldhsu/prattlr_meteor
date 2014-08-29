Template.commentNew.events({
  'submit form': function(e) {
    e.preventDefault();

    var $body = $(e.target).find('[name=body]');
    var comment = {
      body: $body.val(),
      postId: this.template.data._id
    };

    Meteor.call('comment', comment, function(error, commentId) {
      if (error) {
        throwError(error.reason);
      } else {
        $body.val('');
      }
    })
  }
})