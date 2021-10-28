describe('Notes', () => {
  it('should match the visual snapshots for default note selection', () => {
    cy.visit('iframe.html?id=notes--select-notes')

    cy.get('canvas').toMatchImageSnapshot()
  })

  it('should match the visual snapshots for notes without labels', () => {
    cy.visit('iframe.html?id=notes--without-label')

    cy.get('canvas').toMatchImageSnapshot()
  })

  it('should match the visual snapshots for notes on only one string', () => {
    cy.visit('iframe.html?id=notes--only-on-strings')

    cy.get('canvas').toMatchImageSnapshot()
  })

  it('should match the visual snapshots for mutliple selected notes', () => {
    cy.visit('iframe.html?id=notes--multiple-notes')

    cy.get('canvas').toMatchImageSnapshot()
  })

  it('should match the visual snapshots for a different default color', () => {
    cy.visit('iframe.html?id=notes--default-color')

    cy.get('canvas').toMatchImageSnapshot()
  })

  it('should match the visual snapshots for a per note color config', () => {
    cy.visit('iframe.html?id=notes--per-note-color')

    cy.get('canvas').toMatchImageSnapshot()
  })

  it('should match the visual snapshots when octaves are hidden', () => {
    cy.visit('iframe.html?id=notes--hide-octave-on-label')

    cy.get('canvas').toMatchImageSnapshot()
  })
})
