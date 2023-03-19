/// <reference types="cypress" />

describe('Signout', () => {
  beforeEach(() => {
    cy.login()
    cy.visit('/')
    cy.wait('@session')
  })

  it('it shows `Signin` when unauthed', () => {})
})
