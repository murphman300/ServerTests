let snksocket = require('snksocket');
let snk = new snksocket;
let TLS = snk.tlsHost;
let TCP = snk.socket;
const fs = require('fs');

/*let host = new TLS({
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.crt'),
    ca: [ fs.readFileSync('CAchain.pem') ]
});

host.on('protect', function (data) {
    console.log(data);
});

host.start(8000);*/

let host = new TCP();

host.listen(8000);

