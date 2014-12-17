Router.configure({
  loadingTemplate: 'adminLoading',
  notFoundTemplate: 'notFound',
  fastRender: true,
  waitOn: function() {
    return [orion.subs.subscribe('dictionary'), orion.subs.subscribe('entity', 'posts'), orion.subs.subscribe('entity', 'pages')];
  }
});

Router.map(function() {

  // Site index

  this.route('layout', {
    path: '/',
    fastRender: true,
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
    fastRender: true,
    layoutTemplate: 'layout'
  })

  // Blog and individual blog posts

  this.route('blog', {
    path: '/blog',
    fastRender: true,
  });
  this.route('post', {
    path: '/blog/:slug',
    layoutTemplate: 'layout',
    fastRender: true,
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

// Handle 404s properly

Router.plugin('dataNotFound', {notFoundTemplate: 'notFound'});
