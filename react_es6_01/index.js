'use_strict';

import React from 'react';
import CommentBox from './components/CommentBox';

let data = {
  genreStations: {
    stations: [
      {
        seed: {
          genre: 'p-o-p',
        },
      },
      {
        seed: {
          genre: 'r-o-c-k',
        },
      },
    ],
  },
};

React.render(
  <CommentBox url='comments.json' pollInterval={2000} />,
  document.getElementById('container')
);

function setTimeoutAsync(delay) {
  return new Promise(function(resolve, reject) {
    setTimeout(resolve, delay);
  });
}

var temp = setTimeoutAsync(1000)
  .then(function(e) {
    console.log('promise', e);
  })
  .then(function() {
    return new Promise(function(resolve, reject) {
      console.log('promise2');
      resolve();
    })
  })
  .then(function() {
    console.log('done');
  });

console.log(temp);