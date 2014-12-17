if (Meteor.users.find().count() == 0) {
   var users = [
       {username:"normcore",name:"Normal User",email:"normal@site.com",roles:[], books: ['9780345508553'], password: "normal3210"},
       {username:"bookie",name:"Basic User",email:"normal@sit22e.com",roles:['bookie'],books: ['9780345508553'], password: "bookie0"},
       {username:process.env.ADMIN_USERNAME,books: ['9780345508553', '0765317389', '0060958324'],name:process.env.ADMIN_NAME,email:process.env.ADMIN_EMAIL,roles:['admin'], password: process.env.ADMIN_PASSWORD}
   ];

   _.each(users, function (user) {
       var id = Accounts.createUser({
           username: user.username,
           email: user.email,
           password: user.password,
           profile: { name: user.name, books: user.books },
       });

       if (user.roles.length > 0) {
           Roles.addUsersToRoles(id, user.roles);
       }
   });
};
