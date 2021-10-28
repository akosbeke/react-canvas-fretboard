describe('String highlights', () => {
  it('should match the visual snapshots for default string highlight', () => {
    cy.visit('iframe.html?id=string-highlight--default')

    cy.get('canvas').toMatchImageSnapshot()
  })

  it('should match the visual snapshots for custom color highlight', () => {
    cy.visit('iframe.html?id=string-highlight--custom-color')

    cy.get('canvas').toMatchImageSnapshot()
  })

  it('should match the visual snapshots for multiple strings', () => {
    cy.visit('iframe.html?id=string-highlight--multiple-strings')

    cy.get('canvas').toMatchImageSnapshot()
  })
})
