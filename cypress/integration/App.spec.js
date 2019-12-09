describe ('Test App', () => {

    it ('launches', () => {
      cy.visit ('/');
    });

    it ('opens with Evanston restaurants', () => {
        cy.visit ('/');
        cy.get('[data-cy=restaurant]').should('contain', 'Koco Table');
    });

    it('shows selected restaurant in the poll when add to list button for that restaurant is clicked', () => {
        cy.visit ('/');
        cy.get('[data-cy=addToPoll1]').click();
        cy.get('[data-cy=poll]').should('contain', 'Koco Table')
    })
  });

