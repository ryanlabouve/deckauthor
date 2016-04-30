import { test } from 'qunit';
import moduleForAcceptance from 'deckauthor/tests/helpers/module-for-acceptance';

import {
  slideUrl,
  lastSlide
} from '../lib/server-utils';

moduleForAcceptance('Acceptance | slide navigation');

test('navigating some slides', function(assert) {
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
  });

  click('.prev-slide');
  andThen(function() {
    const slide = server.db.slides[3];
    const url = slideUrl(server, slide);

    assert.equal(
      currentURL(),
      url,
      'We can go to the previous slide'
    );
  });

  click('.next-slide');
  andThen(function() {
    const slide = server.db.slides[4];
    const url = slideUrl(server, slide);

    assert.equal(
      currentURL(),
      url,
      'We can go to the next slide'
    );
  });

  click('.next-slide');
  andThen(function() {
    const slide = server.db.slides[4];
    const url = slideUrl(server, slide);

    assert.equal(
      currentURL(),
      url,
      'We cannot go past the last slide'
    );
  });

  click('.prev-slide');
  click('.prev-slide');
  click('.prev-slide');
  click('.prev-slide');
  click('.prev-slide');
  click('.prev-slide');
  click('.prev-slide');
  click('.prev-slide');

  andThen(function() {
    const slide = server.db.slides[0];
    const url = slideUrl(server, slide);

    assert.equal(
      currentURL(),
      url,
      'We cannot go below the first slide'
    );
  });
});
