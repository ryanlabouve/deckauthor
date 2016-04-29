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

    assert.equal(
      find('.slide-list-component').length,
      1,
      'We should see a list of slides'
    );

    assert.equal(
      find('.slide-list-component .slide-list-li').length,
      server.db.slides.length,
      'We should see the right number of slides'
    );

    assert.equal(
      find('.add-slide-button').length,
      1,
      'There\'s a button to add slides'
    );
  });

  click('.add-slide-button');

  andThen(function() {
    const s = server.db.slides;
    const lastDeck = server.db.decks[server.db.decks.length -1];
    const lastSlide = server.db.slides[server.db.slides.length-1];
    assert.equal(
      s.length,
      // currentSlidesLength + 1,
      2,
      'We added a slide!'
    );

    assert.equal(
      currentURL(),
      `/${lastDeck.data.attributes.uuid}/slides/${lastSlide.id}`,
      'should transition to new slide'
    );
  });
});
