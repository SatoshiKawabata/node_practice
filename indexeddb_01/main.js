var module = {
  db: null,
  renderer: function(todo) {
    var li = document.createElement('li');
    li.innerHTML = todo.text + ':' + todo.timeStamp;
    document.getElementById('todo-list').appendChild(li);
  }
};

// 初期化メソッド
module.init = function() {
  // DBをopenするリクエスト
  var req = window.indexedDB.open('my_db', 103);
  req.onupgradeneeded = function(ev) {
    console.log(ev);
    var db = ev.target.result;
    ev.target.transaction.onerror = function(err) {
      conrole.log('XXX0', err);
    };

    if (db.objectStoreNames.contains('todo')) {
      db.deleteObjectStore('todo');
    }

    var store = db.createObjectStore('todo', { keyPath: 'timeStamp' });
    console.log('XXX1', store);
  }

  req.onsuccess = function(ev) {
    module.db = (ev.target) ? ev.target.result : ev.result;
    module.getAll(module.renderer);
    console.log('module.db', module.db);
  };
};

// TODOを追加する
module.addTodo = function(text) {
  var db = module.db;
  var tx = db.transaction(['todo'], 'readwrite');
  var store = tx.objectStore('todo');
  var req = store.put({
    text: text,
    timeStamp: Date.now()
  });
  tx.oncomplete = function() {
    module.getAll(module.renderer);
  }
  tx.onerror = function(err) {
    console.log('XXX2', err);
  }
}

// TODOを取得する
module.getAll = function(renderer) {
  if (renderer) {
    document.getElementById('todo-list').innerHTML = '';
  }
  var db = module.db;
  var tx = db.transaction(['todo'], 'readwrite');
  var store = tx.objectStore('todo');
  var range = IDBKeyRange.lowerBound(0);
  var cursorRequest = store.openCursor(range);
  cursorRequest.onsuccess = function(e) {
    var result = e.target.result;
    if (!!result == false) {
      return;
    }
    console.log(result.value);
    if (renderer) {
      renderer(result.value);
      result.continue();
    }
  }
  cursorRequest.onerror = function(err) {
    console.log('XXX3', err);
  }
};

// 外から呼ばれるメソッド
module.add = function() {
  var text = document.getElementById('todo-text').value;
  module.addTodo(text);
};

// エントリポインt
(function() {
  module.init();
})();
