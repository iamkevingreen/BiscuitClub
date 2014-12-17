if (Meteor.users.find().count() === 0) {
  var id = Accounts.createUser({
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD,
  });

  Roles.addUsersToRoles(id, ['admin']);
}
