/**
 * Adapted from: Strapper View Events and Routing
 * http://github.com/benrady/strapper
 * benrady@gmail.com
 * Modified to encodeURI and decodeURI
 * namespaced and elided
 */

var router = {};
router.triggerEvent = function(name, data, elem) {
  (elem || $('#in-view>*')).trigger(name, data);
}

router.changeToView = function(name, data) {
  var newHash = "#" + name;
  if(data) {
    newHash += "-" + data;
  }
  window.location.hash = encodeURI(newHash);
}

router.showView = function(name) {
  router.triggerEvent('viewOpen', name);
  var view = routes()[name](router.viewData());
  $('#in-view').
    empty().
    append(view);
  return view;
}

router.viewData = function() {
  var hash = decodeURI(window.location.hash.split('#')[1]);
  if(hash) {
    var data = hash.split('-');
    data.shift();
    return data.join('-');
  }
}

router.currentView = function() {
  var hash = window.location.hash.split('#')[1];
  if(hash) {
    return hash.split('-')[0];
  }
  return 'home';
}

router.onReady = function() {
  window.onhashchange = function() {
    router.showView(router.currentView());
    return true;
  };
  router.showView(router.currentView());
}
