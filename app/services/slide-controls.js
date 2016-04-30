import Ember from 'ember';

export default Ember.Service.extend({
  socketIOService: Ember.inject.service('socket-io'),

  presentationId: 'A4E0',
  wsaddy: 'localhost:5000',
  sock: null,

  connect({fn}) {
    const socket = this.get('socketIOService').socketFor(this.get('wsaddy'));
    this.set('sock', socket);

    console.log('start the horse and poney show');

    const p = this.get('presentationId');
    socket.on('connect', () => {
      this.set('fn', fn);
      socket.emit('register', {
        presentationId: this.get('presentationId')
      });
    }, this);

    socket.on('navigate', function(data) {
      console.log('web socket telling you to do things');
      this.get('fn')(data);
    }, this);
  },

  command(data) {
    data.presentationId = this.get('presentationId');
    this.get('sock').emit('navigate', data);
  },

  disconnect() {
    this.set('sock', null);
    this.get('socketIOService').closeSocketFor(this.get('wsaddy'));
  }
});
