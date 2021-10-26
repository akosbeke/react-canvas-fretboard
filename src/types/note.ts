export type NoteName = 'letters_english' | 'letters_german' | 'words_german'

export type NaturalNote = 'C' | 'D' | 'E' | 'F' | 'G' | 'A' | 'B' | 'H'
export type NaturalNoteWithOctave =
  | `${NaturalNote}0`
  | `${NaturalNote}1`
  | `${NaturalNote}2`
  | `${NaturalNote}3`
  | `${NaturalNote}4`
  | `${NaturalNote}5`
  | `${NaturalNote}6`
  | `${NaturalNote}7`
  | `${NaturalNote}8`
  | `${NaturalNote}9`

export type Note =
  | NaturalNote
  | `${NaturalNote}b`
  | `${NaturalNote}bb`
  | `${NaturalNote}#`
  | `${NaturalNote}##`

// prettier-ignore
export type NoteWithOctave = `${Note}0` | `${Note}1` | `${Note}2` | `${Note}3` | `${Note}4` | `${Note}5` | `${Note}6` | `${Note}7` | `${Note}8` | `${Note}9`
