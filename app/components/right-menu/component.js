import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['right-menu-component'],
  possibleComponents:  ['edit-slide', 'deck-config'],
  currentComponent: 'edit-slide',
  actions: {
    toggleMenu() {
      this.$('.right-menu-container').toggleClass('expanded');
    },
    show(targetComponent) {
      const c = this.get('possibleComponents');
      if (c.indexOf(targetComponent > -1)) {
        this.set('currentComponent', targetComponent);
      }
    }
  }
});
