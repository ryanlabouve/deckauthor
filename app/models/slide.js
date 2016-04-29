import Model from 'ember-data/model';
import DS from 'ember-data';

export default Model.extend({
  deck: DS.belongsTo('deck', { async: true }),
  content: DS.attr('string')
});
