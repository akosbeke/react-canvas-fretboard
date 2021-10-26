import {replaceNoteChars} from '../notes'

describe('replaceNoteChars', () => {
  test('should replace flat and sharp characters', () => {
    expect(replaceNoteChars('C#')).toBe('C♯')
    expect(replaceNoteChars('C#7')).toBe('C♯7')
    expect(replaceNoteChars('Cb')).toBe('C♭')
    expect(replaceNoteChars('Cb7')).toBe('C♭7')
  })
})
