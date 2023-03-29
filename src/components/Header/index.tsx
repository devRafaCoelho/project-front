import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { api } from '../../services/api'
import { logOut } from '../../utils/storage'

export default function Header() {
  const { data } = useQuery('user-data', api.getUser)
  const navigate = useNavigate()

  const avatar = data ? data.name.split(' ') : []
  const avatarInitials =
    avatar.length > 1 ? avatar[0].charAt(0) + avatar[1].charAt(0) : avatar[0]?.charAt(0)

  return (
    <header>
      <h1>{avatarInitials}</h1>

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
