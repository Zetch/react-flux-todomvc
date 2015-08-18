var Dispatcher = require('flux').Dispatcher;

var TodoDispatcher = new Dispatcher();

TodoDispatcher.handleViewAction = function(action) {
  var payload = {
    source: 'VIEW_ACTION',
    action: action
  };
  console.debug(JSON.stringify(payload));
  this.dispatch(payload);
};

module.exports = TodoDispatcher;