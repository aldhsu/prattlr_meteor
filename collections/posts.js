Posts = new Meteor.Collection('posts');

Posts.allow({
  update: ownsDocument,
  remove: ownsDocument
});

Posts.deny({
  update: function(userId, post, fieldNames) {
    return (_.without(fieldNames, 'url', 'title').length > 0)
  }
})


Meteor.methods({
  post: function(postAttributes) {
    var user = Meteor.user(),
    postWithSameLink = Posts.findOne({url:postAttributes.url})
    // check logged in
    if (!user) {
      throw new Meteor.Error(401, "You need to login to post new stories");
    }
    // validate title for unique
    if (postAttributes.url && postWithSameLink){
      throw new Meteor.Error(302, "This link has already been posted", postWithSameLink._id);
    }
    // strong params
    var post = _.extend(_.pick(postAttributes, 'url', 'messages'), {
      title: postAttributes.title + (this.isSimulation ? '(client)' : '(server)'),
      userId: user._id,
      author: user.username,
      submitted: new Date().getTime(),
      commentsCount: 0
    });
    // test wait for 5 seconds
    // console.log('posting');
    // if (! this.isSimulation) {
    //   console.log("running sim");
    //   var Future = Npm.require('fibers/future');
    //   var future = new Future();
    //   Meteor.setTimeout(function() {
    //     future.return();
    //   }, 5000);
    //   future.wait();
    // }

    var postId = Posts.insert(post);

    return postId;
  }
})