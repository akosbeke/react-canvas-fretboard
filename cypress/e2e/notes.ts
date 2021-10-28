describe('Notes', () => {
  it('should match the visual snapshots for default note selection', () => {
    cy.visit('iframe.html?id=notes--select-notes').then(() => {
      cy.get('canvas').toMatchImageSnapshot()
    })
  })

  it('should match the visual snapshots for notes without labels', () => {
    cy.visit('iframe.html?id=notes--without-label').then(() => {
      cy.get('canvas').toMatchImageSnapshot()
    })
  })

  it('should match the visual snapshots for notes on only one string', () => {
    cy.visit('iframe.html?id=notes--only-on-strings').then(() => {
      cy.get('canvas').toMatchImageSnapshot()
    })
  })

  it('should match the visual snapshots for mutliple selected notes', () => {
    cy.visit('iframe.html?id=notes--multiple-notes').then(() => {
      cy.get('canvas').toMatchImageSnapshot()
    })
  })

  it('should match the visual snapshots for a different default color', () => {
    cy.visit('iframe.html?id=notes--default-color').then(() => {
      cy.get('canvas').toMatchImageSnapshot()
    })
  })

  it('should match the visual snapshots for a per note color config', () => {
    cy.visit('iframe.html?id=notes--per-note-color').then(() => {
      cy.get('canvas').toMatchImageSnapshot()
    })
  })

  it('should match the visual snapshots when octaves are hidden', () => {
    cy.visit('iframe.html?id=notes--hide-octave-on-label').then(() => {
      cy.get('canvas').toMatchImageSnapshot()
    })
  })
})
