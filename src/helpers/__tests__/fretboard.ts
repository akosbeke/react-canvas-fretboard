import {NoteWithOctave} from '../../types/note'
import {
  getFramePositions,
  getSidePositions,
  getFretXPositions,
  getBetweenFretsXPositions,
  getStringPositions,
  getNoteLocations,
  getFretPositions,
  getShorthandValue,
  fretDistances,
} from '../fretboard'

describe('getFramePositions', () => {
  test('should return the coordinates and dimensions for the fretboard frame', () => {
    expect(getFramePositions(0, 1000, 300, false)).toEqual({
      x: 0,
      y: 0,
      width: 1000,
      height: 300,
    })
    expect(getFramePositions(5, 1000, 300, false)).toEqual({
      x: 5,
      y: 5,
      width: 990,
      height: 290,
    })
    expect(getFramePositions([5, 7, 5, 5], 1000, 300, false)).toEqual({
      x: 5,
      y: 5,
      width: 988,
      height: 290,
    })
  })

  test('should use the right padding if left handed', () => {
    expect(getFramePositions([5, 7, 5, 5], 1000, 300, true)).toEqual({
      x: 7,
      y: 5,
      width: 988,
      height: 290,
    })
  })
})

describe('getSidePositions', () => {
  test('should give the coordinates for the nut and last frets', () => {
    expect(getSidePositions(0, 1000, 300, false)).toEqual({
      nut: {x1: 0, y1: 0, x2: 0, y2: 300},
      lastFret: {x1: 1000, y1: 0, x2: 1000, y2: 300},
    })

    expect(getSidePositions(10, 1000, 300, false)).toEqual({
      nut: {x1: 10, y1: 10, x2: 10, y2: 290},
      lastFret: {x1: 990, y1: 10, x2: 990, y2: 290},
    })
  })

  test('should swap the positions if left handed', () => {
    expect(getSidePositions(0, 1000, 300, true)).toEqual({
      nut: {x1: 1000, y1: 0, x2: 1000, y2: 300},
      lastFret: {x1: 0, y1: 0, x2: 0, y2: 300},
    })

    expect(getSidePositions(10, 1000, 300, true)).toEqual({
      nut: {x1: 990, y1: 10, x2: 990, y2: 290},
      lastFret: {x1: 10, y1: 10, x2: 10, y2: 290},
    })
  })
})

describe('getFretXPositions', () => {
  test('should return all the X coordinates for the frets', () => {
    const fretPositions = getFretXPositions(1000, 0, fretDistances, 12, false)

    expect(fretPositions).toEqual([
      112.25200000000001, 218.202, 318.20799999999997, 412.582,
      501.69399999999996, 585.7860000000001, 665.16, 740.078, 810.7919999999999,
      877.538, 940.5360000000001, 1000,
    ])
  })

  test('should count from the right side if left handed', () => {
    const fretPositions = getFretXPositions(1000, 0, fretDistances, 12, true)

    expect(fretPositions).toEqual([
      887.748, 781.798, 681.792, 587.418, 498.30600000000004,
      414.21399999999994, 334.84000000000003, 259.922, 189.20800000000008,
      122.46199999999999, 59.46399999999994, 0,
    ])
  })
})

describe('getBetweenFretsXPositions', () => {
  test('should return the coordinates for the center of each fret', () => {
    expect(
      getBetweenFretsXPositions(1000, 0, fretDistances, 12, false),
    ).toEqual([
      56.126000000000005, 165.227, 268.205, 365.395, 457.138, 543.74, 625.473,
      702.6189999999999, 775.435, 844.165, 909.037, 970.268,
    ])
  })

  test('should return the coordinates for the center of each fret', () => {
    expect(getBetweenFretsXPositions(1000, 0, fretDistances, 12, true)).toEqual(
      [
        943.874, 834.773, 731.7950000000001, 634.605, 542.8620000000001, 456.26,
        374.527, 297.38100000000003, 224.56500000000005, 155.83500000000004,
        90.96299999999997, 29.73199999999997,
      ],
    )
  })
})

describe('getStringPositions', () => {
  test('should return the coordinates for all the strings', () => {
    expect(
      getStringPositions(
        1000,
        300,
        0,
        ['E2', 'A2', 'D3', 'G3', 'B3', 'E4'],
        0,
        false,
      ),
    ).toEqual([
      {x1: 0, x2: 1000, y: 0},
      {x1: 0, x2: 1000, y: 60},
      {x1: 0, x2: 1000, y: 120},
      {x1: 0, x2: 1000, y: 180},
      {x1: 0, x2: 1000, y: 240},
      {x1: 0, x2: 1000, y: 300},
    ])

    expect(
      getStringPositions(
        1000,
        300,
        0,
        ['E2', 'A2', 'D3', 'G3', 'B3', 'E4'],
        5,
        false,
      ),
    ).toEqual([
      {x1: 0, x2: 1000, y: 5},
      {x1: 0, x2: 1000, y: 63},
      {x1: 0, x2: 1000, y: 121},
      {x1: 0, x2: 1000, y: 179},
      {x1: 0, x2: 1000, y: 237},
      {x1: 0, x2: 1000, y: 295},
    ])

    expect(
      getStringPositions(
        1000,
        300,
        10,
        ['E2', 'A2', 'D3', 'G3', 'B3', 'E4'],
        0,
        false,
      ),
    ).toEqual([
      {x1: 10, x2: 990, y: 10},
      {x1: 10, x2: 990, y: 66},
      {x1: 10, x2: 990, y: 122},
      {x1: 10, x2: 990, y: 178},
      {x1: 10, x2: 990, y: 234},
      {x1: 10, x2: 990, y: 290},
    ])
  })

  test('should use the correct padding if left handed', () => {
    expect(
      getStringPositions(
        1000,
        300,
        [0, 7, 0, 5],
        ['E2', 'A2', 'D3', 'G3', 'B3', 'E4'],
        0,
        true,
      ),
    ).toEqual([
      {x1: 995, x2: 7, y: 0},
      {x1: 995, x2: 7, y: 60},
      {x1: 995, x2: 7, y: 120},
      {x1: 995, x2: 7, y: 180},
      {x1: 995, x2: 7, y: 240},
      {x1: 995, x2: 7, y: 300},
    ])
  })
})

const defaultConfig = {
  fontFamily: '"Proxima Nova", "Helvetica Neue", Helvetica, Arial, sans-serif',
  labelFontSize: '16px',
  nutWidth: 16,
  fretWidth: 6,
  dotRadius: 10,
  selectedNoteRadius: 18,
}

describe('getNoteLocations', () => {
  test('should return positions for a specific note on the fretboard', () => {
    let locations = getNoteLocations(
      'C',
      1000,
      300,
      0,
      fretDistances,
      12,
      ['E2', 'A2', 'D3', 'G3', 'B3', 'E4'] as NoteWithOctave[],
      0,
      defaultConfig,
      false,
    )

    expect(Object.keys(locations).length).toBe(6)
    expect(locations.E2).toBeDefined()
    if (locations.E2) {
      expect(locations.E2[0].index).toEqual(8)
      expect(locations.E2[0].note.name).toBe('C3')
      expect(locations.E2[0]).toHaveProperty('index')
      expect(locations.E2[0]).toHaveProperty('note')
      expect(locations.E2[0]).toHaveProperty('frets')
      expect(locations.E2[0]).toHaveProperty('button')
    }

    locations = getNoteLocations(
      'all', // every note
      1000,
      300,
      0,
      fretDistances,
      12,
      ['E2', 'A2', 'D3', 'G3', 'B3', 'E4'] as NoteWithOctave[],
      0,
      defaultConfig,
      false,
      ['E2'], // only low E string
    )

    expect(Object.keys(locations).length).toBe(1)
    expect(locations.E2).toBeDefined()
    if (locations.E2) {
      expect(locations.E2.length).toBe(13)
    }
  })
})

describe('getFretPositions', () => {
  test('should return all the positions for a fret on a string', () => {
    let fretPositions = getFretPositions(
      1,
      'E2',
      1000,
      300,
      0,
      fretDistances,
      12,
      ['E2', 'A2', 'D3', 'G3', 'B3', 'E4'],
      0,
      defaultConfig,
      false,
    )
    expect(fretPositions).toEqual({
      frets: {
        before: {x: 8, y: 300},
        after: {x: 112.25200000000001, y: 300},
        between: {x: 56.126000000000005, y: 300},
      },
      button: {x1: 8, y1: 270, x2: 112.25200000000001, y2: 300},
    })

    fretPositions = getFretPositions(
      1,
      'E2',
      1000,
      300,
      0,
      fretDistances,
      12,
      ['E2', 'A2', 'D3', 'G3', 'B3', 'E4'],
      0,
      defaultConfig,
      true, // left handed
    )

    expect(fretPositions).toEqual({
      frets: {
        before: {x: 992, y: 300},
        after: {x: 887.748, y: 300},
        between: {x: 943.874, y: 300},
      },
      button: {x1: 887.748, y1: 270, x2: 992, y2: 300},
    })

    fretPositions = getFretPositions(
      0, // zero fret
      'E2',
      1000,
      300,
      0,
      fretDistances,
      12,
      ['E2', 'A2', 'D3', 'G3', 'B3', 'E4'],
      0,
      defaultConfig,
      true, // left handed
    )
    expect(fretPositions).toEqual({
      frets: {
        before: {x: 992, y: 300},
        after: {x: 1000, y: 300},
        between: {x: 1000, y: 300},
      },
      button: {x1: 992, y1: 270, x2: 1000, y2: 300},
    })
  })
})

describe('getShorthandValue', () => {
  describe('when a single number is given', () => {
    test('should return the same value for all sides if one value was given', () => {
      const paddingTop = getShorthandValue(45, 'top')
      const paddingRight = getShorthandValue(45, 'right')
      const paddingBottom = getShorthandValue(45, 'bottom')
      const paddingLeft = getShorthandValue(45, 'left')

      expect(paddingTop).toBe(45)
      expect(paddingRight).toBe(45)
      expect(paddingBottom).toBe(45)
      expect(paddingLeft).toBe(45)
    })
  })

  describe('when array is given', () => {
    test('should return the same value for all sides if one value was given', () => {
      const paddingTop = getShorthandValue([45], 'top')
      const paddingRight = getShorthandValue([45], 'right')
      const paddingBottom = getShorthandValue([45], 'bottom')
      const paddingLeft = getShorthandValue([45], 'left')

      expect(paddingTop).toBe(45)
      expect(paddingRight).toBe(45)
      expect(paddingBottom).toBe(45)
      expect(paddingLeft).toBe(45)
    })

    test('should return the correct value if two values were given', () => {
      const values = [45, 50]
      const paddingTop = getShorthandValue(values, 'top')
      const paddingRight = getShorthandValue(values, 'right')
      const paddingBottom = getShorthandValue(values, 'bottom')
      const paddingLeft = getShorthandValue(values, 'left')

      expect(paddingTop).toBe(45)
      expect(paddingRight).toBe(50)
      expect(paddingBottom).toBe(45)
      expect(paddingLeft).toBe(50)
    })

    test('should return the correct value if three values were given', () => {
      const values = [45, 50, 55]
      const paddingTop = getShorthandValue(values, 'top')
      const paddingRight = getShorthandValue(values, 'right')
      const paddingBottom = getShorthandValue(values, 'bottom')
      const paddingLeft = getShorthandValue(values, 'left')

      expect(paddingTop).toBe(45)
      expect(paddingRight).toBe(50)
      expect(paddingBottom).toBe(55)
      expect(paddingLeft).toBe(50)
    })

    test('should return the correct value if four values were given', () => {
      const values = [45, 50, 55, 60]
      const paddingTop = getShorthandValue(values, 'top')
      const paddingRight = getShorthandValue(values, 'right')
      const paddingBottom = getShorthandValue(values, 'bottom')
      const paddingLeft = getShorthandValue(values, 'left')

      expect(paddingTop).toBe(45)
      expect(paddingRight).toBe(50)
      expect(paddingBottom).toBe(55)
      expect(paddingLeft).toBe(60)
    })

    test('should return the correct value if more than four values were given', () => {
      const values = [45, 50, 55, 60, 65]
      const paddingTop = getShorthandValue(values, 'top')
      const paddingRight = getShorthandValue(values, 'right')
      const paddingBottom = getShorthandValue(values, 'bottom')
      const paddingLeft = getShorthandValue(values, 'left')

      expect(paddingTop).toBe(45)
      expect(paddingRight).toBe(50)
      expect(paddingBottom).toBe(55)
      expect(paddingLeft).toBe(60)
    })
  })

  describe('when multiple sides were given', () => {
    test('should return the correct values when two sides were given', () => {
      const padding = getShorthandValue([45, 50], ['top', 'right'])

      expect(padding).toEqual({top: 45, right: 50, left: 0, bottom: 0})
    })

    test('should return the correct values when three sides were given', () => {
      const padding = getShorthandValue([45, 50], ['top', 'right', 'bottom'])

      expect(padding).toEqual({top: 45, right: 50, bottom: 45, left: 0})
    })

    test('should return the correct values when four sides were given', () => {
      const padding = getShorthandValue(
        [45, 50],
        ['top', 'right', 'bottom', 'left'],
      )

      expect(padding).toEqual({top: 45, right: 50, bottom: 45, left: 50})
    })

    test('should return the correct values despite the order of sides', () => {
      const padding = getShorthandValue([45, 50], ['right', 'top'])

      expect(padding).toEqual({top: 45, right: 50, bottom: 0, left: 0})
    })

    test('should return the correct values if one padding value was given', () => {
      const padding = getShorthandValue(45, ['right', 'top'])

      expect(padding).toEqual({top: 45, right: 45, left: 0, bottom: 0})
    })
  })
})
