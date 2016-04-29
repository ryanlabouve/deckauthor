import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('deck', { path: ':uuid' }, function() {
    this.route('slides', function() {
      this.route('slide', { path: ':id' });
    });
  });
});

export default Router;
