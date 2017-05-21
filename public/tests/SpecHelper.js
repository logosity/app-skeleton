var fixture;

function loadFixture(path) {
  var html;
  jQuery.ajax({
    url: path,
    success: function(result) {
      html = result;
    },
    async: false
  });
  return $.parseHTML(html);
}

function resetFixture() {
  if (!fixture) {
    var index = $('<div>').append(loadFixture('/index.html')).find('div#app');
    fixture = $('<div class="fixture" style="display: none">').append(index);
    $('body').append(fixture.clone());
  } else {
    $('.fixture').replaceWith(fixture.clone());
  }
}

beforeEach(function() {
  spyOn(window,'onhashchange');
  resetFixture();
});

afterEach(function() {
});
