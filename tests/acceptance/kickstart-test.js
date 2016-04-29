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

    const lastDeck = server.db.decks[server.db.decks.length -1];
    const lastSlide = server.db.slides[server.db.slides.length-1];

    assert.equal(
      currentURL(),
      `/${lastDeck.data.attributes.uuid}/slides/${lastSlide.id}`,
      'Should redirect to the correct UUID'
    );

    assert.equal(
      find('.current-slide-content').text().trim(),
      lastSlide.data.attributes.content,
      'We see the dummy slide content on screen'
    );


  });
});
