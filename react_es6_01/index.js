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
