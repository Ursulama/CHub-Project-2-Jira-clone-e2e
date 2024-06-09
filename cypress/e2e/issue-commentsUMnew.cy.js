import IssueComment from "../pages/IssueComment";
const IssueCommentPage = new IssueComment();


describe('Issue comments creating, editing and deleting', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`).then((url) => {
            cy.visit(url + '/board');
            cy.contains("Click on an issue to see what's behind it.").click();
        });
    });

    it('Should create, edit and delete a comment successfully', () => {
        IssueCommentPage.addComment();
        IssueCommentPage.editComment();
        IssueCommentPage.deleteComment();
    });
});
