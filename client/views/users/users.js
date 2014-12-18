
Meteor.subscribe("directory");

Template.directory.helpers({
  users: function() {
    return Meteor.users.find();
  }
});


Template.userAdd.events({
  "submit #userCreate": function(event, template) {
    event.preventDefault();
    var id = Accounts.createUser({
        username: template.find("#username").value,
        email: template.find("#email").value,
        password: template.find("#password").value,
        profile: { name: template.find("#password").value },
    }, function(error) {
      if (error) {
        console.log(error);
      }
    });

    this.render('users');
  }
})
