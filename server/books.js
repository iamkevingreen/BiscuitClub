Meteor.publish('booksSearch', function(query) {
  var self = this;
  try {
    var response = HTTP.get('https://www.googleapis.com/books/v1/volumes', {
      params: {
        q: query
      }
    });

    _.each(response.data.items, function(item) {
      console.log(item.volumeInfo.industryIdentifiers[0].identifier);
        console.log(item.volumeInfo.title);
      image = '';
      if (item.volumeInfo.imageLinks !== undefined) {
        image = item.volumeInfo.imageLinks.smallThumbnail;
      }
      var doc = {
        thumb: image,
        title: item.volumeInfo.title,
        link: item.volumeInfo.infoLink,
        snippet: item.searchInfo && item.searchInfo.textSnippet
      };

      self.added('books', Random.id(), doc);
    });

    self.ready();

  } catch(error) {
    console.log(error);
  }
});
