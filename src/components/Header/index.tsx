import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { api } from '../../services/api'
import { logOut } from '../../utils/storage'

export default function Header() {
  const { data } = useQuery('user-data', api.getUser)
  const navigate = useNavigate()

  return (
    <header>
      <h1>Seja bem vinda(o) {data?.name}!</h1>

      <button
        onClick={() => {
          logOut()
          navigate('/login')
        }}
      >
        Log Out
      </button>
    </header>
  )
}
