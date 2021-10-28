import React, {useState} from 'react'
import {ComponentStory, ComponentMeta} from '@storybook/react'

import {
  Fretboard,
  OnFretboardClick as OnFretboardClickType,
} from '../components/Fretboard'

export default {
  title: 'Events',
  component: Fretboard,
  argTypes: {onFretboardClick: {action: 'clicked'}},
} as ComponentMeta<typeof Fretboard>

const Template: ComponentStory<typeof Fretboard> = args => {
  const [eventData, setEventData] = useState<
    Parameters<OnFretboardClickType>[0] | null
  >(null)

  return (
    <div>
      <Fretboard {...args} onFretboardClick={data => setEventData(data)} />

      <input type="text" name="noteName" value={eventData?.note?.name} />
      <input type="text" name="eventType" value={eventData?.event?.type} />
      <input type="text" name="stringName" value={eventData?.string} />
    </div>
  )
}

export const OnFretboardClick = Template.bind({})
OnFretboardClick.args = {}
