import React from 'react'
import {ComponentStory, ComponentMeta} from '@storybook/react'

import {Fretboard} from '../components/Fretboard'

export default {
  title: 'Fretboard',
  component: Fretboard,
} as ComponentMeta<typeof Fretboard>

const Template: ComponentStory<typeof Fretboard> = args => (
  <Fretboard {...args} />
)

export const Default = Template.bind({})
Default.args = {
  selectedNotes: [
    {
      note: 'A',
    },
    {
      note: 'C5',
    },
  ],
}

export const NeckTypeMaple = Template.bind({})
NeckTypeMaple.args = {
  neckType: 'maple',
}

export const NeckTypeRosewood = Template.bind({})
NeckTypeRosewood.args = {
  neckType: 'rosewood',
}

export const DarkMode = Template.bind({})
DarkMode.args = {
  darkMode: true,
}

export const CustomAppearance = Template.bind({})
CustomAppearance.args = {
  appearance: {
    desktop: {
      fontFamily:
        '"Proxima Nova", "Helvetica Neue", Helvetica, Arial, sans-serif',
      labelFontSize: '16px',
      nutWidth: 20,
      fretWidth: 8,
      dotRadius: 20,
      selectedNoteRadius: 20,
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
  },
}
