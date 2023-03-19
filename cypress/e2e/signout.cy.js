/// <reference types="cypress" />

describe('Signout', () => {
  beforeEach(() => {
    cy.setCookie(
      'next-auth.session-token',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMTIzNDU2Nzg5MCJ9.eTB-KFt1C_5yLQD28bnJrbI0KjXhtvXY1GdHhJxMKBg',
    )
    cy.window()
      .its('localStorage')
      .invoke(
        'setItem',
        'token',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMTIzNDU2Nzg5MCJ9.eTB-KFt1C_5yLQD28bnJrbI0KjXhtvXY1GdHhJxMKBg',
      )
    cy.visit('/')
  })

  it('it shows `Signin` when unauthed', () => {})
})
