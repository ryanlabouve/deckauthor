import Ember from 'ember';

export default Ember.Route.extend({
  model({uuid}) {
    return this.store.query('deck', { 'filter[uuid]': uuid }).then((decks) => {
      // debugger;
      return decks.get('firstObject');
    });
  },

  // afterModel(model) {
  //   debugger;
  // }
});
