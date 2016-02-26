var Rx = require('rx');


function test_helloRx() {
  Rx.Observable.from([1,2,3,4,5,6,7,8,9,10])
    .filter(function(num) {
      return num%2;
    }).subscribe(function() {
      console.log('on stream');
    });
}

function test_observerAndObservable() {
  var source = Rx.Observable.create(function(observer) {
    var num = 0;
    var id = setInterval(function() {
      observer.onNext(num++);
    }, 1000);

    setTimeout(function() {
      observer.onCompleted();
    }, 5000);

    return function() {
      console.log('observable is disposed');
      clearInterval(id);
    };
  });

  function onNext(x) {
    console.log('onNext: ', x, subscription);
  }

  function onError(e) {
    console.log('onError: ', e);
  }

  function onCompleted() {
    console.log('observer onCompleted', subscription);
  }

  var subscription = source.subscribe(onNext, onError, onCompleted);

  setTimeout(function() {
    subscription.dispose();
    console.log('observable disposed', subscription);
  }, 2000);
}


function test_coldObservable() {
  var source = Rx.Observable.interval(1000);
  // １つ目のsubscriptionが作られる
  var subscription1 = source.subscribe(function(x) {
    // onNext
    console.log('Observer1: onNext ', x);
  });
  var subscription2;

  setTimeout(function() {
    // この時点で新たにsubscriptionが作られる
    subscription2 = source.subscribe(function(x) {
      console.log('Observer2: onNext ', x);
    });
  }, 2000);
}


function test_hotObservable() {
  var sourceObservable = Rx.Observable.interval(1000);
  // 1つのObservableを複数のObserverで共有する
  var hotObservable = sourceObservable.publish();

  var subscription1 = hotObservable.subscribe(function(x) {
    console.log('Observer1: onNext ', x);
  });

  console.log('subscription1 createdAt ', Date.now());

  setTimeout(function() {
    hotObservable.connect();

    console.log('connect at ', Date.now());

    setTimeout(function() {
      var subscription2 = hotObservable.subscribe(function(x) {
        console.log('Observer2: onNext ', x);
      });
      console.log('subscription2 createdAt ', Date.now());
    }, 3000);
  }, 3000);
}


function test_subject() {
  var subject = new Rx.Subject();

  var subscription = subject.subscribe(
    function(x) { console.log('onNext ', x); },
    function(e) { console.log('onError ', e); },
    function() { console.log('onCompleted '); });

  subject.onNext(1);
  subject.onNext(2);
  subject.onNext(3);
  subscription.dispose();
  subject.onCompleted();
}

function test_subjectForBroadcast() {
  var source = Rx.Observable.interval(1000);

  var subject = new Rx.Subject();
  var subSource = source.subscribe(subject);

  var subSubject1 = subject.subscribe(
    function(x) { console.log('Value published to Observer1', x); },
    function(e) { console.log('onError ', e); },
    function() { console.log('onCompleted subject1'); });

  var subSubject2 = subject.subscribe(
    function(x) { console.log('Value published to Observer2', x); },
    function(e) { console.log('onError ', e); },
    function() { console.log('onCompleted subject2'); });

  setTimeout(function(){
    subject.onCompleted();
    subSubject1.dispose();
    subSubject2.dispose();
  }, 5000);
}

function test_scheduler() {
  var source = Rx.Observable.create(function(observer) {
    console.log('subscribe function');

    var i = 0;
    while(i++ < 3) {
      observer.onNext(i);
    }
    observer.onCompleted();
  });

  source = source.subscribeOn(Rx.Scheduler.timeout);
  // source = source.observeOn(Rx.Scheduler.timeiut);

  console.log('in-between');
  source.subscribe(
    function(num) {
      console.log('onNext ', num);
    },
    null,
    function() {
      console.log('onCompleted');
    });
  console.log('EOF');
}

test_scheduler();

























