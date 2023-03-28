import { yupResolver } from '@hookform/resolvers/yup'
import { AxiosError } from 'axios'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { schemaAddComment } from '../../schemas/schemas'
import { api } from '../../services/api'
import { Comment } from '../../types'

export default function FormEditComment({ comment, close }: { comment: Comment; close: () => void }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
    getValues
  } = useForm<Comment>({
    resolver: yupResolver(schemaAddComment)
  })

  const queryClient = useQueryClient()

  const { mutate } = useMutation(() => api.updateComment(comment.id, getValues('description')), {
    onSuccess: () => {
      queryClient.invalidateQueries('comments')
      console.log('Comment updated successfully!')
      close()
    },
    onError: (error: AxiosError<any>) => {
      if (error.response?.data?.error.description) {
        setError(
          'description',
          {
            type: 'manual',
            message: error.response.data?.error.description
          },
          {
            shouldFocus: true
          }
        )
      }
    }
  })

  async function onSubmit(data: Comment) {
    mutate(data)
  }

  useEffect(() => {
    setValue('description', comment.description)
  }, [comment])

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input id="description" type="text" placeholder={errors.description?.message} {...register('description')} />

        <button>Ok</button>
      </form>
      <button onClick={close}>X</button>
    </>
  )
}
