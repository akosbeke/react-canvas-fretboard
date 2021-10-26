import * as tonal from '@tonaljs/tonal'

import {GuitarNeckType} from './guitar'
import {NoteWithOctave} from './note'

export interface FretboardColorScheme {
  frame: string
  nut: string
  dots: string
  string: string
  stringShadow: string
  labels: string
  frets: string
}

interface FretboardColorSchemePlain {
  light: FretboardColorScheme
  dark: FretboardColorScheme
}

type GuitarNeckTypeWithoutPlain = Exclude<GuitarNeckType, 'plain'>

export type FretboardColorSchemes = {
  [K in GuitarNeckTypeWithoutPlain]: FretboardColorScheme
} & {
  plain: FretboardColorSchemePlain
}

export type FretboardShorthandSide = 'top' | 'right' | 'bottom' | 'left'

export type FretboardShorthandObject = {
  [K in FretboardShorthandSide]: number
}

export interface FretboardFramePositions {
  x: number
  y: number
  width: number
  height: number
}

export interface FretboardSidePosition {
  x1: number
  y1: number
  x2: number
  y2: number
}

export interface FretboardSidePositions {
  nut: FretboardSidePosition
  lastFret: FretboardSidePosition
}

export interface FretboardStringPositions {
  x1: number
  x2: number
  y: number
}

export interface FretboardConfig {
  fontFamily: string
  labelFontSize: string
  nutWidth: number
  fretWidth: number
  dotRadius: number
  selectedNoteRadius: number
}

export interface FretboardFretPositionsFretsObject {
  x: number
  y: number
}

export interface FretboardFretPositionsFrets {
  before: FretboardFretPositionsFretsObject
  after: FretboardFretPositionsFretsObject
  between: FretboardFretPositionsFretsObject
}

export interface FretboardFretPositionsButtons {
  x1: number
  y1: number
  x2: number
  y2: number
}

export interface FretboardFretPositions {
  frets: FretboardFretPositionsFrets
  button: FretboardFretPositionsButtons
}

export interface FretboardNoteLocation extends FretboardFretPositions {
  index: number
  note: tonal.Core.Note | tonal.NoNote
  string?: string
}

export type FretboardNoteLocations = {
  [K in NoteWithOctave]?: FretboardNoteLocation[]
}
