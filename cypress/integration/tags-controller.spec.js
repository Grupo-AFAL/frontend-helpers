context('TagsController', () => {
  beforeEach(() => {
    cy.visit('/docs/tags.html')
  })

  it('selects 2 items from the dropdown', () => {
    cy.get('#tags-with-text .input').click()
    cy.get('#tags-with-text .results li')
      .first()
      .click()
    cy.get('#tags-with-text .input').click()
    cy.get('#tags-with-text .results li')
      .first()
      .click()

    cy.get('#tags-with-text .input-tag:first-child').should(
      'contain.text',
      'One'
    )
    cy.get('#tags-with-text .input-tag:nth-child(2)').should(
      'contain.text',
      'Two'
    )

    cy.get('#tags-with-text input[name="field[]"]').should($inputs => {
      let values = $inputs.map((i, el) => Cypress.$(el).val())
      values = values.get()

      expect(values).to.have.length(2)
      expect(values).to.deep.eq(['One', 'Two'])
    })
  })
})
