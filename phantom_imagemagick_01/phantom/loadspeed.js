var page = require('webpage').create(),
    system = require('system'),
    t,
    adress;

if (system.args.length === 1) {
    console.log('Usage: loadspeed.js <some URL>');
}

t = Date.now();
address = system.args[1];

page.open(address, function(status) {
    if (status !== 'success') {
        console.log('FAIL to load the address');
    } else {
        t = Date.now() - t;
        console.log('Loading ' + system.args[1]);
        console.log('Loading time ' + t + 'msec');

        origin_speed = t;
    }
    phantom.exit();
});
