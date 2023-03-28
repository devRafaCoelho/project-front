import { useState } from 'react'
import { Link } from 'react-router-dom'
import FormUser from '../../components/FormUser'
import Header from '../../components/Header'

export default function HomePage() {
  const [openFormUser, setOpenFormUser] = useState(false)

  return (
    <>
      <Header />

      <button onClick={() => setOpenFormUser(!openFormUser)}>Open FormUser</button>
      {openFormUser && <FormUser close={() => setOpenFormUser(!openFormUser)} />}
    </>
  )
}
