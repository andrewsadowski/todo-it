describe('Test Todo-It App', () => {
  it('Should create a todo', () => {
    cy.visit('https://attractive-cobweb.surge.sh/');
    cy.get('#todo-text .input').type('test todo {enter}');
    cy.get('#todo-text .input').type('test1 todo {enter}');
  });
  it('should search for todo', () => {
    cy.get('#search-text').type('test1 {enter}');
    cy.get('.list-title').contains('You have 1 todo left');
  });
});
