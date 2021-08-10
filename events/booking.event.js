const eventEmitter = require('./index')

// patient needs to listen to this event
function bookingEventHandler(request, response, next) {
    console.log('event', request.params)

    const id = request.params.id

    const headers = {
      'Content-Type': 'text/event-stream',
      'Connection': 'keep-alive',
      'Cache-Control': 'no-cache'
    };


    response.writeHead(200, headers);
    response.write(`connected here so move on\n\n`);
    //whenever there is an event called that booking has been called
    // push data to the client ( i.e frontend)
    eventEmitter.on(`booking.call.${id}`, (data) => {
        const displayData = `data: ${JSON.stringify(data)}\n\n`;
        response.write(displayData);
      
    });
  

    request.on('close', () => {
    //   console.log(`${clientId} Connection closed`);
    //   clients = clients.filter(client => client.id !== clientId);
    });
  }
  

module.exports = {bookingEventHandler}