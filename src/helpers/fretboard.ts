import {
  FretboardColorSchemes,
  FretboardConfig,
  FretboardFramePositions,
  FretboardFretPositions,
  FretboardNoteLocations,
  FretboardShorthandObject,
  FretboardShorthandSide,
  FretboardSidePositions,
  FretboardStringPositions,
} from './../types/fretboard'
import * as tonal from '@tonaljs/tonal'
import * as tonalInterval from '@tonaljs/interval'
import * as tonalNote from '@tonaljs/note'

import {Note, NoteWithOctave} from '../types/note'

/**
 * Gives back the coordinates for the fretboard frame
 *
 * @param padding The padding from the sides
 * @param width The width of the fretboard
 * @param height The height of the fretboard
 * @param leftHanded Whether it is a left handed instrument
 *
 * @returns Coordiantes and dimension of the frame
 */
export const getFramePositions = (
  padding: number | number[],
  width: number,
  height: number,
  leftHanded: boolean,
): FretboardFramePositions => {
  const paddings = <FretboardShorthandObject>(
    getShorthandValue(padding, ['top', 'right', 'bottom', 'left'])
  )

  const frameWidth = width - paddings.left - paddings.right
  const frameHeight = height - paddings.top - paddings.bottom

  const positions: FretboardFramePositions = {
    x: paddings.left,
    y: paddings.top,
    width: frameWidth,
    height: frameHeight,
  }

  if (leftHanded) {
    positions.x = paddings.right
  }

  return positions
}

/**
 * Gives back the coordinates for the nut and last fret
 *
 * @param padding The padding from the sides
 * @param width The width of the fretboard
 * @param height The height of the fretboard
 * @param leftHanded Whether it is a left handed instrument
 *
 * @returns the coordinates for the nut and last fret
 */
export const getSidePositions = (
  padding: number | number[],
  width: number,
  height: number,
  leftHanded: boolean,
): FretboardSidePositions => {
  const paddings = <FretboardShorthandObject>(
    getShorthandValue(padding, ['top', 'right', 'bottom', 'left'])
  )

  const positions = {
    nut: {
      x1: paddings.left,
      y1: paddings.top,
      x2: paddings.left,
      y2: height - paddings.bottom,
    },
    lastFret: {
      x1: width - paddings.right,
      y1: paddings.top,
      x2: width - paddings.right,
      y2: height - paddings.bottom,
    },
  }

  if (leftHanded) {
    return {
      nut: {
        ...positions.nut,
        x1: width - paddings.left,
        x2: width - paddings.left,
      },
      lastFret: {
        ...positions.lastFret,
        x1: paddings.right,
        x2: paddings.right,
      },
    }
  }

  return positions
}

/**
 * Returns all the X coordinates for the frets
 *
 * @param  width The width of the canvas
 * @param  padding Padding around the fretboard
 * @param  fretDistances An array of canstants for fret scaling
 * @param numberOfFrets The number of frets to be displayed
 *
 * @returns  An array containing the X coordinates
 */
export const getFretXPositions = (
  width: number,
  padding: number | number[],
  fretDistances: number[],
  numberOfFrets: number,
  leftHanded: boolean,
): number[] => {
  const paddings = <FretboardShorthandObject>(
    getShorthandValue(padding, ['right', 'left'])
  )
  const frameWidth = width - paddings.left - paddings.right
  const positions = []

  for (let i = 1; i <= numberOfFrets; i++) {
    // X position is calculated from the fret scale constants + the padding to
    // compensate the offset around the fretboard
    let xPos =
      (fretDistances[i - 1] / fretDistances[numberOfFrets - 1]) * frameWidth +
      paddings.left

    if (leftHanded) {
      xPos = width - xPos
    }

    positions.push(xPos)
  }

  return positions
}

/**
 * Returns all the X coordinates for the middle of each fret
 *
 * @param  width The width of the canvas
 * @param  padding Padding around the fretboard
 * @param  fretDistances An array of canstants for fret scaling
 * @param  numberOfFrets The number of frets to be displayed
 * @param  leftHanded Whether it is a left handed instrument
 *
 * @returns An array containing the X coordinates
 */
export const getBetweenFretsXPositions = (
  width: number,
  padding: number | number[],
  fretDistances: number[],
  numberOfFrets: number,
  leftHanded: boolean,
): number[] => {
  const positions = []
  const paddings = <FretboardShorthandObject>(
    getShorthandValue(padding, ['right', 'left'])
  )
  const fretPositions = getFretXPositions(
    width,
    padding,
    fretDistances,
    numberOfFrets,
    leftHanded,
  )

  for (let i = 1; i <= numberOfFrets; i++) {
    let xLeft = fretPositions[i - 2]
    const xRight = fretPositions[i - 1]

    if (i === 1) {
      xLeft = !leftHanded ? paddings.left : width - paddings.left
    }

    // The x position for the should be between the two frets
    positions.push(xLeft + (xRight - xLeft) / 2)
  }

  return positions
}

/**
 * Returns all the coordinates for the strings
 *
 * @param width The width of the canvas
 * @param height The height of the canvas
 * @param padding Padding around the fretboard
 * @param tuning An array of strings containing the notes for each string
 * @param innerPadding The distance to use from the top and bottom
 * @param leftHanded Whether it is a left handed instrument
 *
 * @returns An array containing the coordinates
 */
export const getStringPositions = (
  width: number,
  height: number,
  padding: number | number[],
  tuning: NoteWithOctave[],
  innerPadding: number | number[],
  leftHanded: boolean,
): FretboardStringPositions[] => {
  const positions = []
  const paddings = <FretboardShorthandObject>(
    getShorthandValue(padding, ['top', 'right', 'bottom', 'left'])
  )
  const innerPaddings = <FretboardShorthandObject>(
    getShorthandValue(innerPadding, ['top', 'bottom'])
  )

  const stringDistance =
    (height -
      paddings.top -
      paddings.bottom -
      innerPaddings.top -
      innerPaddings.bottom) /
    (tuning.length - 1)

  for (let i = 0; i < tuning.length; i++) {
    const pos = {
      x1: paddings.left,
      x2: width - paddings.right,
      y: paddings.top + innerPaddings.top + stringDistance * i,
    }

    if (leftHanded) {
      pos.x1 = width - paddings.left
      pos.x2 = paddings.right
    }

    positions.push(pos)
  }

  return positions
}

/**
 * Gets all the locations on the fretboard for a specific note
 *
 * @param note The note we are looking for
 * @param width The width of the canvas
 * @param height The height of the canvas
 * @param padding Padding around the fretboard
 * @param fretDistances An array of canstants for fret scaling
 * @param numberOfFrets The number of frets to be displayed
 * @param tuning An array of strings containing the notes for each string
 * @param innerPadding The distance to use from the top and bottom
 * @param config Config array
 * @param leftHanded Whether it is a left handed instrument
 * @param strings String of 'all' or an array of notes we want to get the position of
 *
 * @returns A key value object containing the location data
 */
export const getNoteLocations = (
  note: 'all' | Note | NoteWithOctave,
  width: number,
  height: number,
  padding: number | number[],
  fretDistances: number[],
  numberOfFrets: number,
  tuning: NoteWithOctave[],
  innerPadding: number | number[],
  config: FretboardConfig,
  leftHanded: boolean,
  strings: 'all' | NoteWithOctave[] = 'all',
): FretboardNoteLocations => {
  const locations: FretboardNoteLocations = {}
  const selectedNote =
    note !== 'all'
      ? tonal.note(note)
      : {
          oct: -1,
          name: '',
        }

  // If all strings have been selected, we simply use the tuning array
  if (strings === 'all') strings = tuning

  // Check each string for the selected note
  for (const key in tuning) {
    // We only need the selected strings
    if (strings.includes(tuning[key])) {
      // Make an array for the string, because a note can be on multiple
      // frets an each string
      locations[tuning[key]] = []

      // Go over each fret and check if it is the note we need
      for (let i = 0; i <= numberOfFrets; i++) {
        let fretNote = tonal.note(
          // We are transposing the open note for the string
          tonal.transpose(tuning[key], tonalInterval.fromSemitones(i)),
        )

        // If there is an octave given, we need to compare with that
        let compareNote = fretNote.name
        if (!selectedNote.oct) {
          compareNote = fretNote.pc
        }

        if (
          note === 'all' ||
          compareNote === selectedNote.name ||
          tonalNote.enharmonic(compareNote) === selectedNote.name
        ) {
          if (tonalNote.enharmonic(compareNote) === selectedNote.name) {
            fretNote = tonal.note(tonalNote.enharmonic(fretNote.name))
          }

          // An object that holds the fret positions
          const fretPositionsObject = getFretPositions(
            i,
            tuning[key],
            width,
            height,
            padding,
            fretDistances,
            numberOfFrets,
            tuning,
            innerPadding,
            config,
            leftHanded,
          )

          locations[tuning[key]]!.push({
            index: i,
            note: fretNote,
            ...fretPositionsObject,
          })
        }
      }
    }
  }

  return locations
}

/**
 * Returns all the positions for a fret on a string
 *
 * @param fret The fret we need the position of
 * @param string The string we need the position for
 * @param width The width of the canvas
 * @param height The height of the canvas
 * @param padding Padding around the fretboard
 * @param fretDistances An array of canstants for fret scaling
 * @param numberOfFrets The number of frets to be displayed
 * @param tuning An array of strings containing the notes for each string
 * @param innerPadding The distance to use from the top and bottom
 * @param config Config array
 * @param leftHanded Whether it is a left handed instrument
 *
 * @returns The positions for the fret
 */
export const getFretPositions = (
  fret: number,
  string: NoteWithOctave,
  width: number,
  height: number,
  padding: number | number[],
  fretDistances: number[],
  numberOfFrets: number,
  tuning: NoteWithOctave[],
  innerPadding: number | number[],
  config: FretboardConfig,
  leftHanded: boolean,
): FretboardFretPositions => {
  const fretPositions = getFretXPositions(
    width,
    padding,
    fretDistances,
    numberOfFrets,
    leftHanded,
  )
  const stringPositions = getStringPositions(
    width,
    height,
    padding,
    tuning,
    innerPadding,
    leftHanded,
  )
  const betweenPositions = getBetweenFretsXPositions(
    width,
    padding,
    fretDistances,
    numberOfFrets,
    leftHanded,
  )
  const paddings = <FretboardShorthandObject>(
    getShorthandValue(padding, ['top', 'right', 'bottom', 'left'])
  )
  const innerPaddings = <FretboardShorthandObject>(
    getShorthandValue(innerPadding, ['top', 'bottom'])
  )

  const stringKey = tuning.indexOf(string)
  const yPosition = stringPositions[tuning.length - stringKey - 1].y

  let beforeX = fretPositions[fret - 2]
  // The before X coordinate is the left side for the first fret
  if (fret === 1) {
    beforeX = !leftHanded
      ? paddings.left + config.nutWidth / 2
      : width - paddings.left - config.nutWidth / 2
  }

  const fretPositionsObject = {
    before: {
      x: beforeX,
      y: yPosition,
    },
    after: {
      x: fretPositions[fret - 1],
      y: yPosition,
    },
    between: {
      x: betweenPositions[fret - 1],
      y: yPosition,
    },
  }

  // If open string, every position is the same
  if (fret === 0) {
    fretPositionsObject.before = {
      x: !leftHanded ? 0 : width - paddings.left - config.nutWidth / 2,
      y: yPosition,
    }
    fretPositionsObject.after = {
      x: !leftHanded ? paddings.left + config.nutWidth / 2 : width,
      y: yPosition,
    }
    fretPositionsObject.between = {
      x: !leftHanded ? paddings.left : width - paddings.left,
      y: yPosition,
    }
  }

  // Button x1, y1, x2, y2

  // If it is in between the lowest and highest
  const stringDistance =
    (height -
      paddings.top -
      paddings.bottom -
      innerPaddings.top -
      innerPaddings.bottom) /
    (tuning.length - 1)

  // X coordinates are the same for all strings
  const buttonPositionsObject = {
    x1: fretPositionsObject.before.x,
    y1: fretPositionsObject.before.y - stringDistance / 2,
    x2: fretPositionsObject.after.x,
    y2: fretPositionsObject.after.y + stringDistance / 2,
  }

  if (leftHanded && fret > 0) {
    const x1Temp = buttonPositionsObject.x1
    buttonPositionsObject.x1 = buttonPositionsObject.x2
    buttonPositionsObject.x2 = x1Temp
  }

  // If it is the highest string
  if (stringKey === tuning.length - 1) {
    buttonPositionsObject.y1 = paddings.top
  }

  // If it is the lowest string
  if (stringKey === 0) {
    buttonPositionsObject.y2 = height - paddings.bottom
  }

  return {frets: fretPositionsObject, button: buttonPositionsObject}
}

/**
 * Converts a shorthand value and returns a single side (CSS-style)
 *
 * @param value A number or an array of values for the sides
 * @param side The side that the function should return with
 *
 * @returns The value for the chosen side
 */
export function getShorthandValue(
  value: number | number[],
  side: FretboardShorthandSide,
): number
export function getShorthandValue(
  value: number | number[],
  side: FretboardShorthandSide[],
): FretboardShorthandObject
export function getShorthandValue(
  value: number | number[],
  side: FretboardShorthandSide | FretboardShorthandSide[],
): FretboardShorthandObject | number {
  if (!Array.isArray(value)) value = [value]

  const sideIndicies = {
    top: 0,
    right: 1,
    bottom: 2,
    left: 3,
  }

  if (value.length === 1) {
    value = [value[0], value[0], value[0], value[0]]
  }
  if (value.length === 2) value = [...value, ...value]
  if (value.length === 3) value = [...value, value[1]]

  if (!Array.isArray(side)) {
    return value[sideIndicies[side as FretboardShorthandSide]]
  } else {
    const sideValues: FretboardShorthandObject = {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    }
    for (const key in side as FretboardShorthandSide[]) {
      if (typeof value[sideIndicies[side[key]]] !== undefined) {
        sideValues[side[key]] = value[sideIndicies[side[key]]]
      }
    }

    return sideValues
  }
}

/**
 * Color schemes for the different types of fretboards
 */
export const colorScheme: FretboardColorSchemes = {
  maple: {
    frame: '#F5DFB6',
    nut: '#E7D293',
    dots: 'rgb(70,70,70)',
    string: 'rgba(0,0,0)',
    stringShadow: 'rgba(100, 100, 100, 0.1)',
    labels: 'rgb(100,100,100)',
    frets: 'rgb(100,100,100)',
  },
  rosewood: {
    frame: '#543429',
    nut: '#E7D293',
    dots: '#d8d8d8',
    string: 'rgb(200,200,200)',
    stringShadow: 'rgba(50, 50, 50, 0.1)',
    labels: 'rgb(100,100,100)',
    frets: 'rgb(150,150,150)',
  },
  plain: {
    light: {
      frame: 'rgb(256,256,256)',
      nut: 'rgb(0,0,0)',
      dots: 'rgb(150,150,150)',
      string: 'rgb(0,0,0)',
      stringShadow: 'rgba(100, 100, 100, 0)',
      labels: 'rgb(100,100,100)',
      frets: 'rgb(100,100,100)',
    },
    dark: {
      frame: '#212121',
      nut: 'rgb(0,0,0)',
      dots: 'rgb(170,170,170)',
      string: 'rgb(150,150,150)',
      stringShadow: 'rgba(100, 100, 100, 0)',
      labels: 'rgb(180,180,180)',
      frets: 'rgb(120,120,120)',
    },
  },
}

/**
 * Fret scale constants
 */
export const fretDistances: number[] = [
  0.056126, 0.109101, 0.159104, 0.206291, 0.250847, 0.292893, 0.33258, 0.370039,
  0.405396, 0.438769, 0.470268, 0.5, 0.528063, 0.554551, 0.579552, 0.60315,
  0.625423, 0.646447, 0.66629, 0.68502, 0.702698, 0.719385, 0.735134, 0.75,
]
