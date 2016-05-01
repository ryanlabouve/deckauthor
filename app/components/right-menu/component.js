import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['right-menu-component'],
  actions: {
    toggleMenu() {
      this.$('.right-menu-container').toggleClass('expanded');
    }
  }
});
