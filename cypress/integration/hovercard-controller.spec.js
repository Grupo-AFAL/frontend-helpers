context('HovercardController', () => {
  beforeEach(() => {
    cy.visit('/docs/hovercard.html')
  })

  it('opens the hovercard when hovering over it', () => {
    cy.get('.button').trigger('mouseenter')
    cy.get('.hovercard').should('be.visible')
  })

  it('closes hovercard after hovering out of it', () => {
    cy.get('.button').trigger('mouseenter')
    cy.get('.hovercard').should('be.visible')

    cy.get('.button').trigger('mouseleave')
    cy.get('.hovercard').should('not.be.visible')
  })
})
