import { AxiosError } from 'axios'
import { useMutation, useQueryClient } from 'react-query'
import { api } from '../../services/api'
import { UserData } from '../../types'

type ModalDeleteProps = {
  id: number
  open: boolean
  close: () => void
}

export default function ModalDelete({ id, open, close }: ModalDeleteProps) {
  const queryClient = useQueryClient()

  const { mutate, isError } = useMutation(() => api.deleteComment(id), {
    onSuccess: () => {
      queryClient.invalidateQueries('comments')
      console.log('Comment deleted successfully!')
      close()
    }
  })

  return (
    <>
      {open && (
        <>
          <h1>Are you sure?</h1>
          <button onClick={() => mutate()}>Yes</button>
          <button onClick={close}>No</button>
          {isError && <p>You can only delete comments that you have made.</p>}
        </>
      )}
    </>
  )
}
