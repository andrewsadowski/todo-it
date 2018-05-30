'use strict';

const getSavedTodos = () => {
  const todosJSON = localStorage.getItem('todos');
  try {
    return todosJSON ? JSON.parse(todosJSON) : [];
  } catch (e) {
    return [];
  }
};

//Saves todos JSON to localstorage
const saveTodos = todos => {
  localStorage.setItem('todos', JSON.stringify(todos));
};

const removeTodo = id => {
  const todoIndex = todos.findIndex(todo => {
    return todo.id === id;
  });
  if (todoIndex > -1) {
    todos.splice(todoIndex, 1);
  }
};

const toggleTodo = id => {
  const todo = todos.find(todo => {
    return todo.id === id;
  });
  if (todo) {
    todo.completed = !todo.completed;
  }
};

const renderTodos = (todos, filters) => {
  const todoElement = document.querySelector('#todo');
  const filteredTodos = todos.filter(todo => {
    const searchTextMatch = todo.text.toLowerCase().includes(filters.searchText.toLowerCase());
    const hideCompletedMatch = !filters.hideCompleted || !todo.completed;

    return searchTextMatch && hideCompletedMatch;
  });

  let todosRemaining = filteredTodos.filter(todo => {
    return todo.completed === false;
  });

  todoElement.innerHTML = '';
  todoElement.appendChild(generateSummaryDOM(todosRemaining));

  if (filteredTodos.length > 0) {
    filteredTodos.forEach(todo => {
      todoElement.appendChild(generateTodoDOM(todo));
    });
  } else {
    const messageElement = document.createElement('p');
    messageElement.classList.add('empty-message');
    messageElement.textContent = 'No to-dos to show';
    todoElement.appendChild(messageElement);
  }
};
//Generates the dynamic DOM elements
const generateTodoDOM = todo => {
  const todoElement = document.createElement('label');
  const containerElement = document.createElement('div');
  const textElement = document.createElement('span');
  const checkbox = document.createElement('input');
  const removeButton = document.createElement('button');

  checkbox.setAttribute('type', 'checkbox');
  checkbox.checked = todo.completed;
  containerElement.appendChild(checkbox);
  checkbox.addEventListener('change', () => {
    toggleTodo(todo.id);
    saveTodos(todos);
    renderTodos(todos, filters);
  });

  textElement.textContent = todo.text;
  containerElement.appendChild(textElement);

  todoElement.classList.add('list-item');
  containerElement.classList.add('list-item__container');
  todoElement.appendChild(containerElement);

  removeButton.textContent = 'remove';
  removeButton.classList.add('button', 'button--text');

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
  const plural = todosRemaining.length === 1 ? '' : 's';
  summary.classList.add('list-title');
  summary.textContent = `You have ${todosRemaining.length} todo${plural} left`;
  return summary;
};
