import Ember from 'ember';

export function slideUrl(server, slide) {
  const deck = server.db.decks.find(slide.deckId);
  const deckUuid = Ember.get(deck, 'uuid') ||
                   Ember.get(deck, 'data.attributes.uuid');
  return `/${deckUuid}/slides/${slide.id}`;
}

export function lastSlide(server) {
  const lastSlideIndex = server.db.slides.length - 1;
  const lastSlide = server.db.slides[lastSlideIndex];
  return lastSlide;
}

export function lastDeck(server) {
  const lastDeckIndex = server.db.decks.length -1;
  const lastDeck = server.db.decks[lastDeckIndex];
  return lastDeck;
}

