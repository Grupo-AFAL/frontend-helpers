// These test were done with the viewport 1000x660
context('HovercardController', () => {
    beforeEach(() => {
        cy.log('lsfjhhlkjsdhfkjhsdlkjfhoih')
        cy.visit('/docs/hovercard-testing.html')

        // hide title and subtitle
        cy.get('h1.title.is-1').invoke('attr', 'class', 'is-hidden')
        cy.get('p.subtitle').invoke('attr', 'class', 'is-hidden')
        cy.get('a[href="/"]').invoke('attr', 'class', 'is-hidden')
        cy.viewport(1000, 660)
    })

    context('anchor is 0 to left of the viewport', () => {
        it('hovercard is at top of the anchor', () => {
            cy.get('#second').as('anchor')
            cy.get('@anchor').trigger('mouseenter')
            cy.get('div.hovercard:not(.is-hidden)').as('hovercard')

            cy.get('@hovercard').should($hovercard => {
                expect($hovercard).to.have.css('left', '8px')
                expect($hovercard).to.have.css('top', '110px')
            })

            cy.get('div.hovercard:not(.is-hidden) svg').should($svg => {
                expect($svg).to.have.css('left', '53.5859px')
            })
            cy.get('@anchor').trigger('mouseleave')
        })

        it('hovercard is at botttom of the anchor', () => {
            cy.get('#first').as('anchor')
            cy.get('@anchor').trigger('mouseenter')
            cy.get('div.hovercard:not(.is-hidden)').as('hovercard')

            cy.get('@hovercard').should($hovercard => {
                expect($hovercard).to.have.css('left', '8px')
                expect($hovercard).to.have.css('top', '122px')
            })
            cy.get('div.hovercard:not(.is-hidden) svg').should($svg => {
                expect($svg).to.have.css('left', '53.5859px')
                expect($svg).to.have.attr('transform', 'rotate(180)')
            })
            cy.get('@anchor').trigger('mouseleave')
        })
    })

    context('anchor is in the middle of the viewport', () => {
        it('hovercard is at top of the anchor', () => {
            cy.get('#fourth').as('anchor')
            cy.get('@anchor').trigger('mouseenter')
            cy.get('div.hovercard:not(.is-hidden)').as('hovercard')

            cy.get('@hovercard').should($hovercard => {
                expect(window.innerWidth).to.equal(10)
                    // expect($hovercard).to.have.css('left', '435.586px')
                    // expect($hovercard).to.have.css('top', '110px')
            })
            cy.get('div.hovercard:not(.is-hidden) svg').should($svg => {
                expect($svg).to.have.css('left', '92.5px')
            })
            cy.get('@anchor').trigger('mouseleave')
        })

        it('hovercard is at botttom of the anchor', () => {
            cy.get('#third').as('anchor')
            cy.get('@anchor').trigger('mouseenter')
            cy.get('div.hovercard:not(.is-hidden)').as('hovercard')

            cy.get('@hovercard').should($hovercard => {
                expect($hovercard).to.have.css('left', '435.586px')
                expect($hovercard).to.have.css('top', '122px')
            })
            cy.get('div.hovercard:not(.is-hidden) svg').should($svg => {
                expect($svg).to.have.css('left', '92.5px')
                expect($svg).to.have.attr('transform', 'rotate(180)')
            })
            cy.get('@anchor').trigger('mouseleave')
        })
    })

    context('anchor is 0 to right of the viewport', () => {
        it('hovercard is at top of the anchor', () => {
            cy.get('#sixth').as('anchor')
            cy.get('@anchor').trigger('mouseenter')
            cy.get('div.hovercard:not(.is-hidden)').as('hovercard')

            cy.get('@hovercard').should($hovercard => {
                expect($hovercard).to.have.css('left', '765px')
                expect($hovercard).to.have.css('top', '110px')
            })
            cy.get('div.hovercard:not(.is-hidden) svg').should($svg => {
                expect($svg).to.have.css('left', '134.414px')
            })
            cy.get('@anchor').trigger('mouseleave')
        })

        it('hovercard is at bottom of the anchor', () => {
            cy.get('#fifth').as('anchor')
            cy.get('@anchor').trigger('mouseenter')
            cy.get('div.hovercard:not(.is-hidden)').as('hovercard')

            cy.get('@hovercard').should($hovercard => {
                expect($hovercard).to.have.css('left', '765px')
                expect($hovercard).to.have.css('top', '122px')
            })
            cy.get('div.hovercard:not(.is-hidden) svg').should($svg => {
                expect($svg).to.have.css('left', '134.414px')
                expect($svg).to.have.attr('transform', 'rotate(180)')
            })
        })
    })
})