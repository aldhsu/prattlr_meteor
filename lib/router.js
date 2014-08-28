Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  waitOn: function() {
    return Meteor.subscribe('posts');
  }
});

Router.map(function() {
  // CRUD FOR POSTS
  // index
  this.route('postsList', {
    path: '/'
  });
  // one post
  this.route('postPage', {
    path: '/posts/:_id',
    data: function() {
      return Posts.findOne(this.params._id);
    }
  });
  // create post
  this.route('postNew', {
    path: '/post/new'
  })
});

var requireLogin = function(pause) {
  if (! Meteor.user()) {
    if (Meteor.loggingIn()) {
      this.render(this.loadingTemplate)
    } else {
      this.render('accessDenied');
    }
    pause();
  }
};

Router.onBeforeAction('loading');
Router.onBeforeAction(requireLogin, {only:'postNew'});