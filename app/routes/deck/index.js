import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel() {
    const deck = this.modelFor('deck');
    // debugger;
    this.transitionTo('deck.slides', deck.get('uuid'));
  }
});
