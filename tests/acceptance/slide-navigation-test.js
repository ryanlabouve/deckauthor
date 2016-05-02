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
  //
  //
  // Perform the tests again but with the key commands
  //
  //
  // click('.prev-slide');

  const initialSlide2 = lastSlide(server);
  const initialUrl2 = slideUrl(server, initialSlide2);

  visit(initialUrl2);

  andThen(function() {
    const slide = lastSlide(server);
    const url = slideUrl(server, slide);

    assert.equal(
      currentURL(),
      url,
      'We can see the last slide first (for the keyboard commands'
    );
  });
  keyDown('ArrowLeft');
  andThen(function() {
    const slide = server.db.slides[3];
    const url = slideUrl(server, slide);

    assert.equal(
      currentURL(),
      url,
      'We can go to the previous slide'
    );
  });

  // click('.next-slide');
  keyDown('ArrowRight');
  andThen(function() {
    const slide = server.db.slides[4];
    const url = slideUrl(server, slide);

    assert.equal(
      currentURL(),
      url,
      'We can go to the next slide'
    );
  });

  // click('.next-slide');
  keyDown('ArrowRight');
  andThen(function() {
    const slide = server.db.slides[4];
    const url = slideUrl(server, slide);

    assert.equal(
      currentURL(),
      url,
      'We cannot go past the last slide'
    );
  });

  // click('.prev-slide');
  keyDown('ArrowLeft');
  keyDown('ArrowLeft');
  keyDown('ArrowLeft');
  keyDown('ArrowLeft');
  keyDown('ArrowLeft');
  keyDown('ArrowLeft');
  keyDown('ArrowLeft');
  keyDown('ArrowLeft');
  keyDown('ArrowLeft');

  andThen(function() {
    const slide = server.db.slides[0];
    const url = slideUrl(server, slide);

    assert.equal(
      currentURL(),
      url,
      'We cannot go below the first slide'
    );
  });

  keyDown('ArrowDown');

  andThen(function () {
    const slide = server.db.slides[4];
    const url = slideUrl(server, slide);

    assert.equal(
      currentURL(),
      url,
      'We can go directly to the last slide'
    );
  });

  keyDown('ArrowUp');

  andThen(function () {
    const slide = server.db.slides[0];
    const url = slideUrl(server, slide);

    assert.equal(
      currentURL(),
      url,
      'We can go directly to the first slide'
    );
  });
});
