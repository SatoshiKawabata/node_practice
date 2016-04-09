var client = require('cheerio-httpcli');

// Googleで「node.js」について検索する。
// http://realtime.search.yahoo.co.jp/search?p=awa+pc&ei=UTF-8
client.fetch('http://realtime.search.yahoo.co.jp/search', {
    // q: 'p=awa+pc&ei=UTF-8',
    p: 'あのラボ',
    ei: 'UTF-8'
  }, function (err, $, res) {
  if (err) {
    console.log(err);
    return;
  }
  // // レスポンスヘッダを参照
  // console.log(res.headers);
  //
  // // HTMLタイトルを表示
  // console.log($('title').text());
  //
  // // リンク一覧を表示
  $('.cnt').each(function (idx) {
    console.log('----');
    console.log($(this).html());
  });

  // $('.cnt').each(function(idx) {
  //   this.children.forEach(function(elm) {
  //     // console.log(elm);
  //     if (elm.name === 'h2') {
  //       console.log('---------------------------------');
  //       console.log(elm.html());
  //       elm.children.forEach(function(child) {
  //         // console.log(child);
  //       });
  //     }
  //   });
  // });


  // console.log($('.cnt'));
  // console.log($.html());
});
