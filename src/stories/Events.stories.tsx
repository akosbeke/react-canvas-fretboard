import React from 'react'
import {ComponentStory, ComponentMeta} from '@storybook/react'

import {Fretboard} from '../components/Fretboard'

export default {
  title: 'Events',
  component: Fretboard,
  argTypes: {onFretboardClick: {action: 'clicked'}},
} as ComponentMeta<typeof Fretboard>

const Template: ComponentStory<typeof Fretboard> = args => (
  <Fretboard {...args} />
)

export const OnFretboardClick = Template.bind({})
OnFretboardClick.args = {}
