import {Navigate, useParams} from 'react-router-dom'
import {books} from 'api'

export function Book() {
  const {slug} = useParams()
  const book = slug && books.findBySlug(slug)
  if (!book) {
    return <Navigate to="/" replace={true} />
  }

  return (
    <>
      <h1>{book.title}</h1>
    </>
  )
}

export default Book
