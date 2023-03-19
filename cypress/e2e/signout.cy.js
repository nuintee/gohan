/// <reference types="cypress" />

describe('Signout', () => {
  beforeEach(() => {
    cy.login()
    cy.visit('/')
    cy.wait('@session')
  })

  it('Signouts properly on signout button click', () => {
    const userButton = cy.get('button[data-testid="user_authenticated__button"]')

    // Trigger User Settings
    userButton.click()

    const signoutButton = cy.get('button[data-testid="signout__button"]')

    signoutButton.click()
  })
})
