Template.commentNew.events({
  'submit form': function(e, template) {
    e.preventDefault();
    console.log('submitting');
    console.log(template);
    var $body = $(e.target).find('[name=body]');
    var comment = {
      body: $body.val(),
      postId: template.data._id
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