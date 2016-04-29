import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    const deck = this.modelFor('deck');
    return deck.get('slides');
  },

  actions: {
    addSlide() {
      const d = this.modelFor('deck');

      const newSlide = this.store.createRecord('slide', {
        deck: d,
        content: '# A whole new slide'
      });

      newSlide.save().then((slide) => {
        this.transitionTo('deck.slides.slide', slide.get('id'));
      }, (error) => {
        Ember.assert(error);
      });
    }
  }
});
