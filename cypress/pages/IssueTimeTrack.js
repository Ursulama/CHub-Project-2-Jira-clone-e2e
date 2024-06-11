class IssueTimeTrack {
    timeTrackingModal = '[data-testid="modal:tracking"]';
    timeTrackingButton = '[data-testid="icon:stopwatch"]';
    noTimeLogged = 'No time logged';
    inputFieldTime = 'input[placeholder="Number"]';
    remainingTimeExpectedText = 'h remaining';
    estimatedTimeExpectedText = 'h estimated';
    loggedTimeExpectedText = 'h logged';

    openTimeTrackingAndClearLoggedTime() {
        cy.get(this.timeTrackingButton).click();
        cy.get(this.timeTrackingModal).should('be.visible').within(() => {
            cy.get(this.inputFieldTime).eq(0).clear();
            cy.get(this.inputFieldTime).eq(1).clear();
            cy.contains('button', 'Done').click();
        });
    }
    openTimeTrackingAndChangeLoggedTime(loggedTime, remainingTime) {
        cy.get(this.timeTrackingButton).click();
        cy.get(this.timeTrackingModal).should('be.visible').within(() => {
            cy.get(this.inputFieldTime).eq(0).clear().type(loggedTime);
            cy.get(this.inputFieldTime).eq(1).clear().type(remainingTime);
            cy.contains('button', 'Done').click();
        });
    }
    // Add time with validation'
    addTimeAndValidate(timeValue) {
        cy.get(this.inputFieldTime).clear().type(timeValue).should('have.value', timeValue);
    }
    //
    clearTimeField() {
        cy.get(this.inputFieldTime).clear();
    }
    // Time validation
    validateEstimatedTimeShouldBeVisible(timeValue) {
        cy.contains(`${timeValue}${this.estimatedTimeExpectedText}`).should('be.visible');
    }
    validateEstimatedTimeShouldNotExist(timeValue) {
        cy.contains(`${timeValue}${this.estimatedTimeExpectedText}`).should('not.exist');
    }

    validateLoggedTimeShouldBeVisible(timeValue) {
        cy.contains(`${timeValue}${this.loggedTimeExpectedText}`).should('be.visible');
    }
    validateLoggedTimeShouldNotExist(timeValue) {
        cy.contains(`${timeValue}${this.loggedTimeExpectedText}`).should('not.exist');
    }
    validateRemainingTimeShouldBeVisible(timeValue) {
        cy.contains(`${timeValue}${this.remainingTimeExpectedText}`).should('be.visible');
    }
    validateRemainingTimeShouldNotExist(timeValue) {
        cy.contains(`${timeValue}${this.remainingTimeExpectedText}`).should('not.exist');
    }
    // No time logged Validation
    validateNoTimeLoggedShouldBeVisible() {
        cy.contains(this.noTimeLogged).should('be.visible');
    }

    validateNoTimeLoggedShouldNotExist() {
        cy.contains(this.noTimeLogged).should('not.exist');
    }
}

export default IssueTimeTrack;