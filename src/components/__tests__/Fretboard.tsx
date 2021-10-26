import React from 'react'
import {Fretboard, FretboardProps} from '../Fretboard'
import {render, screen} from '@testing-library/react'

describe('Fretboard component', () => {
  test('should render the component', () => {
    const props: FretboardProps = {
      showFretLabels: false,
      showStringLabels: false,
    }
    render(<Fretboard {...props} />)
    const canvas = screen.getByLabelText(/fretboard/i)

    expect(canvas).toBeInTheDocument()
    expect(canvas).toHaveAttribute('width')
    expect(canvas).toHaveAttribute('height')
  })
})
