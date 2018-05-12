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

const generateTodoDOM = todo => {
  const todoElement = document.createElement('p');
  todoElement.textContent = todo.text;
  return todoElement;
};

const generateSummaryDOM = todosRemaining => {
  const summary = document.createElement('h2');
  summary.textContent = `You have ${todosRemaining.length} todos left!`;
  return summary;
};