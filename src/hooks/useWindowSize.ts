import {useEffect, useState} from 'react'

type WindowSize = [number, number]

export const useWindowSize = (): WindowSize => {
  const [size, setSize] = useState<WindowSize>([0, 0])
  useEffect(() => {
    const updateSize = () => {
      setSize([window.innerWidth, window.innerHeight])
    }

    window.addEventListener('resize', updateSize)
    updateSize()

    return () => window.removeEventListener('resize', updateSize)
  }, [])

  return size
}
