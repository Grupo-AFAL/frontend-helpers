// These test were done with the viewport 1000x660
context('HovercardController', () => {
  beforeEach(() => {
    cy.visit('/docs/hovercard-testing.html')
  })

  context('anchor is 0 to left of the viewport', () => {
    it('hovercard is at top of the anchor', () => {
      cy.get('#first').as('anchor')
      cy.get('@anchor').trigger('mouseenter')
      cy.get('div.hovercard:not(.is-hidden)').as('hovercard')
      let anchorTop
      // calculate anchor top
      cy.get('@anchor').then($anchor => {
        anchorTop =
          $anchor[0].getBoundingClientRect().top +
          $anchor[0].getBoundingClientRect().height
      })

      cy.get('@hovercard').then($hovercard => {
        expect($hovercard[0].getBoundingClientRect().top).to.be.lessThan(
          anchorTop
        )
      })

      cy.get('@anchor').trigger('mouseleave')
    })

    it('hovercard is at botttom of the anchor', () => {
      cy.get('#second').as('anchor')
      cy.get('@anchor').trigger('mouseenter')
      cy.get('div.hovercard:not(.is-hidden)').as('hovercard')
      let anchorTop
      //calculatre anchor top
      cy.get('@anchor').then($anchor => {
        anchorTop =
          $anchor[0].getBoundingClientRect().top +
          $anchor[0].getBoundingClientRect().height
      })
      cy.get('@hovercard').then($hovercard => {
        expect($hovercard[0].getBoundingClientRect().top).to.be.greaterThan(
          anchorTop
        )
      })

      cy.get('@anchor').trigger('mouseleave')
    })
  })

  // context('anchor is in the middle of the viewport', () => {
  //   it('hovercard is at top of the anchor', () => {
  //     cy.get('#fourth').as('anchor')
  //     cy.get('@anchor').trigger('mouseenter')
  //     cy.get('div.hovercard:not(.is-hidden)').as('hovercard')

  //     cy.get('@hovercard').should($hovercard => {
  //       expect($hovercard).to.have.css('left', '435.586px')
  //       expect($hovercard).to.have.css('top', '110px')
  //     })
  //     cy.get('div.hovercard:not(.is-hidden) svg').should($svg => {
  //       expect($svg).to.have.css('left', '92.5px')
  //     })
  //     cy.get('@anchor').trigger('mouseleave')
  //   })

  //   it('hovercard is at botttom of the anchor', () => {
  //     cy.get('#third').as('anchor')
  //     cy.get('@anchor').trigger('mouseenter')
  //     cy.get('div.hovercard:not(.is-hidden)').as('hovercard')

  //     cy.get('@hovercard').should($hovercard => {
  //       expect($hovercard).to.have.css('left', '435.586px')
  //       expect($hovercard).to.have.css('top', '122px')
  //     })
  //     cy.get('div.hovercard:not(.is-hidden) svg').should($svg => {
  //       expect($svg).to.have.css('left', '92.5px')
  //       expect($svg).to.have.attr('transform', 'rotate(180)')
  //     })
  //     cy.get('@anchor').trigger('mouseleave')
  //   })
  // })

  // context('anchor is 0 to right of the viewport', () => {
  //   it('hovercard is at top of the anchor', () => {
  //     cy.get('#sixth').as('anchor')
  //     cy.get('@anchor').trigger('mouseenter')
  //     cy.get('div.hovercard:not(.is-hidden)').as('hovercard')

  //     cy.get('@hovercard').should($hovercard => {
  //       expect($hovercard).to.have.css('left', '765px')
  //       expect($hovercard).to.have.css('top', '110px')
  //     })
  //     cy.get('div.hovercard:not(.is-hidden) svg').should($svg => {
  //       expect($svg).to.have.css('left', '134.414px')
  //     })
  //     cy.get('@anchor').trigger('mouseleave')
  //   })

  //   it('hovercard is at bottom of the anchor', () => {
  //     cy.get('#fifth').as('anchor')
  //     cy.get('@anchor').trigger('mouseenter')
  //     cy.get('div.hovercard:not(.is-hidden)').as('hovercard')

  //     cy.get('@hovercard').should($hovercard => {
  //       expect($hovercard).to.have.css('left', '765px')
  //       expect($hovercard).to.have.css('top', '122px')
  //     })
  //     cy.get('div.hovercard:not(.is-hidden) svg').should($svg => {
  //       expect($svg).to.have.css('left', '134.414px')
  //       expect($svg).to.have.attr('transform', 'rotate(180)')
  //     })
  //   })
  // })
})
