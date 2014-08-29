if (Posts.find().count() ===0) {
  var now = new Date().getTime();
  var jeffId = Meteor.users.insert({
    profile: { name:'Jeff Macpherson'}
  })
  var jeff = Meteor.users.findOne(jeffId);
  var sachaId = Meteor.users.insert({
    profile: {name: 'Sacha Graff'}
  });
  var sacha = Meteor.users.findOne(sachaId);

  var telescopeId = Posts.insert({
    title: 'Introducing Telescope',
    userId: sacha._id,
    author: sacha.profile.name,
    url: 'http://sachagreif.com/introducing-telescope',
    submitted: now - 7 * 3600 * 1000
  });

  Comments.insert({
    postId: telescopeId,
    userId: jeff._id,
    author: jeff.profile.name,
    submitted: now - 5 * 3600 * 1000,
    body: 'Interesting project Sacha, can I get involved?'
  });

  Comments.insert({
    postId: telescopeId,
    userId: sacha._id,
    author: sacha.profile.name,
    submitted: now - 5 * 3600 * 1000,
    body: 'You sure can Jeff'
  });

  Posts.insert({
  title: 'Meteor',
  userId: tom._id,
  author: tom.profile.name,
  url: 'http://meteor.com', submitted: now - 10 * 3600 * 1000
  });

  Posts.insert({
  title: 'The Meteor Book',
  userId: tom._id,
  author: tom.profile.name,
  url: 'http://themeteorbook.com', submitted: now - 12 * 3600 * 1000
  });
}