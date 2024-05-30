describe('Issue deletion', () => {
    beforeEach(() => {
      cy.visit('/');
      cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`).then((url) => {
        cy.contains('This is an issue of type: Task.').click();
      });
    });
  
    it('Should delete the issue and not be visible anymore', () => {
        cy.get('[data-testid="modal:issue-details"]').should('be.visible').within(() => {
            cy.get('[data-testid="icon:trash"]').should('be.visible').click();
            });
        cy.get('[data-testid="modal:confirm"]').should('be.visible').within(() => {
            cy.get('button').contains('Delete issue').should('be.visible').click();
            });

    cy.get('[data-testid="modal:confirm"]').should('not.exist');
    cy.get('[data-testid="modal:issue-details"]').should('not.exist');

    cy.get('[data-testid="board-list:backlog"]')
      .contains('This is an issue of type: Task.').should('not.exist');
      
    });

    it('Should be able to cancel issue deletion', () => {
        cy.get('[data-testid="modal:issue-details"]').should('be.visible').within(() => {
            cy.get('[data-testid="icon:trash"]').should('be.visible').click();
            });
        cy.get('[data-testid="modal:confirm"]').should('be.visible').within(() => {
            cy.get('button').contains('Cancel').should('be.visible').click();
            });

    cy.get('[data-testid="modal:confirm"]').should('not.exist');
    cy.get('[data-testid="modal:issue-details"]').should('be.visible');
    
    cy.get('[data-testid="board-list:backlog"]')
      .contains('This is an issue of type: Task.').should('be.visible');
    });
});
    