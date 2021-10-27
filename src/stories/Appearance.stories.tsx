import React from 'react'
import {ComponentStory, ComponentMeta} from '@storybook/react'

import {Fretboard} from '../components/Fretboard'

export default {
  title: 'Appearance',
  component: Fretboard,
} as ComponentMeta<typeof Fretboard>

const Template: ComponentStory<typeof Fretboard> = args => (
  <Fretboard {...args} />
)

export const Default = Template.bind({})
Default.args = {}

export const NeckTypeMaple = Template.bind({})
NeckTypeMaple.args = {
  neckType: 'maple',
}

export const NeckTypeRosewood = Template.bind({})
NeckTypeRosewood.args = {
  neckType: 'rosewood',
}

export const DarkMode = Template.bind({})
DarkMode.parameters = {
  backgrounds: {default: 'dark'},
}
DarkMode.args = {
  background: '#333333',
  darkMode: true,
}

export const CustomDimensions = Template.bind({})
CustomDimensions.args = {
  width: 1024,
  height: 200,
  appearance: {
    desktop: {
      fontFamily:
        '"Proxima Nova", "Helvetica Neue", Helvetica, Arial, sans-serif',
      labelFontSize: '12px',
      nutWidth: 9,
      fretWidth: 4,
      dotRadius: 7,
      selectedNoteRadius: 12,
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

export const Mobile = Template.bind({})
Mobile.parameters = {
  viewport: {
    defaultViewport: 'mobile2',
  },
}
Mobile.args = {
  minWidth: 600,
}

export const BackgroundAndPadding = Template.bind({})
BackgroundAndPadding.args = {
  background: 'lavender',
  padding: {
    desktop: [70, 50, 80],
    mobile: [30, 20, 50, 40],
  },
  innerPadding: [20, 0, 30],
}
