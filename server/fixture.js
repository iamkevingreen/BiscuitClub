if (Meteor.users.find().count() == 0) {
   var users = [
       {username:"normcore",name:"Normal User",email:"normal@site.com",roles:[], password: "normal3210"},
       {username:"bookie",name:"Basic User",email:"normal@sit22e.com",roles:['bookie'], password: "bookie0"},
       {username:process.env.ADMIN_USERNAME,name:process.env.ADMIN_NAME,email:process.env.ADMIN_EMAIL,roles:['admin'], password: process.env.ADMIN_PASSWORD}
   ];

   _.each(users, function (user) {
       var id = Accounts.createUser({
           username: user.username,
           email: user.email,
           password: user.password,
           profile: { name: user.name }
       });

       if (user.roles.length > 0) {
           Roles.addUsersToRoles(id, user.roles);
       }
   });
};
