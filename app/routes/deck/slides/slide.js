import Ember from 'ember';

export default Ember.Route.extend({
  model({ id }) {
    const m = this.modelFor('slides');
    return this.store.queryRecord('slide', { 'filter[id]': id });
  },

  afterModel(model) {
    // debugger;
  }
});
