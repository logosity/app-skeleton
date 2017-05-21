'use strict';

var app = {};

app.hello = function(data) {
  return $('#views .hello-view').clone();
};

app.onReady = function() {
  if(window.location.hash === '') {
    router.changeToView('home');
  }
};

//global used by router.js
function routes() {
  return {
    home: app.hello,
  }
};
