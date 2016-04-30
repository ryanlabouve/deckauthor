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

  const slide = lastSlide(server);
  const url = slideUrl(server, slide);
  visit(url);

  // go next
  // go prev
  // cannot go prev below 0
  // cannot exceed length
  // does not freak out with one slide
  // does not freak out with zero slides
  andThen(function() {
    assert.equal(
      currentURL(),
      url,
      'We can see the last slide first'
    );
  });
});
