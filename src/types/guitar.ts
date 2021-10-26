import {NoteWithOctave} from './note'

export type GuitarInstrument =
  | 'guitar'
  | 'guitar-7'
  | 'bass'
  | 'bass-5'
  | 'bass-6'
  | 'ukulele'

export type GuitarNeckType = 'plain' | 'maple' | 'rosewood'

export type TuningMap = {
  [K in GuitarInstrument]: NoteWithOctave[]
}
