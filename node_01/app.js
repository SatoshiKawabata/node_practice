// function sleep(callback) {
//   setTimeout(function() {
//     callback(null, '現在時刻' + new Date());
//   }, 1000);
// }

// sleep(function(err, res) {
//   console.log(res);
//   sleep(function(err, res) {
//     console.log(res);
//       sleep(function(err, res) {
//       console.log(res);
//     });
//   });
// });

// console.log('start');


function puts(str) {
  // Promiseコンストラクタを new してPromiseオブジェクトを返す
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      resolve(str);
    }, 1000);
  });
}

// 返ってきたPromiseオブジェクトに対して .then で値が返ってきた時のコールバックを設定する
puts('async').then(function(result) {
  console.log(result);
});

var promise = new Promise(function(resolve, reject) {
  // 非同期処理のエントリポイント(仮にrequest関数とします)
  request(function(err, res) {
    if (err) {
      reject(err);
    } else {
      resolve(res);
    }
  });
});

promise
  .then(function(res) {
    // 成功
  })
  .catch(function(err) {
    // 失敗
  });

// console.log('end', prom);

function testAsync() {

  function getURL(url) {
    // Promiseコンストラクタをnewしてpromiseオブジェクトを返す
    return new Promise(function(resolve, reject) {
      const https = require('https');
      https.get(url, function(res) {
        if (res.statusCode === 200) {
          res.on('data', function(chunk) {
            // 成功
            resolve(chunk);
          });
        } else {
          // 失敗
          reject(new Error(res.statusCode));
        }
      }).on('error', function(e) {
        reject(new Error(e.message));
      });
    });
  }

  const URL = 'https://www.google.co.jp';
  // promiseオブジェクトに対してコールバックを設定
  getURL(URL).then(function onFullfilled(value) {
    console.log('success', value);
  }).catch(function onRejected(error) {
    console.error(error);
  });
}


function testSync() {
const treble = function(number) {
  return new Promise(function(resolve) {
    resolve(number * 3);
  });
}
const dump = function(number) {
  console.log(number);
  return number;
}
treble(10)
  .then(treble)
  .then(dump)
  .then(treble)
  .then(dump)
  .then(treble)
  .then(dump)
  .then(treble)
  .then(dump)
  .then(treble)
  .then(dump);
}


function testParallel() {

function puts(str) {
  return new Promise(function(resolve) {
    setTimeout(function() {
      resolve(str);
    }, 1000);
  });
}

var promises = [
  puts(1),
  puts(2),
  puts(3),
];

Promise.all(promises).then(function(results) {
  console.log(results);
});

console.log('end');
}

testParallel();
















