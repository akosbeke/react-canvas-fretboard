import React from 'react'
import {ComponentStory, ComponentMeta} from '@storybook/react'

import {Fretboard} from '../components/Fretboard'

export default {
  title: 'String Highlight',
  component: Fretboard,
} as ComponentMeta<typeof Fretboard>

const Template: ComponentStory<typeof Fretboard> = args => (
  <Fretboard {...args} />
)

export const Default = Template.bind({})
Default.args = {
  highlightString: ['A2'],
}

export const CustomColor = Template.bind({})
CustomColor.args = {
  highlightString: ['A2'],
  hightlightColor: 'red',
}

export const MultipleStrings = Template.bind({})
MultipleStrings.args = {
  highlightString: ['A2', 'G3'],
}
