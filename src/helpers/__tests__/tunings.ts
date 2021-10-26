import {NoteWithOctave} from '../../types/note'
import {getStandardTuning, convertTuningWithMap} from '../tunings'
import * as tonal from '@tonaljs/tonal'

jest.mock('@tonaljs/tonal', () => ({
  ...jest.requireActual('@tonaljs/tonal'),
  note: jest.fn(),
}))

const mockedTonalNote = tonal.note as jest.Mock<tonal.Core.Note | tonal.NoNote>

beforeEach(() => {
  // Most of the time we want the note() function to work normally
  mockedTonalNote.mockReset()
  mockedTonalNote.mockImplementation(src => {
    return jest.requireActual('@tonaljs/tonal').note(src)
  })
})

describe('getStandardTuning', () => {
  test('should return the correct tuning for the string instrument', () => {
    const correctTunings = {
      guitar: ['E2', 'A2', 'D3', 'G3', 'B3', 'E4'],
      'guitar-7': ['B1', 'E2', 'A2', 'D3', 'G3', 'B3', 'E4'],
      bass: ['E1', 'A1', 'D2', 'G2'],
      'bass-5': ['B0', 'E1', 'A1', 'D2', 'G2'],
      'bass-6': ['B0', 'E1', 'A1', 'D2', 'G2', 'C3'],
      ukulele: ['G4', 'C4', 'E4', 'A4'],
    }

    expect(getStandardTuning('guitar')).toEqual(correctTunings['guitar'])
    expect(getStandardTuning('guitar-7')).toEqual(correctTunings['guitar-7'])
    expect(getStandardTuning('bass')).toEqual(correctTunings['bass'])
    expect(getStandardTuning('bass-5')).toEqual(correctTunings['bass-5'])
    expect(getStandardTuning('bass-6')).toEqual(correctTunings['bass-6'])
    expect(getStandardTuning('ukulele')).toEqual(correctTunings['ukulele'])
  })

  test('should throw an error if no tuning was found for the valid instrument', () => {
    expect(() => {
      // eslint-disable-next-line
      // @ts-ignore
      getStandardTuning('mandolin')
    }).toThrowError('No tuning for this instrument')
  })
})

describe('convertTuningWithMap', () => {
  const tuning: NoteWithOctave[] = ['E2', 'A2', 'D3', 'G3', 'B3', 'E4']
  test('should take any tuning and transpose it string by string', () => {
    const tuningMap = [-1, -1, -1, -1, -1, 1]
    const expected = ['D#2', 'G#2', 'C#3', 'F#3', 'A#3', 'F4']

    expect(convertTuningWithMap(tuning, tuningMap)).toEqual(expected)
    expect(mockedTonalNote).toHaveBeenCalledTimes(6)
  })

  test('should transpose only the string(s) with a map value', () => {
    const tuningMap = []
    tuningMap[2] = -1
    const expected = ['E2', 'A2', 'C#3', 'G3', 'B3', 'E4']

    expect(convertTuningWithMap(tuning, tuningMap)).toEqual(expected)
    expect(mockedTonalNote).toHaveBeenCalledTimes(1)
  })

  test('should give the sharp enharmonic if flat is given', () => {
    const tuningMap = []
    tuningMap[2] = -1
    const expected = ['E2', 'A2', 'C#3', 'G3', 'B3', 'E4']

    // Give it a flat note explicitly
    mockedTonalNote.mockImplementationOnce(() => {
      return jest.requireActual('@tonaljs/tonal').note('Db3')
    })

    expect(convertTuningWithMap(tuning, tuningMap)).toEqual(expected)
    expect(mockedTonalNote).toHaveBeenCalledTimes(2)
  })
})
