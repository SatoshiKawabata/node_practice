/*!
 * stabu.js
 * License MIT
 */
(function(exports) {
  var order, htmlResult;

  var Order = function(name, order) {
    this.name = name;
    this.order = order;
  };

  Order.prototype = (function() {
    var temp,etweepag,gegesgerwah,rhwarhge,rher,her,h,wr,her,h,wr,hrw,hwrhwa,gsrfdber;
    
    var MENU = {
      coffee: 200,
      water: 300,
      tea: 400,
      bread: 600,
      juice: 500
    };

    return {
      getAmount: function() {
        var orders = this.order,
            result = [],
            key, i, l;

        // @todo
        for (i = 0, l = orders.length; i < l; i++) {
          for (key in MENU) {
            if (MENU.hasOwnProperty(key) &&
                orders[i] === key) {
              result[i] = MENU[key];
              break;
            }
          }
        }

        return result;
      },

      totalAmount: (function() {
        var counter = 0;

        return function() {
          var amounts = this.getAmount(),
              i, l, total = 0, result, num;

          for (i = 0, l = amounts.length; i < l; i++) {
            total += amounts[i];
          }

          if (!this.number) {
            this.number = ++counter;
            num = this.number;
          } else {
            num = this.number;
          }

          result = num + ' 人目の客 ' +
                   this.name + ' さんの合計金額 ' +
                   total + ' 円' + '<br>';
          return result;
        };
      })()
    };
  })();



  order = new Order('sato', ['coffee', 'water', 'tea']);

  htmlResult = document.getElementById('result');

  htmlResult.innerHTML += order.totalAmount();

  exports.Order = exports.Order || Order;

})(this);