var page = require('webpage').create(),
    system = require('system'),
    t,
    outName,
    address,
    // 元のサイトの速度
    ORIGIN_TIME = 176;//247;

if (system.args.length === 1) {
    console.log('Usage: pageload.js <some URL>');
}

t = Date.now();
address = system.args[1];
outName = system.args[2];

page.open(address, function(status) {
    if (status !== 'success') {
        console.log('FAIL to load the address');
    } else {
        t = Date.now() - t;
        
        // ロード時間を出力
        console.log('Loading ' + system.args[1]);
        console.log('Loading time ' + t + 'msec');

        console.log('--------------------------------------------------------\n');
        var diff = t - ORIGIN_TIME;
        console.log('result: current - origin = ' + diff);
        console.log('\n--------------------------------------------------------');

        // サイトのスクリーンショットを作成
        page.render('test/' + outName + '.png');
    }
    phantom.exit();
});