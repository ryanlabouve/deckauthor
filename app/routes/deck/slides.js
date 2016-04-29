import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    const deck = this.modelFor('deck');
    return deck.get('slides');
  }
});
