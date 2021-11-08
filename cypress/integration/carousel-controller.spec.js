context('CarouselController', () => {
  beforeEach(() => {
    cy.visit('/docs/carousel.html')
  })

  it('Carousel start at second slide', () => {
    cy.get('.glide__slide--active').should('have.class', 'second')
  })

  it('Change slide', () => {
    cy.get('.second')
      .not('.glide__slide--clone')
      .should('have.class', 'glide__slide--active')
    cy.get('.glide__arrow--right').click()
    cy.get('.second')
      .not('.glide__slide--clone')
      .should('not.have.class', 'glide__slide--active')
    cy.get('.first')
      .not('.glide__slide--clone')
      .should('have.class', 'glide__slide--active')
  })

  it('Validates that the carousel only has two images', () => {
    cy.get('li')
      .not('.glide__slide--clone')
      .should($li => {
        expect($li).to.have.length(2)
      })
  })
})
