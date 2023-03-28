import { QueryClient, QueryClientProvider } from 'react-query'
import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import HomePage from './pages/Home'
import LoginPage from './pages/Login'
import RegisterPage from './pages/Register'
import Comments from './pages/Comments'
import { getItem } from './utils/storage'
import { theme } from './theme/theme'
import { ThemeProvider } from 'styled-components'
import { GlobalStyles } from './styles/GlobalStyles'

type ProtectedRoutesProps = {
  redirectTo: string
}

function ProtectedRoutes({ redirectTo }: ProtectedRoutesProps) {
  const isAuth = getItem('token')

  return isAuth ? <Outlet /> : <Navigate to={redirectTo} />
}

const queryClient = new QueryClient()

export default function MainRoutes() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="*" element={<Navigate to="/register" />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route element={<ProtectedRoutes redirectTo="/login" />}>
            <Route path="/home" element={<HomePage />} />
            <Route path="/comments" element={<Comments />} />
          </Route>
        </Routes>
        <GlobalStyles />
      </ThemeProvider>
    </QueryClientProvider>
  )
}
