Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  waitOn: function() {
    return Meteor.subscribe('notifications');
  }
});

PostsListController = RouteController.extend({
  template: 'postsList',
  increment: 5,
  limit: function() {
    return parseInt(this.params.postsLimit) || this.increment;
  },
  findOptions: function() {
    return {sor: {submitted: -1}, limit: this.limit()};
  },
  waitOn: function() {
    return Meteor.subscribe('posts', this.findOptions());
  },
  posts: function() {
    return Posts.find({}, this.findOptions());
  },
  data: function() {
    console.log(this);
    var hasMore = this.posts().count() === this.limit();
    var nextPath = this.route.path({postsLimit: this.limit() + this.increment});

    return {
      posts: this.posts(),
      nextPath: hasMore ? nextPath : null
    };
  }
})
Router.map(function() {
  // CRUD FOR POSTS decreasing specificity
  // one post
  this.route('postPage', {
    path: '/posts/:_id',
    waitOn: function() {
      return Meteor.subscribe('comments', this.params._id);
    },
    data: function() {
      return Posts.findOne(this.params._id);
    }
  });
  // create post
  this.route('postNew', {
    path: '/post/new'
  });

  // edit
  this.route('postEdit', {
    path: '/post/:_id',
    data: function() {
      return Posts.findOne(this.params._id);
    }
  });
  // index
  this.route('postsList', {
    path: '/:postsLimit?',
    controller: PostsListController
  });
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
Router.onBeforeAction(function() {clearErrors()});