import React, {useEffect, useRef} from 'react'
import * as tonal from '@tonaljs/tonal'

import {useWindowSize} from '../hooks/useWindowSize'

import {
  colorScheme,
  fretDistances,
  getBetweenFretsXPositions,
  getFramePositions,
  getFretXPositions,
  getNoteLocations,
  getShorthandValue,
  getSidePositions,
  getStringPositions,
} from '../helpers/fretboard'
import {replaceNoteChars} from '../helpers/notes'

import {GuitarNeckType} from '../types/guitar'
import {Note, NoteName, NoteWithOctave} from '../types/note'
import {
  FretboardColorScheme,
  FretboardNoteLocation,
  FretboardShorthandObject,
} from '../types/fretboard'

interface AppearanceObject {
  fontFamily: string
  labelFontSize: string
  nutWidth: number
  fretWidth: number
  dotRadius: number
  selectedNoteRadius: number
}

interface Appearance {
  desktop?: AppearanceObject
  mobile?: AppearanceObject
}

interface Padding {
  desktop: number[]
  mobile: number[]
}

export interface SelectedNote {
  note: 'all' | Note | NoteWithOctave
  strings?: NoteWithOctave[]
  color?: string
}

export type OnFretboardClick = (data: {
  event: MouseEvent
  note?: tonal.Core.Note | tonal.NoNote
  string?: NoteWithOctave
}) => void

export interface FretboardProps {
  width?: number
  height?: number
  minWidth?: number
  darkMode?: boolean
  background?: string
  padding?: Padding
  innerPadding?: number[]
  numberOfFrets?: number
  tuning?: NoteWithOctave[]
  neckType?: GuitarNeckType
  leftHanded?: boolean
  showStringLabels?: boolean
  showFretLabels?: boolean
  highlightString?: NoteWithOctave[]
  hightlightColor?: string
  appearance?: Appearance
  selectedNotes?: SelectedNote[]
  selectedNotesColor?: string
  selectedNotesOct?: boolean
  displayNoteName?: boolean
  noteNameType?: NoteName
  onFretboardClick?: OnFretboardClick | null
}

/**
 * Functional component to display a fretboard.
 */
export const Fretboard: React.FC<FretboardProps> = ({
  width,
  height = 300,
  minWidth = 950,
  darkMode = false,
  background = '#ffffff',
  padding: propPadding = {desktop: [], mobile: []},
  innerPadding = [15, 0, 20],
  neckType = 'plain',
  appearance = {desktop: {}, mobile: {}},
  numberOfFrets = 12,
  tuning = ['E2', 'A2', 'D3', 'G3', 'B3', 'E4'],
  leftHanded = false,
  showStringLabels = true,
  showFretLabels = true,
  highlightString = [],
  hightlightColor = '#00b4d2',
  selectedNotes = [],
  selectedNotesColor = '#00b4d2',
  selectedNotesOct = true,
  displayNoteName = true,
  onFretboardClick = null,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const defaultAppearance = {
    desktop: {
      fontFamily:
        '"Proxima Nova", "Helvetica Neue", Helvetica, Arial, sans-serif',
      labelFontSize: '16px',
      nutWidth: 16,
      fretWidth: 6,
      dotRadius: 10,
      selectedNoteRadius: 18,
    },
    mobile: {
      fontFamily:
        '"Proxima Nova", "Helvetica Neue", Helvetica, Arial, sans-serif',
      labelFontSize: '16px',
      nutWidth: 8,
      fretWidth: 4,
      dotRadius: 8,
      selectedNoteRadius: 18,
    },
  }
  const defaultPadding: Padding = {
    desktop: [30, 50, 50, 70],
    mobile: [30, 20, 50, 40],
  }

  // Custom hook for getting the current window width
  const [windowWidth] = useWindowSize()
  const device = windowWidth >= minWidth ? 'desktop' : 'mobile'

  // If no width was given via props, go full width
  const finalWidth: number =
    width || (windowWidth > minWidth ? windowWidth : minWidth)

  const config = {...defaultAppearance[device], ...appearance[device]}
  const padding =
    propPadding[device].length > 0
      ? propPadding[device]
      : defaultPadding[device]

  // Modify colorScheme based on theme mode
  let currentColorScheme: FretboardColorScheme

  if (neckType === 'plain') {
    currentColorScheme =
      darkMode === true ? colorScheme.plain.dark : colorScheme.plain.light
  } else {
    currentColorScheme = colorScheme[neckType]
  }

  /**
   * Return the context with the proper scale for retina displays
   */
  const setupCanvas = (
    canvas: HTMLCanvasElement,
    width: number,
    height: number,
  ): CanvasRenderingContext2D | null => {
    // Get the device pixel ratio, falling back to 1.
    const dpr = window.devicePixelRatio || 1
    // Calculate the correct width and height
    canvas.width = width * dpr
    canvas.height = height * dpr
    const ctx = canvas.getContext('2d')
    // Scale all drawing operations by the dpr
    if (ctx) ctx.scale(dpr, dpr)

    return ctx
  }

  useEffect(() => {
    const currentCanvas = canvasRef.current

    if (currentCanvas) {
      // Draw strings and frets after component loaded or updated
      const ctx = setupCanvas(currentCanvas, finalWidth, height)
      currentCanvas.addEventListener('click', handleFretboardClick)

      if (ctx) {
        // Clear the canvas on every rerender
        ctx.clearRect(0, 0, finalWidth, height)

        // Render background
        ctx.fillStyle = background
        ctx.fillRect(0, 0, finalWidth, height)

        renderFrame(ctx)
        renderFrets(ctx)
        renderDots(ctx)
        renderStrings(ctx)
        renderSides(ctx)
        renderSelectedNotes(ctx)

        if (showStringLabels) {
          renderStringLabels(ctx)
        }

        if (showFretLabels) {
          renderFretLabels(ctx)
        }
      }
    }

    return function cleanup() {
      if (currentCanvas)
        currentCanvas.removeEventListener('click', handleFretboardClick)
    }
  })

  const getNoteName = (note: Note): string => {
    // TODO: check if there is a note name map
    return note
  }

  /**
   * Handles the onClick event for the canvas
   */
  const handleFretboardClick = (event: MouseEvent): void => {
    if (onFretboardClick) {
      const ratio = finalWidth / windowWidth
      const noteLocations: FretboardNoteLocation[] = []
      const noteLocationsPerString = getNoteLocations(
        'all',
        finalWidth,
        height,
        padding,
        fretDistances,
        numberOfFrets,
        tuning,
        innerPadding,
        config,
        leftHanded,
        'all',
      )

      for (const stringName in noteLocationsPerString) {
        const noteLocationsString =
          noteLocationsPerString[stringName as NoteWithOctave] || []

        noteLocationsString.forEach((fret: FretboardNoteLocation) => {
          noteLocations.push({
            ...fret,
            string: stringName,
          })
        })
      }

      const clickedNote = noteLocations.find(
        ({button}) =>
          event.offsetX * ratio >= button.x1 &&
          event.offsetX * ratio <= button.x2 &&
          event.offsetY * ratio >= button.y1 &&
          event.offsetY * ratio <= button.y2,
      )

      // Calling the callback from onFretboardClick prop
      onFretboardClick(
        clickedNote
          ? {
              event,
              note: clickedNote.note,
              string: clickedNote.string as NoteWithOctave,
            }
          : {event},
      )
    }
  }

  /**
   * Renders out the frame of the fretboard
   */
  const renderFrame = (ctx: CanvasRenderingContext2D): void => {
    const framePositions = getFramePositions(
      padding,
      finalWidth,
      height,
      leftHanded,
    )

    // Fretboard backround
    ctx.fillStyle = currentColorScheme.frame
    ctx.fillRect(
      framePositions.x,
      framePositions.y,
      framePositions.width,
      framePositions.height,
    )
  }

  /**
   * Renders out the nut and the last fret so they go above the strings
   */
  const renderSides = (ctx: CanvasRenderingContext2D): void => {
    const sidePositions = getSidePositions(
      padding,
      finalWidth,
      height,
      leftHanded,
    )

    // Nut
    ctx.lineWidth = config.nutWidth
    ctx.strokeStyle = currentColorScheme.nut
    ctx.beginPath()
    ctx.moveTo(sidePositions.nut.x1, sidePositions.nut.y1)
    ctx.lineTo(sidePositions.nut.x2, sidePositions.nut.y2)
    ctx.stroke()
    ctx.closePath()

    // Last fret
    ctx.lineWidth = config.fretWidth
    ctx.strokeStyle = currentColorScheme.frets

    ctx.beginPath()
    ctx.moveTo(sidePositions.lastFret.x1, sidePositions.lastFret.y1)
    ctx.lineTo(sidePositions.lastFret.x2, sidePositions.lastFret.y2)
    ctx.stroke()
    ctx.closePath()
  }

  /**
   * Renders the frets on the fretboard
   */
  const renderFrets = (ctx: CanvasRenderingContext2D): void => {
    const paddings = getShorthandValue(padding, ['top', 'bottom'])
    const fretPositions = getFretXPositions(
      finalWidth,
      padding,
      fretDistances,
      numberOfFrets,
      leftHanded,
    )

    for (const key in fretPositions) {
      ctx.lineWidth = config.fretWidth
      ctx.strokeStyle = currentColorScheme.frets

      ctx.beginPath()
      ctx.moveTo(fretPositions[key], paddings.top)
      ctx.lineTo(fretPositions[key], height - paddings.bottom)
      ctx.stroke()
      ctx.closePath()
    }
  }

  /**
   * Renders the dots on fret 3, 5, 7, 9, 12, 15, 17, 19, 21, 24
   */
  const renderDots = (ctx: CanvasRenderingContext2D): void => {
    const dotPositions = [3, 5, 7, 9, 12, 15, 17, 19, 21, 24]
    const paddings = getShorthandValue(padding, [
      'top',
      'bottom',
    ]) as FretboardShorthandObject
    const innerPaddings = getShorthandValue(innerPadding, [
      'top',
      'bottom',
    ]) as FretboardShorthandObject
    const betweenPositions = getBetweenFretsXPositions(
      finalWidth,
      padding,
      fretDistances,
      numberOfFrets,
      leftHanded,
    )

    const yOffset = (innerPaddings.top - innerPaddings.bottom) / 2
    const frameHeight = height - paddings.top - paddings.bottom

    for (const key in dotPositions) {
      if (dotPositions[key] <= numberOfFrets) {
        ctx.fillStyle = currentColorScheme.dots

        // If it is fret number 12 or 24, we need to show two dots
        if (dotPositions[key] % 12 === 0) {
          // Upper dot
          ctx.beginPath()
          ctx.arc(
            betweenPositions[dotPositions[key] - 1],
            paddings.top + frameHeight * 0.25 + yOffset,
            config.dotRadius,
            0,
            2 * Math.PI,
          )
          ctx.fill()

          // Lower dot
          ctx.beginPath()
          ctx.arc(
            betweenPositions[dotPositions[key] - 1],
            paddings.top + frameHeight * 0.75 + yOffset,
            config.dotRadius,
            0,
            2 * Math.PI,
          )
          ctx.fill()
        } else {
          ctx.beginPath()
          ctx.arc(
            betweenPositions[dotPositions[key] - 1],
            (height - paddings.bottom + paddings.top) / 2 + yOffset,
            config.dotRadius,
            0,
            2 * Math.PI,
          )
          ctx.fill()
        }
      }
    }
  }

  /**
   * Renders the strings
   */
  const renderStrings = (ctx: CanvasRenderingContext2D) => {
    const stringPositions = getStringPositions(
      finalWidth,
      height,
      padding,
      tuning,
      innerPadding,
      leftHanded,
    )

    let i = 0
    for (const key in stringPositions) {
      // Default string color from scheme
      let color = currentColorScheme.string

      // If at least one string is given for highlighting
      if (highlightString.length > 0) {
        // If it's a string, let's make an array out of it
        if (!Array.isArray(highlightString)) highlightString = [highlightString]

        // If the current string is in the highlighted strings array
        if (highlightString.includes(tuning[tuning.length - i - 1])) {
          color = hightlightColor
        } else {
          color = 'rgba(0, 0, 0, 0.2)'
        }
      }

      drawString(
        ctx,
        stringPositions[key].x1,
        stringPositions[key].x2,
        stringPositions[key].y,
        2,
        color,
      )

      i++
    }
  }

  /**
   * Renders one string
   * @param ctx - canvas context
   * @param x1 - the x coordinate to draw the line from
   * @param x2 - the x coordinate to draw the line to
   * @param y - the y coordinate to draw the line from
   * @param thickness - the thickness of the string
   * @param color - the color of the string
   */
  const drawString = (
    ctx: CanvasRenderingContext2D,
    x1: number,
    x2: number,
    y: number,
    thickness: number,
    color: string,
  ) => {
    ctx.lineWidth = thickness

    // The string itself
    ctx.strokeStyle = color

    ctx.beginPath()
    ctx.moveTo(x1, y)
    ctx.lineTo(x2, y)
    ctx.stroke()
    ctx.closePath()

    // The string shadow
    ctx.strokeStyle = currentColorScheme.stringShadow

    ctx.beginPath()
    ctx.moveTo(x1, y + 10)
    ctx.lineTo(x2, y + 10)
    ctx.stroke()
    ctx.closePath()
  }

  /**
   * Renders the labels for the frets (1, 2, 3, ...)
   */
  const renderFretLabels = (ctx: CanvasRenderingContext2D): void => {
    const betweenPositions = getBetweenFretsXPositions(
      finalWidth,
      padding,
      fretDistances,
      numberOfFrets,
      leftHanded,
    )

    for (let i = 1; i <= numberOfFrets; i++) {
      const bottomPadding = getShorthandValue(padding, 'bottom') as number

      ctx.font = config.labelFontSize + config.fontFamily
      ctx.textAlign = 'center'
      ctx.textBaseline = 'hanging'
      ctx.fillStyle = currentColorScheme.labels
      ctx.fillText(`${i}`, betweenPositions[i - 1], height - bottomPadding + 10)
    }
  }

  /**
   * Renders the labels for the strings
   */
  const renderStringLabels = (ctx: CanvasRenderingContext2D): void => {
    const stringPositions = getStringPositions(
      finalWidth,
      height,
      padding,
      tuning,
      innerPadding,
      leftHanded,
    )

    let i = 0
    for (const key in stringPositions) {
      // Get data for the note
      const stringNote = tonal.note(tuning[tuning.length - i - 1])

      let noteName = getNoteName(stringNote.pc as Note)

      // If it is a flat or sharp note, append the UTF-8 character to its name
      noteName = replaceNoteChars(noteName as Note)

      ctx.font = config.labelFontSize + config.fontFamily
      ctx.textAlign = !leftHanded ? 'right' : 'left'
      ctx.textBaseline = 'middle'
      ctx.fillStyle = currentColorScheme.labels
      ctx.fillText(
        noteName,
        stringPositions[key].x1 + 15 * (leftHanded ? 1 : -1),
        stringPositions[key].y,
      )

      i++
    }
  }

  /**
   * Renders out the selected notes
   */
  const renderSelectedNotes = (ctx: CanvasRenderingContext2D): void => {
    for (const selectedKey in selectedNotes) {
      const noteLocations = getNoteLocations(
        selectedNotes[selectedKey].note,
        finalWidth,
        height,
        padding,
        fretDistances,
        numberOfFrets,
        tuning,
        innerPadding,
        config,
        leftHanded,
        selectedNotes[selectedKey].strings
          ? selectedNotes[selectedKey].strings
          : 'all',
      )

      // Iterate over each string
      for (const stringKey in noteLocations) {
        // Iterate over each fret for the string
        for (const fretKey in noteLocations[stringKey as NoteWithOctave]) {
          if (!noteLocations[stringKey as NoteWithOctave]) return
          // Get the fret positions and the note data
          const {frets, note} =
            noteLocations[stringKey as NoteWithOctave]![Number(fretKey)]

          // Draw circle, with custom color or the default one
          ctx.fillStyle = selectedNotes[selectedKey].color || selectedNotesColor
          ctx.beginPath()
          ctx.arc(
            frets.between.x,
            frets.between.y,
            config.selectedNoteRadius,
            0,
            2 * Math.PI,
          )
          ctx.fill()

          // Draw text
          if (displayNoteName) {
            // If it is a flat or sharp note, append the UTF-8 character to its name
            let noteName = getNoteName(note.pc as Note)
            noteName = replaceNoteChars(noteName as Note)

            // Append octave if we need to show it
            if (selectedNotesOct) noteName += note.oct

            ctx.font = '16px' + config.fontFamily
            ctx.textAlign = 'center'
            ctx.textBaseline = 'middle'
            ctx.fillStyle = 'white'
            ctx.fillText(noteName, frets.between.x, frets.between.y)
          }
        }
      }
    }
  }

  return (
    <>
      <canvas
        aria-label="Fretboard"
        ref={canvasRef}
        width={finalWidth}
        height={height}
        style={{width: !width ? '100%' : 'auto'}}
      />
    </>
  )
}
