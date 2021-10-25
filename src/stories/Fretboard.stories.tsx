import React from 'react'
import {ComponentStory, ComponentMeta} from '@storybook/react'

import {Fretboard} from '../components/Fretboard'

export default {
  title: 'Fretboard',
  component: Fretboard,
} as ComponentMeta<typeof Fretboard>

const Template: ComponentStory<typeof Fretboard> = () => <Fretboard />

export const Default = Template.bind({})
