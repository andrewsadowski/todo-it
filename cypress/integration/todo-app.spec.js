describe('Test Todo-It App', () => {
  it('Should create a todo', () => {
    cy.visit('https://attractive-cobweb.surge.sh/');
    cy.get('#todo-text .input').type('test todo {enter}');
    cy.get('#todo-text .input').type('test1 todo {enter}');
  });
});
