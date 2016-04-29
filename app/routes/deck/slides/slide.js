import Ember from 'ember';

export default Ember.Route.extend({
  model({ id }) {
    // const m = this.modelFor('slides');
    return this.store.queryRecord('slide', { 'filter[id]': id }).then((slides) => {
      const slide = slides.get('firstObject');
      Ember.assert('Should have slide loaded, but not found', slide);
      return slide;

    });
  },

  // afterModel(model) {
  //   debugger;
  // }
});
