import { test } from 'qunit';
import moduleForAcceptance from 'deckauthor/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | kickstart');

test('visiting /kickstart', function(assert) {
  visit('/');

  andThen(function() {
    assert.notEqual(currentURL(), '/');
  });
});
