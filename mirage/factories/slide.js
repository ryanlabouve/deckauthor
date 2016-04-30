import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  content: `# ${faker.name.firstName()}`
});
