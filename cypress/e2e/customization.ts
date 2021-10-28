describe('Customization', () => {
  it('should match the visual snapshots for tunings or instruments', () => {
    cy.visit('iframe.html?id=customization--tuning-or-instruments').then(() => {
      cy.wait(500)
      cy.get('canvas').toMatchImageSnapshot()
    })
  })

  it('should match the visual snapshots for number of frets', () => {
    cy.visit('iframe.html?id=customization--number-of-frets').then(() => {
      cy.wait(500)
      cy.get('canvas').toMatchImageSnapshot()
    })
  })

  it('should match the visual snapshots for left handed fretboard', () => {
    cy.visit('iframe.html?id=customization--left-handed').then(() => {
      cy.wait(500)
      cy.get('canvas').toMatchImageSnapshot()
    })
  })

  it('should match the visual snapshots for hidden string labels', () => {
    cy.visit('iframe.html?id=customization--hide-string-labels').then(() => {
      cy.wait(500)
      cy.get('canvas').toMatchImageSnapshot()
    })
  })

  it('should match the visual snapshots for hidden fret labels', () => {
    cy.visit('iframe.html?id=customization--hide-fret-labels').then(() => {
      cy.wait(500)
      cy.get('canvas').toMatchImageSnapshot()
    })
  })
})
