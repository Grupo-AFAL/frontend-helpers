context('SelectController', () => {
  beforeEach(() => {
    cy.visit('/docs/select.html')
  })

  it('displays the selected item', () => {
    cy.get('input').should('have.value', 'Three')
    cy.get('select').should('have.value', '3')
  })

  it('displays the list of available options', () => {
    cy.get('.input').click()
    cy.get('.dropdown-container li').should('have.length', 6)
    cy.get('.dropdown-container li:nth-child(1)').should('have.text', 'One')
    cy.get('.dropdown-container li:nth-child(2)').should('have.text', 'Two')
    cy.get('.dropdown-container li:nth-child(3)').should('have.text', 'Three')
    cy.get('.dropdown-container li:nth-child(4)').should('have.text', 'Four')
    cy.get('.dropdown-container li:nth-child(5)').should('have.text', 'Five')
    cy.get('.dropdown-container li:nth-child(6)').should('have.text', 'Six')
  })

  context('using the mouse', () => {
    it('selects an item from the list', () => {
      cy.get('.input').click()
      cy.get('.dropdown-container li:nth-child(2)').click()
      cy.get('input').should('have.value', 'Two')
      cy.get('select').should('have.value', '2')
    })
  })

  context('using the keyboard', () => {
    it('selects an item from the list', () => {
      cy.get('input')
        .click()
        .type('{DOWNARROW}')
        .type('{ENTER}')
      cy.get('input').should('have.value', 'One')
      cy.get('select').should('have.value', '1')
    })

    it('selects an item after going down and up', () => {
      cy.get('input')
        .click()
        .type('{DOWNARROW}{DOWNARROW}{DOWNARROW}{DOWNARROW}{DOWNARROW}')

      cy.get('.dropdown-container li:nth-child(5)').should(
        'have.class',
        'selected'
      )

      cy.get('input')
        .type('{UPARROW}')
        .type('{ENTER}')

      cy.get('input').should('have.value', 'Four')
      cy.get('select').should('have.value', '4')
    })
  })
})
