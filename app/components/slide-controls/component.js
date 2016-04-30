import Ember from 'ember';

export default Ember.Component.extend({
  routing: Ember.inject.service('-routing'),
  didReceiveAttrs() {
    // debugger;
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
      }
    },

    nextSlide() {
      const c = this.get('grabDetails')(this);
      // if there's a next element, return it
      // otherwise do nothing
      if (c.currentSlideIndex + 1 < c.length) {

        const newId = c.slidesMap[c.currentSlideIndex + 1];
        c.router.transitionTo(c.name, newId);
      }
    }
  }
});
