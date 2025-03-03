const netconf = require('node-netconf');

const router = new netconf.Client({
    host: 'x.x.x.x',
        port: 1000,
    username: 'username',
    password: 'password'
})

const DELIM = ']]>]]>';

var xml = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
'<rpc message-id="101" xmlns="urn:ietf:params:xml:ns:netconf:base:1.0">' +
'<get-config>' +
'<source>' +
'<running/>' +
'</source>' +
'<filter>' +
'<control-construct xmlns="urn:onf:yang:core-model-1-4">' +
'<control-construct-pac xmlns="urn:onf:yang:equipment-augment-1-0">' +
'<external-label/>' +
'</control-construct-pac>' +
'</control-construct>' +
'</filter>' +
'</get-config>' +
'</rpc>' + '\n' + DELIM;

router.open((err) => {
    if (err) {
        throw err;
    }
    router._send(xml,101, (err, reply) => {
        router.close()
        if (err) {
            throw err;
        }
        console.log(JSON.stringify(reply))
    })

})
