describe('Customization', () => {
  it('should match the visual snapshots for tunings or instruments', () => {
    cy.visit('iframe.html?id=customization--tuning-or-instruments')

    cy.get('canvas').toMatchImageSnapshot()
  })

  it('should match the visual snapshots for number of frets', () => {
    cy.visit('iframe.html?id=customization--number-of-frets')

    cy.get('canvas').toMatchImageSnapshot()
  })

  it('should match the visual snapshots for left handed fretboard', () => {
    cy.visit('iframe.html?id=customization--left-handed')

    cy.get('canvas').toMatchImageSnapshot()
  })

  it('should match the visual snapshots for hidden string labels', () => {
    cy.visit('iframe.html?id=customization--hide-string-labels')

    cy.get('canvas').toMatchImageSnapshot()
  })

  it('should match the visual snapshots for hidden fret labels', () => {
    cy.visit('iframe.html?id=customization--hide-fret-labels')

    cy.get('canvas').toMatchImageSnapshot()
  })
})
