import IssueNewModal from '../pages/IssueNewModal';
import IssueTimeTrack from '../pages/IssueTimeTrack';

const issueCreatedConfirmation = 'Issue has been successfully created.';
const estimatedTime = '10';
const estimatedTimeUpdated = '20';
const loggedTime = '2';
const loggedTimeUpdated = '3';
const remainingTime = '5';
const remainingTimeUpdated = '4';
const issueTitle = 'Time title';
const issueDescription = 'Description of the problem';
const issueAssignee = 'Pickle Rick';
const backLogList = '[data-testid="board-list:backlog"]';

describe('Time Tracking Test Cases', () => {
    const issueNewModal = new IssueNewModal(issueTitle, issueDescription, issueAssignee);

    beforeEach(() => {
        cy.visit('/');
        cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`).then((url) => {
            cy.visit(url + '/board?modal-issue-create=true');
            issueNewModal.createIssue();

            cy.contains(issueCreatedConfirmation).should('be.visible');
            cy.wait(6000);
            cy.get(backLogList).should('be.visible').contains(issueNewModal.title).click();
        });
    });

    it('Should add, update, and remove estimated time in the issue asserting the changes', () => {
        const issueTimeTrack = new IssueTimeTrack();

        // Validate that no time is logged
        issueTimeTrack.validateNoTimeLoggedShouldBeVisible();

        // Validate that added estimate is shown after adding
        issueTimeTrack.addTimeAndValidate(estimatedTime);
        issueTimeTrack.validateEstimatedTimeShouldBeVisible(estimatedTime);

        // Validate that new updated estimate is shown after adding
        issueTimeTrack.addTimeAndValidate(estimatedTimeUpdated);
        issueTimeTrack.validateEstimatedTimeShouldBeVisible(estimatedTimeUpdated);
        issueTimeTrack.clearTimeField();

        // Validate that entered estimates don't exist anymore
        issueTimeTrack.validateEstimatedTimeShouldNotExist(estimatedTime);
        issueTimeTrack.validateEstimatedTimeShouldNotExist(estimatedTimeUpdated);
        // Validate no time is logged
        issueTimeTrack.validateNoTimeLoggedShouldBeVisible();
    });

    it('Should add and remove logged time values', () => {
        const issueTimeTrack = new IssueTimeTrack();

        // Validate that added estimate is shown after adding
        issueTimeTrack.addTimeAndValidate(estimatedTime);
        issueTimeTrack.validateEstimatedTimeShouldBeVisible(estimatedTime);

        // Validate that logged and remaining time are visible
        issueTimeTrack.openTimeTrackingAndChangeLoggedTime(loggedTime, remainingTime);

        issueTimeTrack.validateLoggedTimeShouldBeVisible(loggedTime);
        issueTimeTrack.validateRemainingTimeShouldBeVisible(remainingTime);
        issueTimeTrack.validateEstimatedTimeShouldNotExist(estimatedTime);

        // Validate that logged and remaining time are updated and visible
        issueTimeTrack.openTimeTrackingAndChangeLoggedTime(loggedTimeUpdated, remainingTimeUpdated);
        
        issueTimeTrack.validateLoggedTimeShouldBeVisible(loggedTimeUpdated);
        issueTimeTrack.validateRemainingTimeShouldBeVisible(remainingTimeUpdated);
        issueTimeTrack.validateEstimatedTimeShouldNotExist(estimatedTimeUpdated);

        // Validate that "No time logged" is not visible
        issueTimeTrack.validateNoTimeLoggedShouldNotExist();

        // Validate that logged time is cleared and "No time logged" is visible
        issueTimeTrack.openTimeTrackingAndClearLoggedTime();

        issueTimeTrack.validateNoTimeLoggedShouldBeVisible();
        issueTimeTrack.validateLoggedTimeShouldNotExist(loggedTime);
        issueTimeTrack.validateRemainingTimeShouldNotExist(remainingTime);
        issueTimeTrack.validateEstimatedTimeShouldBeVisible(estimatedTime);
    });
});