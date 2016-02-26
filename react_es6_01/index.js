'use_strict';

import React from 'react';
import Router, { Route, NotFoundRoute, DefaultRoute } from 'react-router';
import CommentBox from './components/CommentBox';
import ButtonTest from './components/ButtonTest';
import App from './components/App';

// var App = React.craeteClass({
//   render: function() {
//     return (
//       <div>
//         <header>
//           <ul>
//             <li><Link to='app'>ダッシュボード</Link></li>
//             <li><Link to='inbox'>インボックス</Link></li>
//             <li><Link to='calendar'>カレンダー</Link></li>
//           </ul>
//         </header>
//         <RouteHandler />
//       </div>
//     )
//   }
// });

var routes = (
  <Route name='app' path='/' handler={App}>
    <Route name='inbox' handler={CommentBox} />
    <Route name='calendar' handler={ButtonTest} />
    <DefaultRoute handler={CommentBox} />
  </Route>
);

// Router.run(routes, function(Handler) {
//   React.render(<Handler/>, document.getElementById('container'));
// });

React.render(<Router>{routes}</Router>, document.getElementById('container'));


// React.render(
//   <div>
//   <CommentBox url='comments.json' pollInterval={2000} />
//   <ButtonTest />
//   </div>,
//   document.getElementById('container')
// );


// var Header = React.createClass({
//   render: function () {
//     return (
//       <header>
//         <ul>
//           <li><a href="/">Dashboard</a></li>
//           <li><a href="/inbox">Inbox</a></li>
//           <li><a href="/calendar">Calendar</a></li>
//         </ul>
//         Logged in as Jane
//       </header>
//     );
//   }
// });

// var DashboardRoute = React.createClass({
//   render: function () {
//     return (
//       <div>
//         <Header/>
//         <ButtonTest/>
//       </div>
//     );
//   }
// });

// var InboxRoute = React.createClass({
//   render: function () {
//     return (
//       <div>
//         <Header/>
//         <CommentBox/>
//       </div>
//     );
//   }
// });

// var CalendarRoute = React.createClass({
//   render: function () {
//     return (
//       <div>
//         <Header/>
//         <CommentBox/>
//         <ButtonTest/>
//       </div>
//     );
//   }
// });

// otherRouter.route('/', function () {
//   React.render(<DashboardRoute/>, document.body);
// });

// otherRouter.route('/inbox', function () {
//   React.render(<InboxRoute/>, document.body);
// });

// otherRouter.route('/calendar', function () {
//   React.render(<CalendarRoute/>, document.body);
// });