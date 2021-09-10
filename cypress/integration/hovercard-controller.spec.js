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
      let anchorTop, widthHovercard, leftHovercard, leftSvg

      cy.get('@anchor').then($anchor => {
        anchorTop = $anchor[0].getBoundingClientRect().top
      })

      cy.get('@hovercard').then($hovercard => {
        expect(
          $hovercard[0].getBoundingClientRect().top +
            $hovercard[0].getBoundingClientRect().height
        ).to.be.lessThan(anchorTop)
        widthHovercard = $hovercard[0].getBoundingClientRect().width
        leftHovercard = $hovercard[0].getBoundingClientRect().left
      })

      cy.get('div.hovercard:not(.is-hidden) svg').then($svg => {
        leftSvg = $svg[0].getBoundingClientRect().left
        expect(leftSvg - leftHovercard).to.be.lessThan(widthHovercard / 2)
      })
    })

    it('hovercard is at botttom of the anchor', () => {
      cy.get('#second').as('anchor')
      cy.get('@anchor').trigger('mouseenter')
      cy.get('div.hovercard:not(.is-hidden)').as('hovercard')
      let anchorTop, widthHovercard, leftHovercard, leftSvg

      cy.get('@anchor').then($anchor => {
        anchorTop =
          $anchor[0].getBoundingClientRect().top +
          $anchor[0].getBoundingClientRect().height
      })

      cy.get('@hovercard').then($hovercard => {
        expect($hovercard[0].getBoundingClientRect().top).to.be.greaterThan(
          anchorTop
        )
        widthHovercard = $hovercard[0].getBoundingClientRect().width
        leftHovercard = $hovercard[0].getBoundingClientRect().left
      })

      cy.get('div.hovercard:not(.is-hidden) svg').then($svg => {
        leftSvg = $svg[0].getBoundingClientRect().left
        expect(leftSvg - leftHovercard).to.be.lessThan(widthHovercard / 2)
      })
    })
  })

  context('anchor is in the middle of the viewport', () => {
    it('hovercard is at top of the anchor', () => {
      cy.get('#third').as('anchor')
      cy.get('@anchor').trigger('mouseenter')
      cy.get('div.hovercard:not(.is-hidden)').as('hovercard')
      let anchorTop

      cy.get('@anchor').then($anchor => {
        anchorTop = $anchor[0].getBoundingClientRect().top
      })

      cy.get('@hovercard').then($hovercard => {
        expect(
          $hovercard[0].getBoundingClientRect().top +
            $hovercard[0].getBoundingClientRect().height
        ).to.be.lessThan(anchorTop)
      })
    })

    it('hovercard is at botttom of the anchor', () => {
      cy.get('#fourth').as('anchor')
      cy.get('@anchor').trigger('mouseenter')
      cy.get('div.hovercard:not(.is-hidden)').as('hovercard')
      let anchorTop

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
    })
  })

  context('anchor is 0 to right of the viewport', () => {
    it('hovercard is at top of the anchor', () => {
      cy.get('#fifth').as('anchor')
      cy.get('@anchor').trigger('mouseenter')
      cy.get('div.hovercard:not(.is-hidden)').as('hovercard')
      let anchorTop, widthHovercard, leftHovercard, leftSvg

      cy.get('@anchor').then($anchor => {
        anchorTop = $anchor[0].getBoundingClientRect().top
      })

      cy.get('@hovercard').then($hovercard => {
        expect(
          $hovercard[0].getBoundingClientRect().top +
            $hovercard[0].getBoundingClientRect().height
        ).to.be.lessThan(anchorTop)
        widthHovercard = $hovercard[0].getBoundingClientRect().width
        leftHovercard = $hovercard[0].getBoundingClientRect().left
      })

      cy.get('div.hovercard:not(.is-hidden) svg').then($svg => {
        leftSvg = $svg[0].getBoundingClientRect().left
        expect(leftSvg - leftHovercard).to.be.greaterThan(widthHovercard / 2)
      })
    })

    it('hovercard is at bottom of the anchor', () => {
      cy.get('#sixth').as('anchor')
      cy.get('@anchor').trigger('mouseenter')
      cy.get('div.hovercard:not(.is-hidden)').as('hovercard')
      let anchorTop, widthHovercard, leftHovercard, leftSvg

      cy.get('@anchor').then($anchor => {
        anchorTop =
          $anchor[0].getBoundingClientRect().top +
          $anchor[0].getBoundingClientRect().height
      })

      cy.get('@hovercard').then($hovercard => {
        expect($hovercard[0].getBoundingClientRect().top).to.be.greaterThan(
          anchorTop
        )
        widthHovercard = $hovercard[0].getBoundingClientRect().width
        leftHovercard = $hovercard[0].getBoundingClientRect().left
      })

      cy.get('div.hovercard:not(.is-hidden) svg').then($svg => {
        leftSvg = $svg[0].getBoundingClientRect().left
        expect(leftSvg - leftHovercard).to.be.greaterThan(widthHovercard / 2)
      })
    })
  })
})
