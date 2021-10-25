import React from 'react'

export interface FretboardProps {
  test?: string
}

export const Fretboard: React.FC<FretboardProps> = ({test = 'Fretboard'}) => {
  return <div>{test}</div>
}
