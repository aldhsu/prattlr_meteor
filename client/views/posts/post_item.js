Template.postItem.helpers({
  domain: function() {
    var a = document.createElement('a');
    a.href = this.url;
    return a.hostname;
  },
  ownPost: function() {
    console.log(this.userId);
    console.log(Meteor.userId());
    if (this.userId) {
      return this.userId == Meteor.userId();
    } else {
      return false;
    }
  },
  commentsCount: function() {
    return Comments.find({postId: this._id}).count();
  }
})