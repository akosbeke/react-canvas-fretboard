import {Note, NoteWithOctave} from '../types/note'

export const replaceNoteChars = (note: Note | NoteWithOctave): string => {
  let noteName = <string>note

  noteName = noteName.replace('b', '♭')
  noteName = noteName.replace('#', '♯')

  return noteName
}
