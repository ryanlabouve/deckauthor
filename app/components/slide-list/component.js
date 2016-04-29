import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['slide-list-component'],
  actions: {
    toggleMenu() {
      this.$('.slide-list-container').toggleClass('expanded');
    }
  }
});
