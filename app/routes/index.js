import Ember from 'ember';
import { v4 } from "ember-uuid";

export default Ember.Route.extend({
  beforeModel() {
    const deck = this.store.createRecord('deck', {
      uuid: v4()
    });

    return deck.save().then((deck) => {
      this.transitionTo('deck', deck.get('uuid'));
    }, (error) => {
      Ember.assert(error);
    });
  }
});
