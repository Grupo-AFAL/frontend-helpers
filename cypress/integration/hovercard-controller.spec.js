context('HovercardController', () => {
  beforeEach(() => {
    cy.visit('/docs/hovercard-testing.html')
  })

  context('anchor is 0 to left of the viewport', () => {
    it('hovercard is at the top of the anchor', () => {
      cy.get('#bottomLeft').as('anchor')
      cy.get('@anchor').trigger('mouseenter')
      cy.get('div.hovercard:not(.is-hidden)').as('hovercard')
      let anchorTop, hovercardWidth, hovercardLeft, svgLeft

      cy.get('@anchor').then($anchor => {
        anchorTop = $anchor[0].getBoundingClientRect().top
      })

      cy.get('@hovercard').then($hovercard => {
        expect(
          $hovercard[0].getBoundingClientRect().top +
            $hovercard[0].getBoundingClientRect().height
        ).to.be.lessThan(anchorTop)
        hovercardWidth = $hovercard[0].getBoundingClientRect().width
        hovercardLeft = $hovercard[0].getBoundingClientRect().left
      })

      cy.get('div.hovercard:not(.is-hidden) svg').then($svg => {
        svgLeft = $svg[0].getBoundingClientRect().left
        expect(svgLeft - hovercardLeft).to.be.lessThan(hovercardWidth / 2)
      })
    })

    it('hovercard is at the botttom of the anchor', () => {
      cy.get('#topLeft').as('anchor')
      cy.get('@anchor').trigger('mouseenter')
      cy.get('div.hovercard:not(.is-hidden)').as('hovercard')
      let anchorBottom, hovercardWidth, hovercardLeft, svgLeft

      cy.get('@anchor').then($anchor => {
        anchorBottom =
          $anchor[0].getBoundingClientRect().top +
          $anchor[0].getBoundingClientRect().height
      })

      cy.get('@hovercard').then($hovercard => {
        expect($hovercard[0].getBoundingClientRect().top).to.be.greaterThan(
          anchorBottom
        )
        hovercardWidth = $hovercard[0].getBoundingClientRect().width
        hovercardLeft = $hovercard[0].getBoundingClientRect().left
      })

      cy.get('div.hovercard:not(.is-hidden) svg').then($svg => {
        svgLeft = $svg[0].getBoundingClientRect().left
        expect(svgLeft - hovercardLeft).to.be.lessThan(hovercardWidth / 2)
      })
    })
  })

  context('anchor is in the middle of the viewport', () => {
    it('hovercard is at top of the anchor', () => {
      cy.get('#bottomCenter').as('anchor')
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

    it('hovercard is at the botttom of the anchor', () => {
      cy.get('#topCenter').as('anchor')
      cy.get('@anchor').trigger('mouseenter')
      cy.get('div.hovercard:not(.is-hidden)').as('hovercard')
      let anchorBottom

      cy.get('@anchor').then($anchor => {
        anchorBottom =
          $anchor[0].getBoundingClientRect().top +
          $anchor[0].getBoundingClientRect().height
      })

      cy.get('@hovercard').then($hovercard => {
        expect($hovercard[0].getBoundingClientRect().top).to.be.greaterThan(
          anchorBottom
        )
      })
    })
  })

  context('anchor is 0 to right of the viewport', () => {
    it('hovercard is at the top of the anchor', () => {
      cy.get('#bottomRight').as('anchor')
      cy.get('@anchor').trigger('mouseenter')
      cy.get('div.hovercard:not(.is-hidden)').as('hovercard')
      let anchorTop, hovercardWidth, hovercardLeft, svgLeft

      cy.get('@anchor').then($anchor => {
        anchorTop = $anchor[0].getBoundingClientRect().top
      })

      cy.get('@hovercard').then($hovercard => {
        expect(
          $hovercard[0].getBoundingClientRect().top +
            $hovercard[0].getBoundingClientRect().height
        ).to.be.lessThan(anchorTop)
        hovercardWidth = $hovercard[0].getBoundingClientRect().width
        hovercardLeft = $hovercard[0].getBoundingClientRect().left
      })

      cy.get('div.hovercard:not(.is-hidden) svg').then($svg => {
        svgLeft = $svg[0].getBoundingClientRect().left
        expect(svgLeft - hovercardLeft).to.be.greaterThan(hovercardWidth / 2)
      })
    })

    it('hovercard is at the bottom of the anchor', () => {
      cy.get('#topRight').as('anchor')
      cy.get('@anchor').trigger('mouseenter')
      cy.get('div.hovercard:not(.is-hidden)').as('hovercard')
      let anchorBottom, hovercardWidth, hovercardLeft, svgLeft

      cy.get('@anchor').then($anchor => {
        anchorBottom =
          $anchor[0].getBoundingClientRect().top +
          $anchor[0].getBoundingClientRect().height
      })

      cy.get('@hovercard').then($hovercard => {
        expect($hovercard[0].getBoundingClientRect().top).to.be.greaterThan(
          anchorBottom
        )
        hovercardWidth = $hovercard[0].getBoundingClientRect().width
        hovercardLeft = $hovercard[0].getBoundingClientRect().left
      })

      cy.get('div.hovercard:not(.is-hidden) svg').then($svg => {
        svgLeft = $svg[0].getBoundingClientRect().left
        expect(svgLeft - hovercardLeft).to.be.greaterThan(hovercardWidth / 2)
      })
    })
  })
})
