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

  actions: {
    saveSlide(content) {
      const m = this.modelFor('deck.slides.slide');
      m.set('content', content);
      m.save().then((m) => {
        console.log('YEY. saved', m);
      }, (error) => {
        Ember.assert(error);
      });
    }
  }

  // afterModel(model) {
  //   debugger;
  // }
});
