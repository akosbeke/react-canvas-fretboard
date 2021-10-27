import React from 'react'
import {ComponentStory, ComponentMeta} from '@storybook/react'

import {Fretboard} from '../components/Fretboard'
import {getStandardTuning} from '../helpers/tunings'

export default {
  title: 'Customization',
  component: Fretboard,
} as ComponentMeta<typeof Fretboard>

const Template: ComponentStory<typeof Fretboard> = args => (
  <Fretboard {...args} />
)

export const TuningOrInstruments = Template.bind({})
TuningOrInstruments.args = {
  tuning: getStandardTuning('bass'),
}

export const NumberOfFrets = Template.bind({})
NumberOfFrets.args = {
  numberOfFrets: 5,
}

export const LeftHanded = Template.bind({})
LeftHanded.args = {
  leftHanded: true,
}

export const HideStringLabels = Template.bind({})
HideStringLabels.args = {
  showStringLabels: false,
}

export const HideFretLabels = Template.bind({})
HideFretLabels.args = {
  showFretLabels: false,
}
