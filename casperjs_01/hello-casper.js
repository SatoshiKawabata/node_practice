var casper = require("casper").create();

// 送信する User-Agent ヘッダを普段使っているブラウザに合わせる
// 開発者ツールのコンソールに navigator.userAgent と打ち込むと出る
casper.userAgent("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_2) AppleWebKit/537.74.9 (KHTML, like Gecko) Version/7.0.2 Safari/537.74.9");

// 指定した URL へ遷移する
casper.start("https://www.google.co.jp/search?q=%E3%81%99%E3%81%9A%E3%82%81&source=lnms&tbm=isch");

// ページが読み込まれたときに実行されるコールバック
casper.then(function() {
	// 画面のキャプチャを suzumekawaii.png というファイルに保存する
	casper.capture("suzumekawaii.png");
});

// 処理を開始する
casper.run();