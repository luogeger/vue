const list_key = 'todoList';
export default{
  fetch: function () {
    return JSON.parse(window.localStorage.getItem(list_key) ||'[]') ;
  },
  save: function (items) {
    window.localStorage.setItem(list_key, JSON.stringify(items));
  }
}
