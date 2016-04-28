import { test } from 'qunit';
import moduleForAcceptance from 'deckauthor/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | kickstart');

test('visiting /kickstart', function(assert) {
  visit('/');

  andThen(function() {
    assert.notEqual(currentURL(), '/');
    const UUID_REGEX = /\/[0-9a-f]{8}-([0-9a-f]{4}-){3}[0-9a-f]{12}/i;
    assert.equal(
      UUID_REGEX.test(currentURL()),
      true,
      'Should redirect to UUID'
    );
  });
});
