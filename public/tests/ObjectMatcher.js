var objectMatchers = {
  toContainObject: function(util, customEqualityTesters) {
    return {
      compare: function(actual, expected) {
        var checks = [];
        var messages = [];
        if(! _.isObject(expected)) {
          checks.push(false);
          messages.push("Expected an object to be passed, but none was given.");
        } else {
          _.each(_.keys(expected), function(key) {
            if(!_.has(actual, key)) {
              checks.push(false);
              messages.push("Expected \"" + JSON.stringify(actual) + "\" to have property: '" + key + "', but it is not present.");
              return;
            }
            if(!util.equals(actual[key], expected[key])) {
              checks.push(false);
              messages.push("Expected " + key + " to be: '" + expected[key] + "' but it was: '" + actual[key] + "'.");
              return;
            }
            checks.push(true);
          });
        }
        var result = {};
        result.pass = _.every(checks, _.identitiy);
        if (!result.pass) {
          result.message = messages.join('\n');
        }
        return result;
      }
    };
  }
};

beforeEach(function() {
  jasmine.addMatchers(objectMatchers);
});
