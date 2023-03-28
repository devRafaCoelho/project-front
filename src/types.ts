export type UserData = {
  id: number
  name: string
  email: string
  password: string
  newPassword?: string
  confirmNewPassword?: string
}

export type Comment = {
  id: number
  description: string
  userId: number
}

export type CommentCardProps = {
  commentId: number
  description: string
  commentUserId: number
  setSelectedComment: () => void
}
