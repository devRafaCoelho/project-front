import { createContext, useState } from 'react'

type AppContextType = {
  userData: string
  setUserData: (data: string) => void
}

export const AppContext = createContext<AppContextType>({
  userData: '',
  setUserData: () => {}
})

export default function AppProvider({ children }: any) {
  const [userData, setUserData] = useState('')

  return <AppContext.Provider value={{ userData, setUserData }}>{children}</AppContext.Provider>
}
