import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['edit-slide-component'],
  didReceiveAttrs() {
    this.set('_content', this.get('content'));
  },
  actions: {
    saveAndUpdate() {
      return this.attrs.saveSlide(this.get('_content'));
    }
  }
});
