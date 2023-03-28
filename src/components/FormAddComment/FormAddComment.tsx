import { yupResolver } from '@hookform/resolvers/yup'
import { AxiosError } from 'axios'
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from 'react-query'
import { schemaAddComment } from '../../schemas/schemas'
import { api } from '../../services/api'
import { Comment } from '../../types'

export default function FormAddComment() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset
  } = useForm<Comment>({
    resolver: yupResolver(schemaAddComment)
  })

  const queryClient = useQueryClient()

  const { mutate } = useMutation(api.registerComment, {
    onSuccess: () => {
      queryClient.invalidateQueries('comments')
      console.log('Comment updated successfully!')
      reset()
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

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input id="description" type="text" placeholder={errors.description?.message} {...register('description')} />

        <button>Add</button>
      </form>
    </>
  )
}
