let snksocket = require('snksocket');
let snk = new snksocket;
let TLS = snk.tlsHost;
let TCP = snk.socket;
const fs = require('fs');


String.prototype.parseFor = function (value, applyTo, result) {
    let index = this.split(value);
    if (index.length === 2) {
        if (applyTo) {
            if (index[0] === "port") {
                applyTo[index[0]] = Number(index[1]);
            } else {
                applyTo[index[0]] = String(index[1]);
            }
            return
        }
        let ob = Object();
        ob[index[0]] = index[1];
        result(ob);
    }
};

process.env.TYPE_PROCESS = "MAIN";

function Perform() {
    return new Promise(function (finished) {
        fs.readFile('./serverConfig.json', async function (err, data) {
            if (err) {
                if (err.toString().indexOf("ENOENT: no such file or directory") !== -1) {
                    //run some script to load the data or to apply from another js file.
                }
                return finished(Promise.reject())
            }

            try {
                let config = await JSON.parse(data);

                if (config.port && typeof config.port === 'number') await processFrom("port", config.port);

                if (config.host && typeof config.host === 'string') await processFrom("host", config.host);
                return finished(Promise.resolve())
            } catch(e) {
                return finished(Promise.reject(e))
            }
            async function processFrom(key, value) {
                switch (key) {
                    case "port":
                        process.env.port = value;
                        break;
                    case "host":
                        process.env.host = value;
                        break;
                    default:
                        break
                }
            }
        })
    })

}

function StartServer() {
    console.log('Starting...');
    try {
        let start = Begin();
        process.env.HAS_STARTED = "yes"
    } catch(e) {
        console.log(e);
    }

    async function Begin() {
        try {

            let host = new TCP();

            host.listen(process.env.port);

        } catch(e) {
            throw "Begin ERROR : " + e;
        }
    }
}

async function Go() {
    try {
        await Perform();
        StartServer();
    } catch(e) {
        console.log(e);
    }
}

let t = Go();



