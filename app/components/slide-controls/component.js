import Ember from 'ember';
import { EKMixin, keyDown, getKey } from 'ember-keyboard';

export default Ember.Component.extend(EKMixin, {
  slideControls: Ember.inject.service(),

  activateKeyboard: Ember.on('init', function() {
    this.set('keyboardActivated', true);
  }),

  keyboardNav: Ember.on(keyDown('ArrowLeft'), keyDown('ArrowRight'), function() {
    const key = getKey(event);
    switch (key) {
      case 'ArrowLeft':
        const prev = this.get('actions.prevSlide');
        prev.apply(this);
        break;
      case 'ArrowRight':
        const next = this.get('actions.nextSlide');
        next.apply(this);
        break;
    }
  }),
  didInsertElement() {
    this.get('slideControls').connect({
      fn: (data) => {
        this.remoteNavigate(data);
      }
    });
  },

  willDestroyElement() {
    this.get('slideControls').disconnect();
  },

  didReceiveAttrs() {
    // debugger;
  },

  remoteNavigate({slideId, routeName}) {
    const c = this.grabDetails(this);
    c.router.transitionTo(routeName, slideId);

  },

  grabDetails(self) {
    const router = Ember.getOwner(self).lookup('router:main').router;

    const handlerInfo = router.currentHandlerInfos;
    const name = handlerInfo[3].name;
    const id = handlerInfo[3].params.id;
    const slides = self.get('slides');
    const length = slides.get('length');

    const slidesMap = slides.map((slide) => {
      return slide.get('id');
    });
    const currentSlideIndex = slidesMap.indexOf(id);

    return {
      router,
      handlerInfo,
      name,
      id,
      slides,
      length,
      slidesMap,
      currentSlideIndex
    };
  },
  actions: {
    prevSlide() {
      const c = this.get('grabDetails')(this);
      // if there's a previous element, return it
      if (c.currentSlideIndex !== 0) {
        const newId = c.slidesMap[c.currentSlideIndex - 1];
        console.log('go to prev', newId);
        c.router.transitionTo(c.name, newId);

        this.get('slideControls').command({
          routeName: c.name,
          slideId: newId
        });
      }
    },

    nextSlide() {
      const c = this.get('grabDetails')(this);
      // if there's a next element, return it
      // otherwise do nothing
      if (c.currentSlideIndex + 1 < c.length) {

        const newId = c.slidesMap[c.currentSlideIndex + 1];
        c.router.transitionTo(c.name, newId);

        this.get('slideControls').command({
          routeName: c.name,
          slideId: newId
        });
      }
    }
  }
});
