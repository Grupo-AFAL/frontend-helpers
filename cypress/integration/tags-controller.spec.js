context('TagsController', () => {
  beforeEach(() => {
    cy.visit('/docs/tags-input.html')
  })

  context('tags with text', () => {
    const scope = '#tags-with-text'

    beforeEach(() => {
      cy.get(`${scope} .input`)
        .as('fakeInput')
        .click()
      cy.get(`${scope} .results li:first-child`)
        .as('firstOption')
        .click()

      cy.get('@fakeInput').click()
      cy.get('@firstOption').click()

      cy.get(`${scope} .input-tag:first-child`).as('firstSelectedOption')
      cy.get(`${scope} .input-tag:nth-child(2)`).as('secondSelectedOption')
      cy.get(`${scope} .input-tag`).as('inputTags')
      cy.get(`${scope} input[name="field[]"]`).as('hiddenInputs')
    })

    it('displays the selected items', () => {
      cy.get('@firstSelectedOption').should('contain.text', 'One')
      cy.get('@secondSelectedOption').should('contain.text', 'Two')
    })

    it('stores the selected values in the hidden inputs', () => {
      cy.get('@hiddenInputs').should($inputs => {
        const values = $inputs.map((i, el) => Cypress.$(el).val()).get()

        expect(values).to.have.length(2)
        expect(values).to.deep.eq(['One', 'Two'])
      })
    })

    it('filters items in the list', () => {
      cy.get('@fakeInput')
        .find('input')
        .type('fiv')
      cy.get('@firstOption').should('have.text', 'Five')
      cy.get(`${scope} .results li`).should('have.length', 1)
    })

    it('selects a filtered element by pressing ENTER', () => {
      cy.get('@fakeInput')
        .find('input')
        .type('fiv')
        .type('{enter}')
      cy.get(`${scope} .input-tag:nth-child(3)`).should('contain.text', 'Five')
    })

    it('removes an item by clicking the X', () => {
      cy.get('@firstSelectedOption')
        .find('.close-btn')
        .click()

      cy.get('@inputTags').should('have.length', 1)
      cy.get('@hiddenInputs').should('have.length', 1)
    })

    it('removes an item by typing BACKSPACE', () => {
      cy.get('@fakeInput')
        .click()
        .find('input')
        .type('{BACKSPACE}')

      cy.get('@inputTags').should('have.length', 1)
      cy.get('@hiddenInputs').should('have.length', 1)
    })

    it('hides the results by typing ESC', () => {
      cy.get('@fakeInput').click()

      cy.get(`${scope} .results li`).should('have.length', 4)

      cy.get('@fakeInput')
        .find('input')
        .type('{ESC}')

      cy.get(`${scope} .results`).should('have.class', 'is-hidden')
    })

    it('creates a new item', () => {
      cy.get('@fakeInput')
        .click()
        .find('input')
        .type('Noventa y Nueve,')

      cy.get(`${scope} .input-tag:nth-child(3)`).should(
        'contain.text',
        'Noventa y Nueve'
      )
      cy.get('@inputTags').should('have.length', 3)
      cy.get('@hiddenInputs').should('have.length', 3)
    })

    it('creates a new item by clicking on it', () => {
      cy.get('@fakeInput')
        .click()
        .find('input')
        .type('Cien')
      cy.get('@firstOption').click()
      cy.get(`${scope} .input-tag:nth-child(3)`).should('contain.text', 'Cien')
      cy.get('@inputTags').should('have.length', 3)
      cy.get('@hiddenInputs').should('have.length', 3)
    })
  })

  context('tags with ID and Value', () => {
    const scope = '#tags-with-id-value'

    beforeEach(() => {
      cy.get(scope).within(() => {
        cy.get('.input').click()
        cy.get('.results li:first-child').click()
        cy.get('.input-tag:first-child').as('firstSelectedOption')
        cy.get('.input-tag:nth-child(2)').as('secondSelectedOption')
        cy.get('input[name="field[]"]').as('hiddenInputs')
      })
    })

    it('displays the selected items', () => {
      cy.get('@firstSelectedOption').should('contain.text', 'One')
      cy.get('@secondSelectedOption').should('contain.text', 'Two')
    })

    it('stores the selected values in the hidden inputs', () => {
      cy.get('@hiddenInputs').should($inputs => {
        const values = $inputs.map((i, el) => Cypress.$(el).val()).get()

        expect(values).to.have.length(2)
        expect(values).to.deep.eq(['1', '2'])
      })
    })
  })
})
