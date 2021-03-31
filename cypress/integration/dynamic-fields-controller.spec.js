context('DynamicFieldsController', () => {
  beforeEach(() => {
    cy.visit('/docs/dynamic-fields.html')
    cy.get('[data-dynamic-fields-target="container"]').as('container')
  })

  it('displays a dynamic field template', () => {
    cy.get('.button').click()

    cy.get('@container')
      .children()
      .should('have.length', 1)
  })

  it('removes the selected dynamic field template', () => {
    cy.get('.button').click()
    cy.get('.button').click()
    cy.get('.button').click()

    cy.get('@container')
      .children()
      .eq(0)
      .as('firstTemplate')
    cy.get('@container')
      .children()
      .eq(1)
      .as('secondTemplate')
    cy.get('@container')
      .children()
      .eq(2)
      .as('thirdTemplate')

    cy.get('@container')
      .children()
      .should('have.length', 3)

    cy.get('@secondTemplate')
      .find('input[placeholder="First name"]')
      .type('Delete')
    cy.get('@secondTemplate')
      .find('input[placeholder="Last name"]')
      .type('me')

    cy.get('@secondTemplate')
      .find('a.delete')
      .click()

    cy.get('@firstTemplate').should('not.have.css', 'display', 'none')
    cy.get('@secondTemplate').should('have.css', 'display', 'none')
    cy.get('@thirdTemplate').should('not.have.css', 'display', 'none')

    cy.get('@firstTemplate')
      .find('input.destroy-flag')
      .should('have.value', 'false')
    cy.get('@secondTemplate')
      .find('input.destroy-flag')
      .should('have.value', 'true')
    cy.get('@thirdTemplate')
      .find('input.destroy-flag')
      .should('have.value', 'false')
  })
})