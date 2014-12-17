
Meteor.subscribe("directory");

Template.directory.helpers({
  users: function() {
    return Meteor.users.find();
  }
});
