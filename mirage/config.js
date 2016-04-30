import Ember from 'ember';

export default function() {

  // These comments are here to help you get started. Feel free to delete them.

  /*
    Config (with defaults).

    Note: these only affect routes defined *after* them!
  */

  // this.urlPrefix = '';    // make this `http://localhost:8080`, for example, if your API is on a different server
  // this.namespace = '';    // make this `api`, for example, if your API is namespaced
  // this.timing = 400;      // delay for each request, automatically set to 0 during testing

  this.get('/decks', ({ deck }, request) => {
    const uuid = request.queryParams['filter[uuid]'];

    let id;
    deck.all().forEach((deck) => {
      const testUuid =
        Ember.get(deck, 'attrs.data.attributes.uuid') ||
        Ember.get(deck, 'attrs.uuid');
      if(testUuid === uuid) {
        id = deck.attrs.id;
      }
    });
    return deck.where({id});
  });

  this.post('/slides');

  this.post('/decks', ({ deck, slide}, request) => {
    const params = JSON.parse(request.requestBody);
    const newDeck = deck.create(params);

    newDeck.createSlide({
      content: '# new slide',
      data: {
        type: 'slides',
        attributes: {
          content: '# new slide'
        }
      }
    });

    return newDeck;
  });

  this.get('/slides', ({ slide }, request)  => {
    const id = request.queryParams['filter[id]'];

    let lookupId;
    slide.all().forEach((slide) => {
      const testId = slide.attrs.id;

      if(testId === id) {
        lookupId = slide.attrs.id;
      }
    });
    return slide.where({id: lookupId});
  });

  this.get('/slides/:id');
  this.patch('/slides/:id');
  // this.get('/decks/:id/slides', () => {
  //   debugger;
  // });

  /*
    Shorthand cheatsheet:

    this.post('/posts');
    this.get('/posts/:id');
    this.put('/posts/:id'); // or this.patch
    this.del('/posts/:id');
  */
}
