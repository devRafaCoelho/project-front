import { useState } from 'react'
import { CommentCardProps } from '../../types'
import { getItem } from '../../utils/storage'
import ModalDelete from '../ModalDelete'

export default function CommentCard({ commentId, commentUserId, description, setSelectedComment }: CommentCardProps) {
  const [open, setOpen] = useState(false)
  const userId = Number(getItem('userId'))

  return (
    <>
      <div key={commentId}>
        <p>{description}</p>
        {userId === commentUserId && (
          <>
            <button onClick={setSelectedComment}>Editar</button>
            <button onClick={() => setOpen(!open)}>Excluir</button>
          </>
        )}
      </div>

      {open && <ModalDelete open={open} close={() => setOpen(!open)} id={commentId} />}
    </>
  )
}
