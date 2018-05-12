const todos = [
  {
    text: 'Order cat food',
    completed: true
  },
  {
    text: 'Find cat',
    completed: false
  },
  {
    text: 'Feed cats',
    completed: false
  },
  {
    text: 'Sleep',
    completed: false
  },
  {
    text: 'Eat',
    completed: true
  }
];

const filters = {
  searchText: ''
};

const renderTodos = (todos, filters) => {
  const filteredTodos = todos.filter(todo => {
    return todo.text.toLowerCase().includes(filters.searchText.toLowerCase());
  });
  console.log(filteredTodos);

  let todosRemaining = filteredTodos.filter(todo => {
    return todo.completed === false;
  });

  document.querySelector('#todo').innerHTML = '';

  const summary = document.createElement('p');
  summary.textContent = `You have ${todosRemaining.length} todos left!`;
  document.querySelector('#todo').appendChild(summary);

  filteredTodos.forEach(todo => {
    const todoElement = document.createElement('p');
    todoElement.textContent = todo.text;
    document.querySelector('#todo').appendChild(todoElement);
  });
};

renderTodos(todos, filters);

const body = document.querySelector('body');

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
  renderTodos(todos, filters);
  e.target.elements.todoText.value = '';
});
