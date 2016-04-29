import { test } from 'qunit';
import moduleForAcceptance from 'deckauthor/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | edit slides');

test('visiting /edit-slides', function(assert) {
  visit('/');

  andThen(function() {
    const lastDeck = server.db.decks[server.db.decks.length -1];
    const lastSlide = server.db.slides[server.db.slides.length-1];
    assert.equal(
      currentURL(),
      `/${lastDeck.data.attributes.uuid}/slides/${lastSlide.id}`,
      'We are on an interesting slide'
    );

    assert.equal(
      find('.edit-slide-component').length,
      1,
      'We can see an edit pane'
    );

    assert.equal(
      find('.edit-slide-component .slide-content').length,
      1,
      'We can see an edit pane\'s edit textarea'
    );

    assert.equal(
      find('.edit-slide-component .slide-content').val(),
      lastSlide.content,
      'Edit text pane should have correct slide value'
    );
  });
  fillIn('.edit-slide-component .slide-content', '# asdf')

  andThen(function() {
    const convertor = new window.showdown.Converter();
    const dummyMdToHtml = convertor.makeHtml('# asdf');

    assert.equal(
      find('.current-slide-content .ember-view').html().trim(),
      dummyMdToHtml,
      'We see the dummy slide content on screen'
    );
  });


});
