var postsData = [
  {
    title: 'Introducing Prattlr',
    author: 'Allen Hsu',
    url: 'http://prattlr.herokuapp.com'
  },
  {
    title: 'Introducing ThreeDee',
    author: 'Allen Hsu',
    url: 'http://teamdnmmaster51da.ninefold-apps.com/',
  }
];

Template.postsList.helpers({
  posts: function() {
    return Posts.find({}, {sort: {submitted: -1}});
  }
})