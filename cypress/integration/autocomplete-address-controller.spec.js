context('AutocompleteAddressController', () => {
  beforeEach(() => {
    cy.visit('/docs/autocomplete-address.html')
  })

  context('searching a location', () => {
    beforeEach(() => {
      cy.get('.pac-target-input')
        .as('searchInput')
        .click()
    })

    it('autocompletes an address location when found', () => {
      cy.get('@searchInput').type('Paseo de los Héroes 9350')
      cy.get('.pac-item').should('be.visible')
      cy.get('@searchInput')
        .type('{DOWNARROW}')
        .type('{ENTER}')

      cy.get('[data-autocomplete-address-target="street"]').should(
        'have.value',
        'Paseo de los Héroes'
      )
      cy.get('[data-autocomplete-address-target="streetNumber"]').should(
        'have.value',
        '9350'
      )
      cy.get('[data-autocomplete-address-target="neighbourhood"]').should(
        'have.value',
        'Zona Urbana Rio Tijuana'
      )
      cy.get('[data-autocomplete-address-target="city"]').should(
        'have.value',
        'Tijuana'
      )
      cy.get('[data-autocomplete-address-target="state"]').should(
        'have.value',
        'B.C.'
      )
      cy.get('[data-autocomplete-address-target="country"]').should(
        'have.value',
        'México'
      )
      cy.get('[data-autocomplete-address-target="postalCode"]').should(
        'have.value',
        '22010'
      )
      cy.get('[data-autocomplete-address-target="latitude"]').should(
        'have.value',
        '32.5296089'
      )
      cy.get('[data-autocomplete-address-target="longitude"]').should(
        'have.value',
        '-117.024577'
      )
    })
  })
})
