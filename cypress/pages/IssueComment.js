import { faker } from '@faker-js/faker';

class IssueComment {
    constructor () {
        this.issueTitle = "Click on an issue to see what's behind it.";
        this.editedComment = faker.lorem.sentence();
        this.rawComment = faker.lorem.sentence();
        this.selectIssueDetailModal = '[data-testid="modal:issue-details"]';
        this.commentAreaPlaceholder = 'textarea[placeholder="Add a comment..."]';
        this.issueCommentSelector = '[data-testid="issue-comment"]';
        
    }
    
    getIssueDetailModal() {
        return cy.get(this.selectIssueDetailModal);
    }

    getcommentAreaPlaceholder() {
        return cy.get(this.commentAreaPlaceholder);
    }

    getIssueComment() {
        return cy.get(this.issueCommentSelector);
    }

    addComment() {
        this.getIssueDetailModal().within(() => {
            cy.contains("Add a comment...").click();
            this.getcommentAreaPlaceholder().type(this.rawComment);
            cy.contains('button', 'Save')
                .click().should('not.exist');
            cy.contains("Add a comment...").should('exist');
            this.getIssueComment()
            .should('have.length', '2')
            .first().should('contain', this.rawComment);
        });
    }

    editComment() {
        this.getIssueDetailModal().within(() => {
            this.getIssueComment()
                .contains('Edit')
                .click()
                .should('not.exist');
            this.getcommentAreaPlaceholder()
                .should('contain', this.rawComment)
                .clear()
                .type(this.editedComment);
            cy.contains('button', 'Save').click();
            cy.contains("Add a comment...").should('exist');
            this.getIssueComment()
                .should('have.length', '2')
                .first().should('contain', this.editedComment);
        });
    }
    
    deleteComment() {
        this.getIssueDetailModal().within(()=>{
            this.getIssueComment()
            .first()
            .contains('Delete')
            .click();
        });
        cy.get('[data-testid="modal:confirm"]')
            .contains('button', 'Delete comment')
            .click()
            .should('not.exist');
        cy.wait(8000);
        this.getIssueComment()
            .should('have.length', '1');
        this.getIssueDetailModal()
            .find(this.issueCommentSelector)
            .should('not.contain', this.editedComment);
    }
    
}
export default IssueComment;