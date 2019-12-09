describe ('Test App', () => {

    it ('launches', () => {
      cy.visit ('/');
    });

    it ('opens with Evanston restaurants', () => {
        cy.visit ('/');
        cy.get('[data-cy=restaurant]').should('contain', 'Koco Table');
    })
  });