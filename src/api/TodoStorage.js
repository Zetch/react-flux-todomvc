
class TodoStorage extends Object {

  constructor() {
    super();
    this._load();
  }

  _reset() {
    localStorage.clear();
    this._todos = {};
  }

  _load() {
    this._todos = JSON.parse(localStorage.getItem('todos')) || {};
  }

  _save() {
    localStorage.setItem('todos', JSON.stringify(this._todos));
  }

  getAll() {
    return this._todos;
  }

  create(text) {
    const id = Date.now();
    this._todos[id] = {
      id: id,
      done: false,
      name: text
    }
    this._save();
  }

  destroy(id) {
    delete this._todos[id];
    this._save();
  }

  update(id, text) {
    this._todos[id].name = text;
    this._save();
  }

  complete(id) {
    this._todos[id].done = true;
    this._save();
  }

  uncomplete(id) {
    this._todos[id].done = false;
    this._save();
  }

  toggleAll(state) {
    Object.keys(this._todos).forEach(key => this._todos[key].done = state);
    this._save();
  }

  destroyCompleted() {
    Object.keys(this._todos)
      .filter(key => this._todos[key].done)
      .forEach(key => delete this._todos[key]);
    this._save();
  }

}

export default TodoStorage;