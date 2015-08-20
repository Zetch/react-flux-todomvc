import { Dispatcher } from 'flux';


const TodoDispatcher = new Dispatcher();

TodoDispatcher.handleViewAction = function(action) {
  let payload = {
    source: 'VIEW_ACTION',
    action: action
  };
  console.debug(JSON.stringify(payload));
  this.dispatch(payload);
};

export default TodoDispatcher;