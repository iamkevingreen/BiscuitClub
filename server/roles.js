// in server/publish.js
Meteor.publish(null, function (){
  return Meteor.roles.find({})
});

Meteor.publish("directory", function () {
  return Meteor.users.find({}, {fields: {emails: 1, username: 1}});
});
