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

async function Begin() {

    try {

        let file = await fs.readFileSync('serverConfi.json');

        let config = JSON.parse(file);

        if (!config.port) throw 'Missing PORT';

        if (!config.host) throw 'Missing host';

        let host = new TCP();

        host.listen(8000);

    } catch(e) {
        throw "Begin ERROR : " + e;
    }
}


try {

    let start = Begin();

} catch(e) {
    console.log(e);
}

