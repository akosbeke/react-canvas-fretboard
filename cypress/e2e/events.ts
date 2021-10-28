describe('Events', () => {
  it('should match the visual snapshots for default note selection', () => {
    cy.visit('iframe.html?id=events--on-fretboard-click')

    cy.get('canvas').click(296, 187)

    cy.get('input[name=noteName]').should('have.value', 'C3')
    cy.get('input[name=eventType]').should('have.value', 'click')
    cy.get('input[name=stringName]').should('have.value', 'A2')

    cy.get('canvas').click(615, 79)

    cy.get('input[name=noteName]').should('have.value', 'F#4')
    cy.get('input[name=eventType]').should('have.value', 'click')
    cy.get('input[name=stringName]').should('have.value', 'B3')
  })
})
