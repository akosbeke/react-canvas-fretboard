import * as tonal from '@tonaljs/tonal'
import * as tonalInterval from '@tonaljs/interval'
import * as tonalNote from '@tonaljs/note'
import {NoteWithOctave} from '../types/note'
import {GuitarInstrument, TuningMap} from '../types/guitar'

/**
 * Returns the standard tuning for an instrument
 */
export const getStandardTuning = (
  instrument: GuitarInstrument,
): NoteWithOctave[] => {
  const standardTunings: TuningMap = {
    guitar: ['E2', 'A2', 'D3', 'G3', 'B3', 'E4'],
    'guitar-7': ['B1', 'E2', 'A2', 'D3', 'G3', 'B3', 'E4'],
    bass: ['E1', 'A1', 'D2', 'G2'],
    'bass-5': ['B0', 'E1', 'A1', 'D2', 'G2'],
    'bass-6': ['B0', 'E1', 'A1', 'D2', 'G2', 'C3'],
    ukulele: ['G4', 'C4', 'E4', 'A4'],
  }

  if (!standardTunings[instrument])
    throw new Error('No tuning for this instrument')

  return standardTunings[instrument]
}

/**
 * Returns the modified tuning
 */
export const convertTuningWithMap = (
  tuning: Array<NoteWithOctave>,
  map: Array<number>,
): Array<NoteWithOctave> => {
  const newTuning = tuning.map((string, index) => {
    // If there is no change on that string
    if (!map[index]) return string

    let newNote = tonal.note(
      // We are transposing the open note for the string
      tonal.transpose(string, tonalInterval.fromSemitones(map[index])),
    )

    // We only want sharps for the tuning
    if (newNote.acc === 'b') {
      newNote = tonal.note(tonalNote.enharmonic(newNote.name))
    }

    return <NoteWithOctave>newNote.name
  })

  return newTuning
}
