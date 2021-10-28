describe('Appearance', () => {
  it('should match the visual snapshots for the default variant', () => {
    cy.visit('iframe.html?id=appearance--default').then(() => {
      cy.wait(500)
      cy.get('canvas').toMatchImageSnapshot()
    })
  })

  it('should match the visual snapshots for the maple neck type', () => {
    cy.visit('iframe.html?id=appearance--neck-type-maple').then(() => {
      cy.wait(500)
      cy.get('canvas').toMatchImageSnapshot()
    })
  })

  it('should match the visual snapshots for the rosewood neck type', () => {
    cy.visit('iframe.html?id=appearance--neck-type-rosewood').then(() => {
      cy.wait(500)
      cy.get('canvas').toMatchImageSnapshot()
    })
  })

  it('should match the visual snapshots for dark mode', () => {
    cy.visit('iframe.html?id=appearance--dark-mode').then(() => {
      cy.wait(500)
      cy.get('canvas').toMatchImageSnapshot()
    })
  })

  it('should match the visual snapshots for custom dimensions', () => {
    cy.visit('iframe.html?id=appearance--custom-dimensions').then(() => {
      cy.wait(500)
      cy.get('canvas').toMatchImageSnapshot()
    })
  })

  it('should match the visual snapshots for mobile', () => {
    cy.viewport(414, 896)
    cy.visit('iframe.html?id=appearance--mobile').then(() => {
      cy.wait(500)
      cy.get('canvas').toMatchImageSnapshot()
    })
  })

  it('should match the visual snapshots for custom background and padding', () => {
    cy.visit('iframe.html?id=appearance--background-and-padding').then(() => {
      cy.wait(500)
      cy.get('canvas').toMatchImageSnapshot()
    })
  })
})
