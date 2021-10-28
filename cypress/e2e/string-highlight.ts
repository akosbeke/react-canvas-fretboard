describe('String highlights', () => {
  it('should match the visual snapshots for default string highlight', () => {
    cy.visit('iframe.html?id=string-highlight--default').then(() => {
      cy.document().toMatchImageSnapshot()
    })
  })

  it('should match the visual snapshots for custom color highlight', () => {
    cy.visit('iframe.html?id=string-highlight--custom-color').then(() => {
      cy.document().toMatchImageSnapshot()
    })
  })

  it('should match the visual snapshots for multiple strings', () => {
    cy.visit('iframe.html?id=string-highlight--multiple-strings').then(() => {
      cy.document().toMatchImageSnapshot()
    })
  })
})
