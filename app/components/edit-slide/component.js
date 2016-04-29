import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['edit-slide-component'],
  actions: {
    toggleMenu() {
      this.$('.edit-slide-container').toggleClass('expanded');
    }
  }
});
