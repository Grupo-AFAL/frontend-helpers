import 'cypress-file-upload'

context('ImagePreviewController', () => {
  beforeEach(() => {
    cy.visit('/docs/image-preview.html')
  })

  it('replaces image from img tag with the target output', () => {
    cy.get('img')
      .invoke('attr', 'src')
      .should('include', 'images.unsplash.com')

    cy.fixture('kid.jpg').then(fileContent => {
      cy.get('#file-input').attachFile({
        fileContent: fileContent.toString(),
        fileName: 'kid.jpg',
        mimeType: 'image/png'
      })
    })

    cy.get('img')
      .invoke('attr', 'src')
      .should('not.include', 'images.unsplash.com')
      .and('include', 'blob')
  })
})
