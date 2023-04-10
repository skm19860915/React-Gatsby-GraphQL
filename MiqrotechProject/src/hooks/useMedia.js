import { useContext } from 'react'
import { ScreenContext } from '@components/Layout'

const useMedia = (fw, d, t, m) => {

  const screen = useContext(ScreenContext)

  if (screen.fullWidth) {
    return fw
  } else if (screen.desktop) {
    return d
  } else if (screen.tablet) {
    return t
  } else if (screen.mobile) {
    return m
  }
}

export default useMedia
