context('DatepickerController', () => {
  beforeEach(() => {
    cy.visit('/docs/datepicker.html')
  })

  it('Starts datepicker with Spanish as its default language', () => {
    cy.get('div .default-datepicker')
      .children('.form-control.input')
      .click()

    cy.get('.flatpickr-calendar.open')
      .as('datepicker')
      .should('be.visible')

    cy.get('@datepicker')
      .find('.flatpickr-weekdaycontainer span')
      .first()
      .should('have.have', 'Lun')
      .next()
      .should('have.have', 'Mar')
      .next()
      .should('have.have', 'Mié')
  })

  it('Starts datepicker with the English language', () => {
    cy.get('div .english-datepicker')
      .children('.form-control.input')
      .click()

    cy.get('.flatpickr-calendar.open')
      .as('datepicker')
      .should('be.visible')

    cy.get('@datepicker')
      .find('.flatpickr-weekdaycontainer span')
      .first()
      .should('have.have', 'Sun')
      .next()
      .should('have.have', 'Mon')
      .next()
      .should('have.have', 'Tue')
  })

  it('Set next day', () => {
    cy.get('#date')
      .as('input')
      .should('have.value', '2022-03-30')

    cy.get('#previous-btn').click()

    cy.get('@input').should('have.value', '2022-03-29')

    cy.get('#next-btn').click()

    cy.get('@input').should('have.value', '2022-03-30')
  })
})
