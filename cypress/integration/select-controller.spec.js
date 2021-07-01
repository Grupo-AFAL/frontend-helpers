context('SelectController', () => {
  beforeEach(() => {
    cy.visit('/docs/select.html')
  })

  it('displays the selected item', () => {
    cy.get('#first-select .select')
      .children('.custom-select')
      .should('have.value', 'Three')
    cy.get('select').should('have.value', '3')
  })

  it('displays the list of available options', () => {
    cy.get('#first-select .select').children('.custom-select').click()
    cy.get('.dropdown-items div').should('have.length', 6)
    cy.get('.dropdown-items div:nth-child(1)').should('have.text', 'One')
    cy.get('.dropdown-items div:nth-child(2)').should('have.text', 'Two')
    cy.get('.dropdown-items div:nth-child(3)').should('have.text', 'Three')
    cy.get('.dropdown-items div:nth-child(4)').should('have.text', 'Four')
    cy.get('.dropdown-items div:nth-child(5)').should('have.text', 'Five')
    cy.get('.dropdown-items div:nth-child(6)').should('have.text', 'Six')
  })

  it('filters available items', () => {
    cy.get('#first-select .select').children('.custom-select').click()
    cy.get('#first-select .dropdown-container .dropdown-items div').should('have.length', 6)

    cy.get('#first-select .dropdown-container .search-input').type('Fou')
    cy.get('#first-select .dropdown-container .dropdown-items div').should('have.length', 1)
  })

  it('clears the search input after filtering', () => {
    cy.get('#first-select .select').children('.custom-select').click()
    cy.get('#first-select .dropdown-container .search-input').type('Fou')

    cy.get('#first-select .dropdown-container .dropdown-items div:first-child').click()
    cy.get('#first-select .select').children('.custom-select').should('have.value', 'Four')
    cy.get('select').should('have.value', '4')

    cy.get('.search-input').should('have.value', '')
  })

  context('using the mouse', () => {
    it('selects an item from the list', () => {
      cy.get('#first-select .select').children('.custom-select').click()
      cy.get('.dropdown-items div:nth-child(2)').click()
      cy.get('#first-select .select')
        .children('.custom-select')
        .should('have.value', 'Two')
      cy.get('select').should('have.value', '2')
    })
  })

  context('using the keyboard', () => {
    it('selects an item from the list', () => {
      cy.get('#first-select .select').children('.custom-select').click()
      cy.get('#first-select .dropdown-container .search-input')
        .type('{DOWNARROW}')
        .type('{ENTER}')
      cy.get('#first-select .select')
        .children('.custom-select')
        .should('have.value', 'One')
      cy.get('select').should('have.value', '1')
    })

    it('selects an item after going down and up', () => {
      cy.get('#first-select .select').children('.custom-select').click()
      cy.get('#first-select .dropdown-container .search-input').type(
        '{DOWNARROW}{DOWNARROW}{DOWNARROW}{DOWNARROW}{DOWNARROW}'
      )

      cy.get('.dropdown-items div:nth-child(5)').should(
        'have.class',
        'selected'
      )

      cy.get('#first-select .dropdown-container .search-input')
        .type('{UPARROW}')
        .type('{ENTER}')

      cy.get('#first-select .select')
        .children('.custom-select')
        .should('have.value', 'Four')
      cy.get('select').should('have.value', '4')
    })
  })
})
