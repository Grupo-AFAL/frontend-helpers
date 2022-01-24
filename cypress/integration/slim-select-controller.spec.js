context('SlimSelectController', () => {
  beforeEach(() => {
    cy.visit('/docs/slim-select.html')
  })

  it('selects all values', () => {
    cy.get('#select-all .ss-values')
      .children()
      .should($c => {
        expect($c).to.have.length(1)
      })
    cy.get('#button-select-all').click()
    cy.get('#select-all .ss-values')
      .children()
      .should($c => {
        expect($c).to.have.length(6)
      })
  })
})
