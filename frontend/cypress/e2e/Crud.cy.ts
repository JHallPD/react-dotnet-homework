describe('Contact Crud e2e spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:5173/')
    /* ==== Generated with Cypress Studio ==== */
    cy.get('form > button').should('be.enabled');
    cy.get('form > button').click();
    cy.get('#name').click();
    cy.get('#name').type('test');
    cy.get('#email').click();
    cy.get('#email').type('test@gmail.com');
    cy.get('#phone').click();
    cy.get('#phone').type('111-111-1111');
    cy.get('#twitter').click();
    cy.get('#twitter').type('test');
    cy.get('#avatar').click();
    cy.get('#avatar').type('/test.png');
    cy.get('#notes').click();
    cy.get('#notes').type('test notes');
    cy.get('.mt-6 > .rounded-md').click();
    cy.get('form > button').click();
    cy.get('#name').clear();
    cy.get('#name').type('testupdated');
    cy.get('#email').clear();
    cy.get('#email').type('testupdated@gmail.com');
    cy.get('#phone').clear();
    cy.get('#phone').type('111-111-1112');
    cy.get('#twitter').clear();
    cy.get('#twitter').type('testupdate');
    cy.get('#avatar').clear();
    cy.get('#avatar').type('/avatars/headshot_8.png');
    cy.get('#notes').clear();
    cy.get('#notes').type('updated test notes');
    cy.get('.mt-6 > .rounded-md').click();
    cy.get('#contact > :nth-child(1) > img').should('be.visible');
    cy.get('.m > button').click();
    cy.get('[href="/contacts/29"] > .relative > .flex').contains('have.text', 'testupdatedtestupdated@gmail.com111-111-1112').should('not.exist');
    /* ==== End Cypress Studio ==== */
  })
})