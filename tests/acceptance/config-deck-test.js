import { test } from 'qunit';
import moduleForAcceptance from 'deckauthor/tests/helpers/module-for-acceptance';

import {
  slideUrl,
  lastSlide
} from '../lib/server-utils';

moduleForAcceptance('Acceptance | config deck');

test('That we can configure a deck', function(assert) {
  const d = server.create('deck');
  server.createList('slide', 5, {
    deckId: d.id
  });

  const initialSlide = lastSlide(server);
  const initialUrl = slideUrl(server, initialSlide);

  visit(initialUrl);

  andThen(function() {
    const slide = lastSlide(server);
    const url = slideUrl(server, slide);

    assert.equal(
      currentURL(),
      url,
      'We can see the last slide first'
    );

    assert.equal(
      find('.deck-config-component').length,
      0,
      'We cannot see the deck config component by default'
    );

    assert.equal(
      find('.deck-config-link').length,
      1,
      'We can see a link to open deck config'
    );
  });

  click('.deck-config-link');


  andThen(function() {
    ['.deck-config-component',
      '.deck-config__title',
      '.deck-config__theme'
    ].forEach(function(selector) {

      assert.equal(
        find(selector).length,
        1,
        `We can now see the selector ${selector}`
      );
    });


  });

});
