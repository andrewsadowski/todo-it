let todos = [];

const filters = {
  searchText: '',
  hideCompleted: false
};

const todosJSON = localStorage.getItem('todos');

if (todosJSON !== null) {
  todos = JSON.parse(todosJSON);
}

const renderTodos = (todos, filters) => {
  const filteredTodos = todos.filter(todo => {
    const searchTextMatch = todo.text.toLowerCase().includes(filters.searchText.toLowerCase());
    const hideCompletedMatch = !filters.hideCompleted || !todo.completed;
    return searchTextMatch && hideCompletedMatch;
  });

  let todosRemaining = filteredTodos.filter(todo => {
    return todo.completed === false;
  });

  document.querySelector('#todo').innerHTML = '';

  const summary = document.createElement('h2');
  summary.textContent = `You have ${todosRemaining.length} todos left!`;
  document.querySelector('#todo').appendChild(summary);

  filteredTodos.forEach(todo => {
    const todoElement = document.createElement('p');
    todoElement.textContent = todo.text;
    document.querySelector('#todo').appendChild(todoElement);
  });
};

renderTodos(todos, filters);

document.querySelector('#search-text').addEventListener('input', e => {
  filters.searchText = e.target.value;
  renderTodos(todos, filters);
});

document.querySelector('#todo-text').addEventListener('submit', e => {
  e.preventDefault();
  todos.push({
    text: e.target.elements.todoText.value,
    completed: false
  });
  localStorage.setItem('todos', JSON.stringify(todos));
  renderTodos(todos, filters);
  e.target.elements.todoText.value = '';
});

document.querySelector('#hide-completed').addEventListener('change', e => {
  filters.hideCompleted = e.target.checked;
  renderTodos(todos, filters);
});
