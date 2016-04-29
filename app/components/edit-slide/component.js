import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['edit-slide-component'],
  didReceiveAttrs() {
    this.set('_content', this.get('content'));
  },
  actions: {
    toggleMenu() {
      this.$('.edit-slide-container').toggleClass('expanded');
    },
    saveAndUpdate() {
      return this.attrs.saveSlide(this.get('_content'));
    }
  }
});
