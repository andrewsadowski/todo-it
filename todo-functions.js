const getSavedTodos = () => {
  const todosJSON = localStorage.getItem('todos');

  if (todosJSON !== null) {
    return JSON.parse(todosJSON);
  } else {
    return [];
  }
};

const saveTodos = todos => {
  localStorage.setItem('todos', JSON.stringify(todos));
};

const removeTodo = id => {
  const todoIndex = todos.findIndex(todo => {
    return todo.id === id;
  });
  if (todoIndex > 1) {
    todos.splice(todoIndex, 1);
  }
};

const toggleTodo = id => {
  const todo = todos.find(todo => {
    return todo.id === id;
  });
  if (todo !== undefined) {
    todo.completed = !todo.completed;
  }
};

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
  document.querySelector('#todo').appendChild(generateSummaryDOM(todosRemaining));

  filteredTodos.forEach(todo => {
    document.querySelector('#todo').appendChild(generateTodoDOM(todo));
  });
};
//Generates the dynamic DOM elements
const generateTodoDOM = todo => {
  const todoElement = document.createElement('div');
  const textElement = document.createElement('span');
  const checkbox = document.createElement('input');
  const removeButton = document.createElement('button');

  checkbox.setAttribute('type', 'checkbox');
  checkbox.checked = todo.completed;
  checkbox.addEventListener('change', () => {
    toggleTodo(todo.id);
    saveTodos(todos);
    renderTodos(todos, filters);
  });

  removeButton.textContent = 'Remove Todo';
  textElement.textContent = todo.text;
  todoElement.appendChild(checkbox);
  todoElement.appendChild(textElement);
  todoElement.appendChild(removeButton);

  removeButton.addEventListener('click', () => {
    removeTodo(todo.id);
    saveTodos(todos);
    renderTodos(todos, filters);
  });

  return todoElement;
};

const generateSummaryDOM = todosRemaining => {
  const summary = document.createElement('h2');
  summary.textContent = `You have ${todosRemaining.length} todos left!`;
  return summary;
};
