/// <reference types="cypress" />

context('Actions', () => {

  beforeEach(() => {
    cy.visit('http://localhost:8080')
  })

  it('Form element changes value', () => {
    cy.get('#input')
      .type('ABC')
      .should('have.value', 'ABC');
    /* ==== Generated with Cypress Studio ==== */
    cy.get('#input').type('X');
    /* ==== End Cypress Studio ==== */
  })

  it('Form element can have clear value', () => {
    cy.get('#input')
      .type('ABC')
      .should('have.value', 'ABC')
      .clear()
      .should('have.value', '')
  })

  it('Form element can be clicked', () => {
    cy.get('#submit')
      .click()
  })

})

