import { useState } from 'react'
import { useQuery } from 'react-query'
import CommentCard from '../../components/CommentCard'
import FormAddComment from '../../components/FormAddComment/FormAddComment'
import FormEditComment from '../../components/FormEditComment/FormEditComment'
import { api } from '../../services/api'
import { Comment } from '../../types'

export default function Comments() {
  const { data, isError, isLoading } = useQuery('comments', api.getComments)
  const [selectedComment, setSelectedComment] = useState<Comment | null>(null)

  return (
    <>
      <>
        <h3>Add Comment</h3>
        <FormAddComment />
      </>

      <h1>List</h1>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error</p>}
      {data?.map((comment) => (
        <CommentCard commentId={comment.id} commentUserId={comment.userId} description={comment.description} setSelectedComment={() => setSelectedComment(comment)} />
      ))}

      {selectedComment && <FormEditComment comment={selectedComment} close={() => setSelectedComment(null)} />}
    </>
  )
}
