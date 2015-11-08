var page = require('webpage').create(),
    system = require('system'),
    address;

if (system.args.length === 1) {
    console.log('Usage: pageload.js <some URL>');
}

address = system.args[1];

page.open(address, function(status) {
    if (status !== 'success') {
        console.log('FAIL to load the address');
    } else {
        page.render('page.png');
    }
    phantom.exit();
});