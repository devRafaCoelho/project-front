import { useContext } from 'react'
import { AppContext } from '../context/AppProvider'

export default function useAppContext() {
  return useContext(AppContext)
}
