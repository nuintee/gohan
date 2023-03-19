/// <reference types="cypress" />

describe('Signout', () => {
  beforeEach(() => {
    cy.login()
    cy.visit('/')
    cy.wait('@session')
  })

  it('it shows `Signin` when unauthed', () => {
    // const button = cy.get('button[data-testid="user_authenticated__button"]')
  })
})
