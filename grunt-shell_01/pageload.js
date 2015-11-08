var page = require('webpage').create(),
    system = require('system'),
    t,
    address;

if (system.args.length === 1) {
    console.log('Usage: pageload.js <some URL>');
}

t = Date.now();
address = system.args[1];

page.open(address, function(status) {
    if (status !== 'success') {
        console.log('FAIL to load the address');
    } else {
    	// サイトのスクリーンショットを作成
        page.render('page.png');
        // ロード時間を出力
        console.log('Loading ' + system.args[1]);
        console.log('Loading time ' + t + 'msec');
    }
    phantom.exit();
});