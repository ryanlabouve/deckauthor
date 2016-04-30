import { Factory, faker } from 'ember-cli-mirage';
import { v1, v4 } from "ember-uuid";

export default Factory.extend({
  name: 'Name',
  uuid: v4()
});
