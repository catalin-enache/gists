const net = require('net');

host = '127.0.0.1';
port = 2345;

const client = net.connect({port, host}, () => {
  console.log('connected to server!');
  client.write('js client here js');
});
client.on('data', (data) => {
  console.log(data.toString());
  client.end();
});
client.on('end', () => {
  console.log('disconnected from server');
});