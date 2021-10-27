import React from 'react'
import {ComponentStory, ComponentMeta} from '@storybook/react'

import {Fretboard} from '../components/Fretboard'

export default {
  title: 'Notes',
  component: Fretboard,
} as ComponentMeta<typeof Fretboard>

const Template: ComponentStory<typeof Fretboard> = args => (
  <Fretboard {...args} />
)

export const SelectNotes = Template.bind({})
SelectNotes.args = {
  selectedNotes: [
    {
      note: 'C',
    },
  ],
}

export const WithoutLabel = Template.bind({})
WithoutLabel.args = {
  selectedNotes: [
    {
      note: 'C',
    },
  ],
  displayNoteName: false,
}

export const OnlyOnStrings = Template.bind({})
OnlyOnStrings.args = {
  selectedNotes: [
    {
      note: 'C',
      strings: ['A2'],
    },
  ],
}

export const MultipleNotes = Template.bind({})
MultipleNotes.args = {
  selectedNotes: [
    {
      note: 'C',
    },
    {
      note: 'D',
    },
  ],
}

export const DefaultColor = Template.bind({})
DefaultColor.args = {
  selectedNotes: [
    {
      note: 'C',
    },
  ],
  selectedNotesColor: 'red',
}

export const PerNoteColor = Template.bind({})
PerNoteColor.args = {
  selectedNotes: [
    {
      note: 'C',
      color: 'pink',
    },
    {
      note: 'D',
    },
  ],
}

export const HideOctaveOnLabel = Template.bind({})
HideOctaveOnLabel.args = {
  selectedNotes: [
    {
      note: 'C',
    },
  ],
  selectedNotesOct: false,
}
