Router.configure({
  loadingTemplate: 'adminLoading',
  notFoundTemplate: 'notFound',
  fastRender: true,
  waitOn: function() {
    return [
      // orion.subs.subscribe('dictionary'),
      Meteor.subscribe("directory"),
      // orion.subs.subscribe('entity', 'posts'),
      // orion.subs.subscribe('entity', 'pages')
      ];
  }
});

Router.map(function() {

  // Site index

  this.route('base', {
    path: '/',
    onAfterAction: function() {
      var dict;
      if (!Meteor.isClient) {
        return;
      }
      // dict = orion.dictionary.collection.findOne();
    }
  });

  this.route('users', {
    path: '/users',
    layoutTemplate: 'layout'
  });
    this.route('user/add', {
      name: 'userAdd',
      layoutTemplate: 'layout'
    });
    this.route('/user/:_id', {
      name: 'userProfile',
      layoutTemplate: 'layout',
      data: function() {
        return Meteor.users.findOne(this.params._id);
      }

    });

  // Blog and individual blog posts

  this.route('blog', {
    path: '/blog',
  });
  this.route('post', {
    path: '/blog/:slug',
    layoutTemplate: 'layout',
    waitOn: function() {
      return [orion.subs.subscribe('entity', 'posts', {slug: this.params.slug})];
    },
    data: function() {
      return orion.entities.posts.collection.findOne({slug: this.params.slug});
    },
  });

  // General Pages
  this.route('page', {
    path: ':slug',
    layoutTemplate: 'layout',
    fastRender: true,
    waitOn: function() {
      return [orion.subs.subscribe('entity', 'pages', {slug: this.params.slug})];
    },
    data: function() {
      page = orion.entities.pages.collection.findOne({slug: this.params.slug});
      var response = this.response;
      console.log(response);
      if (page === undefined) {
        // this.redirect('base');
        return null;
      }
      return orion.entities.pages.collection.findOne({slug: this.params.slug});
    },
    onAfterAction: function() {
      post = orion.entities.pages.collection.findOne({slug: this.params.slug});
    }
  });

});

// Check if a user is Admin

var requireAdmin = function() {
  var loggedInUser = Meteor.user();

  if (!loggedInUser || (!Roles.userIsInRole(loggedInUser, ['admin']))) {
    if (Meteor.loggingIn()) {
      this.render(this.loadingTemplate);
    } else {
      this.render('accessDenied');
    }
  } else {
    this.next();
  }
}

// Router.onBeforeAction(requireAdmin, {
//   only: 'users'
// });

// Handle 404s properly

Router.plugin('dataNotFound', {notFoundTemplate: 'notFound'});
