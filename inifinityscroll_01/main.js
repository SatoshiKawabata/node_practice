/** @jsx React.DOM */
// no JSX without changing the script tag type :(

/*! react-infinite-scroll - v 0.1.3 - guillaumervls 2014-04-07 */
!function a(b,c,d){function e(g,h){if(!c[g]){if(!b[g]){var i="function"==typeof require&&require;if(!h&&i)return i(g,!0);if(f)return f(g,!0);throw new Error("Cannot find module '"+g+"'")}var j=c[g]={exports:{}};b[g][0].call(j.exports,function(a){var c=b[g][1][a];return e(c?c:a)},j,j.exports,a,b,c,d)}return c[g].exports}for(var f="function"==typeof require&&require,g=0;g<d.length;g++)e(d[g]);return e}({1:[function(a,b){function c(a){return a?a.offsetTop+c(a.offsetParent):0}b.exports=function(a){if(a.addons&&a.addons.InfiniteScroll)return a.addons.InfiniteScroll;a.addons=a.addons||{};var b=a.addons.InfiniteScroll=a.createClass({getDefaultProps:function(){return{pageStart:0,hasMore:!1,loadMore:function(){},threshold:250,loader:b._defaultLoader}},componentDidMount:function(){this.pageLoaded=this.props.pageStart,this.attachScrollListener()},componentDidUpdate:function(){this.attachScrollListener()},render:function(){var b=this.props;return a.DOM.div(null,b.children,b.hasMore&&b.loader)},scrollListener:function(){var a=this.getDOMNode(),b=void 0!==window.pageYOffset?window.pageYOffset:(document.documentElement||document.body.parentNode||document.body).scrollTop;c(a)+a.offsetHeight-b-window.innerHeight<Number(this.props.threshold)&&(this.detachScrollListener(),this.props.loadMore(this.pageLoaded+=1))},attachScrollListener:function(){this.props.hasMore&&(window.addEventListener("scroll",this.scrollListener),window.addEventListener("resize",this.scrollListener),this.scrollListener())},detachScrollListener:function(){window.removeEventListener("scroll",this.scrollListener),window.removeEventListener("resize",this.scrollListener)},componentWillUnmount:function(){this.detachScrollListener()}});return b.setDefaultLoader=function(a){b._defaultLoader=a},b}},{}],2:[function(a){var b=a("./react-infinite-scroll");"function"==typeof define&&define.amd?define(["react"],function(a){return b(a)}):(window.React.addons=window.React.addons||{},window.React.addons.InfiniteScroll=b(window.React))},{"./react-infinite-scroll":1}]},{},[2]);

function createDiv(page) {
  return React.DOM.div({
    className: 'item',
    style: {
      backgroundColor: '#'+(Math.random()*0xFFFFFF<<0).toString(16)
    }
  }, page + 1)
}

var Wrapper = React.createClass({
  
  getInitialState: function() {
    return {
      hasMore: true,
      items: [createDiv(0)]
    };
  },
  loadMore: function(page) {
    console.log('load');
    setTimeout(function() {
      this.setState({
        items: this.state.items.concat([createDiv(page)]),
        hasMore: (page < 1000)
      });
    }.bind(this), 100);
  },
  render: function() {
    console.log('render');
    var InfiniteScroll = React.addons.InfiniteScroll;
    return React.DOM.div({
      className: "scroll-holder"
    },
    InfiniteScroll({
      pageStart: 0,
      loadMore: this.loadMore,
      hasMore: this.state.hasMore,
      loader: React.DOM.div({
        className: "loader"
      }, " - ")
    },
    this.state.items))
  }
});

React.renderComponent(Wrapper(), document.body);
    